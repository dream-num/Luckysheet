/**
 * Common tool methods
 */

/**
 * Determine whether a string is in standard JSON format
 * @param {String} str 
 */
function isJsonString(str) {
    try {
        if (typeof JSON.parse(str) == "object") {
            return true;
        }
    } catch (e) { }
    return false;
}

/**
 * Determine whether a variable is a pure number, null/""/undefined/"34rt"/"34e" is not a number, 34/"34"/"34e10" is a number
 * @param {Number | String | } val 
 */
function isRealNum(val) {
    if (val == null || val.toString().replace(/\s/g, "") === "") {
        return false;
    }
    if (!isNaN(val)) {
        return true;
    } else {
        return false;
    }
}

export {
    isJsonString,
    isRealNum
}