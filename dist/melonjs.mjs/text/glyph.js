/*!
 * melonJS Game Engine - v15.2.1
 * http://www.melonjs.org
 * melonjs is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 * @copyright (C) 2011 - 2023 Olivier Biot (AltByte Pte Ltd)
 */
// bitmap constants
const LOG2_PAGE_SIZE = 9;
const PAGE_SIZE = 1 << LOG2_PAGE_SIZE;

/**
 * a glyph representing a single character in a font
 * @ignore
 */
 class Glyph {
    /**
     * @ignore
     */
    constructor() {
        this.id = 0;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.u = 0;
        this.v = 0;
        this.u2 = 0;
        this.v2 = 0;
        this.xoffset = 0;
        this.yoffset = 0;
        this.xadvance = 0;
        this.fixedWidth = false;
    }

    /**
     * @ignore
     */
    getKerning(ch) {
        if (this.kerning) {
            let page = this.kerning[ch >>> LOG2_PAGE_SIZE];
            if (page) {
                return page[ch & PAGE_SIZE - 1] || 0;
            }
        }
        return 0;
    }

    /**
     * @ignore
     */
    setKerning(ch, value) {
        if (!this.kerning) {
            this.kerning = {};
        }
        let page = this.kerning[ch >>> LOG2_PAGE_SIZE];
        if (typeof page === "undefined") {
            this.kerning[ch >>> LOG2_PAGE_SIZE] = {};
            page = this.kerning[ch >>> LOG2_PAGE_SIZE];
        }
        page[ch & PAGE_SIZE - 1] = value;
    }
}

export { Glyph as default };
