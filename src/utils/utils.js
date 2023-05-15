import { toHex } from "./string.js";

export * as agent from "./agent.js";
export * as array from "./array.js";
export * as file from "./file.js";
export * as string from "./string.js";
export * as function from "./function.js";

/**
 * a collection of utility functions
 * @namespace utils
 */

// guid default value
let GUID_base  = "";
let GUID_index = 0;

/**
 * Compare two version strings
 * @public
 * @memberof utils
 * @name checkVersion
 * @param {string} first - First version string to compare
 * @param {string} second - second version string to compare
 * @returns {number} comparison result <br>&lt; 0 : first &lt; second<br>
 * 0 : first == second<br>
 * &gt; 0 : first &gt; second
 * @example
 * if (me.utils.checkVersion("7.0.0") > 0) {
 *     console.error(
 *         "melonJS is too old. Expected: 7.0.0, Got: 6.3.0"
 *     );
 * }
 */
export function checkVersion(first, second) {
    let a = first.split(".");
    let b = second.split(".");
    let len = Math.min(a.length, b.length);
    let result = 0;

    for (let i = 0; i < len; i++) {
        if ((result = +a[i] - +b[i])) {
            break;
        }
    }

    return result ? result : a.length - b.length;
}

/**
 * parse the fragment (hash) from a URL and returns them into
 * @public
 * @memberof utils
 * @name getUriFragment
 * @param {string} [url=document.location] - an optional params string or URL containing fragment (hash) params to be parsed
 * @returns {object} an object representing the deserialized params string.
 * @property {boolean} [hitbox=false] draw the hitbox in the debug panel (if enabled)
 * @property {boolean} [velocity=false] draw the entities velocity in the debug panel (if enabled)
 * @property {boolean} [quadtree=false] draw the quadtree in the debug panel (if enabled)
 * @property {boolean} [webgl=false] force the renderer to WebGL
 * @property {boolean} [debug=false] display the debug panel (if preloaded)
 * @property {string} [debugToggleKey="s"] show/hide the debug panel (if preloaded)
 * @example
 * // http://www.example.com/index.html#debug&hitbox=true&mytag=value
 * let UriFragment = me.utils.getUriFragment();
 * console.log(UriFragment["mytag"]); //> "value"
 */
export function getUriFragment(url) {
    let hash = {};

    if (typeof url === "undefined") {
        if (typeof globalThis.document !== "undefined") {
            let location = globalThis.document.location;

            if (location && location.hash) {
                url = location.hash;
            } else {
                // No "document.location" exist for Wechat mini game platform.
                return hash;
            }
        } else {
            // "document" undefined on node.js
            return hash;
        }
    } else {
        // never cache if a url is passed as parameter
        let index = url.indexOf("#");
        if (index !== -1) {
            url = url.slice(index, url.length);
        } else {
            return hash;
        }
    }

    // parse the url
    url.slice(1).split("&").filter((value) => value !== "").forEach((value) => {
        let kv = value.split("=");
        let k = kv.shift();
        let v = kv.join("=");
        hash[k] = v || true;
    });

    return hash;
}

/**
 * reset the GUID Base Name
 * the idea here being to have a unique ID
 * per level / object
 * @ignore
 */
export function resetGUID(base, index = 0) {
    // also ensure it's only 8bit ASCII characters
    GUID_base  = toHex(base.toString().toUpperCase());
    GUID_index = index;
}

/**
 * create and return a very simple GUID
 * Game Unique ID
 * @ignore
 */
export function createGUID(index = 1) {
    // to cover the case of undefined id for groups
    GUID_index += index;
    return GUID_base + "-" + (index || GUID_index);
}
