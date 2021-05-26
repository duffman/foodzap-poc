"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZynPropList = void 0;
const zyn_prop_1 = require("./zyn-prop");
class ZynPropList {
    constructor() {
        this.props = new Array();
        this.props = new Array();
    }
    get(name) {
        let prop = null;
        let tmpProp = null;
        for (let i = 0; i < this.props.length; i++) {
            tmpProp = this.props[i];
            if (this.props[i] !== null) {
                if (tmpProp != null && tmpProp.name.localeCompare(name) == 0) {
                    prop = this.props[i];
                    break;
                }
            }
        }
        return prop;
    }
    getAt(index) {
        let result = null;
        if (index <= this.props.length && this.props.length > -1) {
            result = this.props[index];
        }
        return result;
    }
    set(name, value = null) {
        if (this.props === null)
            return null;
        let result = false;
        let prop = this.get(name);
        if (prop != null) {
            prop.value = value;
        }
        else {
            prop = new zyn_prop_1.ZynProp(name, value);
            this.props.push(prop);
            result = true;
        }
        return prop;
    }
    haveProp(name) {
        return this.get(name) === null;
    }
    count() {
        return this.props.length;
    }
}
exports.ZynPropList = ZynPropList;
