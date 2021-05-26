"use strict";
/**
 * Coldmind AB ("COMPANY") CONFIDENTIAL
 * Unpublished Copyright (c) 2020 Coldmind AB, All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of COMPANY. The intellectual and technical concepts contained
 * herein are proprietary to COMPANY and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from COMPANY.  Access to the source id contained herein is hereby forbidden to anyone except current COMPANY employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 *
 * The copyright notice above does not evidence any actual or intended publication or disclosure  of  this source id, which includes
 * information that is confidential and/or proprietary, and is a trade secret, of  COMPANY.   ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE,
 * OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS  SOURCE CODE  WITHOUT  THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED, AND IN VIOLATION OF APPLICABLE
 * LAWS AND INTERNATIONAL TREATIES.  THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY RIGHTS
 * TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 *
 * Created by Patrik Forsberg <patrik.forsberg@coldmind.com>
 * File Date: 2020-03-27 17:59
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketContents = void 0;
class BasketContents {
    constructor(items = new Array()) {
        this.items = items;
    }
    getItems() {
        return this.items;
    }
    itemCount() {
        return this.items.length;
    }
    haveItem(id) {
        return (this.getItem(id) != null);
    }
    addItem(basketItem) {
        if (this.items.indexOf(basketItem) > -1) {
            return false;
        }
        this.items.push(basketItem);
    }
    getItem(id) {
        let result = null;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.itemId === id) {
                result = item;
                break;
            }
        }
        return result;
    }
    removeItem(id) {
        let result = false;
        let item = this.getItem(id);
        let index = item != null ? this.items.indexOf(item) : -1;
        if (index > -1) {
            this.items.splice(index, 1);
            result = true;
        }
        return result;
    }
}
exports.BasketContents = BasketContents;
