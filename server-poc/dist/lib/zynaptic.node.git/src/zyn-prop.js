"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZynProp = void 0;
class ZynProp {
    constructor(name, value = null) {
        this.name = name;
        this.value = value;
    }
    strVal() {
        let result = "";
        if (typeof this.value === 'object') {
            result = "obj";
        }
        else {
            result = new String(this.value).toString();
        }
        return result;
    }
}
exports.ZynProp = ZynProp;
