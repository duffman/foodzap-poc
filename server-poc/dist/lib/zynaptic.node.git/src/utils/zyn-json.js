"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZynJSON = exports.StringyfyMode = void 0;
var StringyfyMode;
(function (StringyfyMode) {
    StringyfyMode[StringyfyMode["normal"] = 0] = "normal";
    StringyfyMode[StringyfyMode["pretty"] = 1] = "pretty";
})(StringyfyMode = exports.StringyfyMode || (exports.StringyfyMode = {}));
class ZynJSON {
    static isCyclic(obj) {
        let seenObjects = [];
        function detect(obj) {
            if (obj && typeof obj === 'object') {
                if (seenObjects.indexOf(obj) !== -1) {
                    return true;
                }
                seenObjects.push(obj);
                for (var key in obj) {
                    if (obj.hasOwnProperty(key) && detect(obj[key])) {
                        console.log(obj, 'cycle at ' + key);
                        return true;
                    }
                }
            }
            return false;
        }
        return detect(obj);
    }
    /**
     * 	var o = {};
     *  o.o = o;
     *
     * @param obj
     * @param {boolean} checkCyclic
     * @param mode
     * @param echoResult
     */
    static stringify(obj, checkCyclic = false, mode = StringyfyMode.normal, echoResult = false) {
        let cache = [];
        return JSON.stringify(obj, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Duplicate reference found
                    try {
                        // If this value does not reference a parent it can be deduped
                        let jsonStr = undefined;
                        switch (mode) {
                            case StringyfyMode.normal:
                                jsonStr = JSON.stringify(value);
                                break;
                            case StringyfyMode.pretty:
                                jsonStr = JSON.stringify(value, null, 4);
                                break;
                        }
                        return JSON.parse(jsonStr);
                    }
                    catch (error) {
                        // discard key if value cannot be deduped
                        return;
                    }
                }
                // Store value in our collection
                cache.push(value);
            }
            if (echoResult) {
                console.log(value);
            }
            return value;
        });
    }
    static safeStringify(obj) {
        return ZynJSON.stringify(obj, true);
    }
}
exports.ZynJSON = ZynJSON;
