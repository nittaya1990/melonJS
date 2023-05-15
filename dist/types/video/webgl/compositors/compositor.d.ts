/**
 * @classdesc
 * A base Compositor object.
 */
export default class Compositor {
    /**
     * @param {WebGLRenderer} renderer - the current WebGL renderer session
     * @param {Object} settings - additional settings to initialize this compositors
     * @param {object[]} attribute - an array of attributes definition
     * @param {string} attribute.name - name of the attribute in the vertex shader
     * @param {number} attribute.size - number of components per vertex attribute. Must be 1, 2, 3, or 4.
     * @param {GLenum} attribute.type - data type of each component in the array
     * @param {boolean} attribute.normalized - whether integer data values should be normalized into a certain range when being cast to a float
     * @param {number} attribute.offset - offset in bytes of the first component in the vertex attribute array
     * @param {object} shader - an array of attributes definition
     * @param {string} shader.vertex - a string containing the GLSL source code to set
     * @param {string} shader.fragment - a string containing the GLSL source code to set
     */
    constructor(renderer: WebGLRenderer, settings: Object);
    /**
     * Initialize the compositor
     * @ignore
     */
    init(renderer: any, settings: any): void;
    renderer: any;
    gl: any;
    color: any;
    viewMatrix: any;
    /**
     * the default shader created by this compositor
     * @type {GLShader}
     */
    defaultShader: GLShader | undefined;
    /**
     * the shader currently used by this compositor
     * @type {GLShader}
     */
    currentShader: GLShader | undefined;
    /**
     * primitive type to render (gl.POINTS, gl.LINE_STRIP, gl.LINE_LOOP, gl.LINES, gl.TRIANGLE_STRIP, gl.TRIANGLE_FAN, gl.TRIANGLES)
     * @type {number}
     * @default gl.TRIANGLES
     */
    mode: number | undefined;
    /**
     * an array of vertex attribute properties
     * @see WebGLCompositor.addAttribute
     * @type {Array}
     */
    attributes: any[] | undefined;
    /**
     * the size of a single vertex in bytes
     * (will automatically be calculated as attributes definitions are added)
     * @see WebGLCompositor.addAttribute
     * @type {number}
     */
    vertexByteSize: number | undefined;
    /**
     * the size of a single vertex in floats
     * (will automatically be calculated as attributes definitions are added)
     * @see WebGLCompositor.addAttribute
     * @type {number}
     */
    vertexSize: number | undefined;
    /**
     * the vertex data buffer used by this compositor
     * @type {VertexArrayBuffer}
     */
    vertexData: VertexArrayBuffer | undefined;
    /**
     * Reset compositor internal state
     * @ignore
     */
    reset(): void;
    /**
     * @ignore
     * called by the WebGL renderer when a compositor become the current one
     */
    bind(): void;
    /**
     * Select the shader to use for compositing
     * @see GLShader
     * @param {GLShader} shader - a reference to a GLShader instance
     */
    useShader(shader: GLShader): void;
    /**
     * add vertex attribute property definition to the compositor
     * @param {string} name - name of the attribute in the vertex shader
     * @param {number} size - number of components per vertex attribute. Must be 1, 2, 3, or 4.
     * @param {GLenum} type - data type of each component in the array
     * @param {boolean} normalized - whether integer data values should be normalized into a certain range when being cast to a float
     * @param {number} offset - offset in bytes of the first component in the vertex attribute array
     */
    addAttribute(name: string, size: number, type: GLenum, normalized: boolean, offset: number): void;
    /**
     * set/change the current projection matrix
     * @param {Matrix3d} matrix
     */
    setProjection(matrix: Matrix3d): void;
    /**
     * Flush batched vertex data to the GPU
     * @param {number} [mode=gl.TRIANGLES] - the GL drawing mode
     */
    flush(mode?: number | undefined): void;
}
import GLShader from "../glshader.js";
import VertexArrayBuffer from "../buffer/vertex.js";
