/**
 * @classdesc
 * A WebGL Compositor object. This class handles all of the WebGL state<br>
 * Pushes texture regions or shape geometry into WebGL buffers, automatically flushes to GPU
 * @augments Compositor
 */
export default class WebGLCompositor extends Compositor {
    currentTextureUnit: any;
    boundTextures: any[] | undefined;
    primitiveShader: GLShader | undefined;
    quadShader: GLShader | undefined;
    vertexBuffer: VertexArrayBuffer | undefined;
    /**
     * Create a WebGL texture from an image
     * @param {number} unit - Destination texture unit
     * @param {Image|HTMLCanvasElement|ImageData|Uint8Array[]|Float32Array[]} image - Source image
     * @param {number} filter - gl.LINEAR or gl.NEAREST
     * @param {string} [repeat="no-repeat"] - Image repeat behavior (see {@link ImageLayer#repeat})
     * @param {number} [w] - Source image width (Only use with UInt8Array[] or Float32Array[] source image)
     * @param {number} [h] - Source image height (Only use with UInt8Array[] or Float32Array[] source image)
     * @param {number} [b] - Source image border (Only use with UInt8Array[] or Float32Array[] source image)
     * @param {boolean} [premultipliedAlpha=true] - Multiplies the alpha channel into the other color channels
     * @param {boolean} [mipmap=true] - Whether mipmap levels should be generated for this texture
     * @returns {WebGLTexture} a WebGL texture
     */
    createTexture2D(unit: number, image: (new (width?: number | undefined, height?: number | undefined) => HTMLImageElement) | HTMLCanvasElement | ImageData | Uint8Array[] | Float32Array[], filter: number, repeat?: string | undefined, w?: number | undefined, h?: number | undefined, b?: number | undefined, premultipliedAlpha?: boolean | undefined, mipmap?: boolean | undefined): WebGLTexture;
    /**
     * delete the given WebGL texture
     * @param {WebGLTexture} [texture] - a WebGL texture to delete
     * @param {number} [unit] - Texture unit to delete
     */
    deleteTexture2D(texture?: WebGLTexture | undefined): void;
    /**
     * returns the WebGL texture associated to the given texture unit
     * @param {number} unit - Texture unit to which a texture is bound
     * @returns {WebGLTexture} texture a WebGL texture
     */
    getTexture2D(unit: number): WebGLTexture;
    /**
     * assign the given WebGL texture to the current batch
     * @param {WebGLTexture} texture - a WebGL texture
     * @param {number} unit - Texture unit to which the given texture is bound
     */
    bindTexture2D(texture: WebGLTexture, unit: number): void;
    /**
     * unbind the given WebGL texture, forcing it to be reuploaded
     * @param {WebGLTexture} [texture] - a WebGL texture
     * @param {number} [unit] - a WebGL texture
     * @returns {number} unit the unit number that was associated with the given texture
     */
    unbindTexture2D(texture?: WebGLTexture | undefined, unit?: number | undefined): number;
    /**
     * @ignore
     */
    uploadTexture(texture: any, w: any, h: any, b: any, force?: boolean): any;
    /**
     * Select the shader to use for compositing
     * @see GLShader
     * @param {GLShader} shader - a reference to a GLShader instance
     */
    useShader(shader: GLShader): void;
    /**
     * Add a textured quad
     * @param {TextureAtlas} texture - Source texture atlas
     * @param {number} x - Destination x-coordinate
     * @param {number} y - Destination y-coordinate
     * @param {number} w - Destination width
     * @param {number} h - Destination height
     * @param {number} u0 - Texture UV (u0) value.
     * @param {number} v0 - Texture UV (v0) value.
     * @param {number} u1 - Texture UV (u1) value.
     * @param {number} v1 - Texture UV (v1) value.
     * @param {number} tint - tint color to be applied to the texture in UINT32 (argb) format
     */
    addQuad(texture: TextureAtlas, x: number, y: number, w: number, h: number, u0: number, v0: number, u1: number, v1: number, tint: number): void;
    /**
     * Draw an array of vertices
     * @param {GLenum} mode - primitive type to render (gl.POINTS, gl.LINE_STRIP, gl.LINE_LOOP, gl.LINES, gl.TRIANGLE_STRIP, gl.TRIANGLE_FAN, gl.TRIANGLES)
     * @param {Point[]} verts - an array of vertices
     * @param {number} [vertexCount=verts.length] - amount of points defined in the points array
     */
    drawVertices(mode: GLenum, verts: Point[], vertexCount?: number | undefined): void;
}
import Compositor from "./compositor.js";
import GLShader from "../glshader.js";
import VertexArrayBuffer from "../buffer/vertex.js";
