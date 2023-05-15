/*!
 * melonJS Game Engine - v15.2.1
 * http://www.melonjs.org
 * melonjs is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 * @copyright (C) 2011 - 2023 Olivier Biot (AltByte Pte Ltd)
 */
import Vector2d from '../../math/vector2.js';
import { renderer } from '../../video/video.js';
import { getExtension, getBasename } from '../../utils/file.js';
import timer from '../../system/timer.js';
import { getTMX, getImage } from '../../loader/loader.js';

/**
 * @classdesc
 * a TMX Tile Set Object
 */
 class TMXTileset {
    /**
     *  @param {object} tileset - tileset data in JSON format ({@link http://docs.mapeditor.org/en/stable/reference/tmx-map-format/#tileset})
     */
    constructor(tileset) {
        let i = 0;
        // first gid

        // tile properties (collidable, etc..)
        this.TileProperties = [];

        // hold reference to each tile image
        this.imageCollection = [];

        this.firstgid = this.lastgid = +tileset.firstgid;

        // check if an external tileset is defined
        if (typeof(tileset.source) !== "undefined") {
            let src = tileset.source;
            let ext = getExtension(src);
            if (ext === "tsx" || ext === "json") {
                // load the external tileset (TSX/JSON)
                tileset = getTMX(getBasename(src));
                if (!tileset) {
                    throw new Error(src + " external TSX/JSON tileset not found");
                }
            }
        }

        this.name = tileset.name;
        this.tilewidth = +tileset.tilewidth;
        this.tileheight = +tileset.tileheight;
        this.spacing = +tileset.spacing || 0;
        this.margin = +tileset.margin || 0;

        // set tile offset properties (if any)
        this.tileoffset = new Vector2d();

        /**
         * Tileset contains animated tiles
         * @type {boolean}
         */
        this.isAnimated = false;

        /**
         * true if the tileset is a "Collection of Image" Tileset
         * @type {boolean}
         */
        this.isCollection = false;

        /**
         * the tileset class
         * @type {boolean}
         */
        this.class = tileset.class;

        /**
         * Tileset animations
         * @private
         */
        this.animations = new Map();

        /**
         * Remember the last update timestamp to prevent too many animation updates
         * @private
         */
        this._lastUpdate = 0;

        let tiles = tileset.tiles;
        for (i in tiles) {
            if (tiles.hasOwnProperty(i)) {
                if ("animation" in tiles[i]) {
                    this.isAnimated = true;
                    this.animations.set(tiles[+i].animation[0].tileid, {
                        dt      : 0,
                        idx     : 0,
                        frames  : tiles[+i].animation,
                        cur     : tiles[+i].animation[0]
                    });
                }
                // set tile properties, if any
                if ("properties" in tiles[i]) {
                    if (Array.isArray(tiles[i].properties)) { // JSON (new format)
                        let tileProperty = {};
                        for (let j in tiles[i].properties) {
                            tileProperty[tiles[i].properties[j].name] = tiles[i].properties[j].value;
                        }
                        this.setTileProperty(+tiles[i].id + this.firstgid, tileProperty);
                    } else { // XML format
                        this.setTileProperty(+i + this.firstgid, tiles[i].properties);
                    }
                }
                if ("image" in tiles[i]) {
                    let image = getImage(tiles[i].image);
                    if (!image) {
                        throw new Error("melonJS: '" + tiles[i].image + "' file for tile '" + (+i + this.firstgid) + "' not found!");
                    }
                    this.imageCollection[+i + this.firstgid] = image;
                }
            }
        }

        this.isCollection = this.imageCollection.length > 0;

        let offset = tileset.tileoffset;
        if (offset) {
            this.tileoffset.x = +offset.x;
            this.tileoffset.y = +offset.y;
        }

        // set tile properties, if any (JSON old format)
        let tileInfo = tileset.tileproperties;
        if (tileInfo) {
            for (i in tileInfo) {
                if (tileInfo.hasOwnProperty(i)) {
                    this.setTileProperty(+i + this.firstgid, tileInfo[i]);
                }
            }
        }

        // if not a tile image collection
        if (this.isCollection === false) {

            // get the global tileset texture
            this.image = getImage(tileset.image);

            if (!this.image) {
                throw new Error("melonJS: '" + tileset.image + "' file for tileset '" + this.name + "' not found!");
            }

            // create a texture atlas for the given tileset
            this.texture = renderer.cache.get(this.image, {
                framewidth : this.tilewidth,
                frameheight : this.tileheight,
                margin : this.margin,
                spacing : this.spacing
            });
            this.atlas = this.texture.getAtlas();

            // calculate the number of tiles per horizontal line
            let hTileCount = +tileset.columns || Math.round(this.image.width / (this.tilewidth + this.spacing));
            let vTileCount = Math.round(this.image.height / (this.tileheight + this.spacing));
            if (tileset.tilecount % hTileCount > 0) {
                ++vTileCount;
            }
            // compute the last gid value in the tileset
            this.lastgid = this.firstgid + (((hTileCount * vTileCount) - 1) || 0);
            if (tileset.tilecount && this.lastgid - this.firstgid + 1 !== +tileset.tilecount) {
                console.warn(
                    "Computed tilecount (" + (this.lastgid - this.firstgid + 1) +
                    ") does not match expected tilecount (" + tileset.tilecount + ")"
                );
            }
        }
    }

    /**
     * return the tile image from a "Collection of Image" tileset
     * @param {number} gid
     * @returns {Image} corresponding image or undefined
     */
    getTileImage(gid) {
        return this.imageCollection[gid];
    }


    /**
     * set the tile properties
     * @ignore
     */
    setTileProperty(gid, prop) {
        // set the given tile id
        this.TileProperties[gid] = prop;
    }

    /**
     * return true if the gid belongs to the tileset
     * @param {number} gid
     * @returns {boolean}
     */
    contains(gid) {
        return gid >= this.firstgid && gid <= this.lastgid;
    }

    /**
     * Get the view (local) tile ID from a GID, with animations applied
     * @param {number} gid - Global tile ID
     * @returns {number} View tile ID
     */
    getViewTileId(gid) {
        let localId = gid - this.firstgid;

        if (this.animations.has(localId)) {
            // return the current corresponding tile id if animated
            return this.animations.get(localId).cur.tileid;
        }

        return localId;
    }

    /**
     * return the properties of the specified tile
     * @param {number} tileId
     * @returns {object}
     */
    getTileProperties(tileId) {
        return this.TileProperties[tileId];
    }

    // update tile animations
    update(dt) {
        let duration = 0,
            now = timer.getTime(),
            result = false;

        if (this._lastUpdate !== now) {
            this._lastUpdate = now;

            this.animations.forEach((anim) => {
                anim.dt += dt;
                duration = anim.cur.duration;
                while (anim.dt >= duration) {
                    anim.dt -= duration;
                    anim.idx = (anim.idx + 1) % anim.frames.length;
                    anim.cur = anim.frames[anim.idx];
                    duration = anim.cur.duration;
                    result = true;
                }
            });
        }

        return result;
    }

    // draw the x,y tile
    drawTile(renderer, dx, dy, tmxTile) {

        // check if any transformation is required
        if (tmxTile.flipped) {
            renderer.save();
            // apply the tile current transform
            renderer.translate(dx, dy);
            renderer.transform(tmxTile.currentTransform);
            // reset both values as managed through transform();
            dx = dy = 0;
        }

        // check if the tile has an associated image
        if (this.isCollection === true) {
            // draw the tile
            renderer.drawImage(
                this.imageCollection[tmxTile.tileId],
                0, 0,
                tmxTile.width, tmxTile.height,
                dx, dy,
                tmxTile.width, tmxTile.height
            );
        } else {
            // use the tileset texture
            let offset = this.atlas[this.getViewTileId(tmxTile.tileId)].offset;
            // draw the tile
            renderer.drawImage(
                this.image,
                offset.x, offset.y,
                this.tilewidth, this.tileheight,
                dx, dy,
                this.tilewidth + renderer.uvOffset, this.tileheight + renderer.uvOffset
            );
        }

        if (tmxTile.flipped) {
            // restore the context to the previous state
            renderer.restore();
        }
    }
}

export { TMXTileset as default };
