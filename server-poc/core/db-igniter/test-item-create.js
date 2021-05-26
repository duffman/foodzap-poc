"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var food_menu_item_model_1 = require("../../app/modules/food-menu/models/food-menu-item.model");
var mysql = require("mysql");
require("reflect-metadata");
var zyn_query_1 = require("./sql-igniter/sql-igniter");
var util = require('util');
var msql = require('mysql');
var dbSettings = {
    host: "localhost",
    user: "duffman",
    password: "bjoe7151212",
    database: "appetizer_back",
    connectionLimit: 10
};
var MenuAdmin = /** @class */ (function () {
    function MenuAdmin() {
        this.connLost = false;
        this.debug = true;
    }
    MenuAdmin.prototype.createItem = function (clientMenuId, languageId, item) {
        if (clientMenuId === void 0) { clientMenuId = 1; }
        if (languageId === void 0) { languageId = 1; }
        var scope = this;
        function addItem(clientMenuId, item) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var itemData = {
                                id: null,
                                food_menu_id: clientMenuId,
                                item_cat_id: item.menuId,
                                item_ref: item.ref,
                                photo: item.photo,
                                weight: item.weight
                            };
                            var sql = new zyn_query_1.SqlIgniter().replace(itemData, 'fm_items').toSql();
                            scope.dbCore.query(sql).then(function (res) {
                                console.log("RES ::", res);
                                resolve(res);
                            })["catch"](function (err) {
                                console.log("ERR ::", err);
                                reject(err);
                            });
                        })];
                });
            });
        }
        function addItemLang(itemId, item) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var query = new zyn_query_1.SqlIgniter().replace({
                                item_id: itemId,
                                language_id: languageId,
                                name: item.name,
                                description: item.description
                            }, 'fm_item_lang');
                            var sql = query.toSql();
                            console.log('addFoodMenuItem :: SQL ::', sql);
                            scope.dbCore.query(sql).then(function (res) {
                                // console.log("RES ::", res);
                                resolve(res);
                            })["catch"](function (err) {
                                // console.log("ERR ::", err);
                                reject(err);
                            });
                        })];
                });
            });
        }
        function execute() {
            return __awaiter(this, void 0, void 0, function () {
                var db, res, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            db = scope.dbCore;
                            return [4 /*yield*/, scope.begin()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, addItem(clientMenuId, item)];
                        case 2:
                            res = _a.sent();
                            return [4 /*yield*/, addItem(clientMenuId, item)];
                        case 3:
                            result = _a.sent();
                            return [4 /*yield*/, scope.rollback()];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        return new Promise(function (resolve, reject) {
            execute().then(function () {
                console.log('doIt() :: Executed');
            });
        });
    };
    MenuAdmin.prototype.go = function () {
        var item = new food_menu_item_model_1.FoodMenuItem(null, 1, "Drinkar", "Njut av en kall lager och korta kjolar som struttar förbi på sommaren och en glögg till Kalle Anka på vintern.", 
        // Todo Merge
        45.67, '', '', 
        // --- //
        [], null, 'Fläskis', null);
        this.createItem(1, 1, item);
    };
    MenuAdmin.prototype.getConnection = function (settings) {
        var _this = this;
        console.log("Creating new connection");
        if (!settings) {
            settings = dbSettings;
        }
        if (this.connection && this.connection.state === 'connected') {
            console.log('>>> RETURNING EXISTING CONNECTION');
            return this.connection;
        }
        if (!this.connection) {
            this.connection = mysql.createConnection(settings);
            this.connection.on("error", function (err) {
                if (err.code == 'PROTOCOL_CONNECTION_LOST') {
                    console.log("CONNECTION -- LOST --:::", err);
                    _this.connLost = true;
                }
            });
        }
        if (this.connection.state === 'disconnected') {
            this.connection.connect(function (err, connection) {
                if (err) {
                    console.log("Open MySQL Connection failed");
                    throw err;
                }
                else {
                    _this.connection = connection;
                }
            });
        }
        return this.connection;
    };
    MenuAdmin.prototype.begin = function () {
        var conn = this.getConnection();
        return util.promisify(conn.beginTransaction);
    };
    MenuAdmin.prototype.rollback = function () {
        var conn = this.getConnection();
        return util.promisify(conn.rollback);
    };
    MenuAdmin.prototype.commit = function () {
        var conn = this.getConnection();
        return util.promisify(conn.commit);
    };
    MenuAdmin.prototype.query = function (sql) {
        var conn = this.getConnection();
        return util.promisify(conn.query);
    };
    return MenuAdmin;
}());
exports.MenuAdmin = MenuAdmin;
var admin = new MenuAdmin();
admin.go();
//let res = cli.createItem(clientMenuId, item);
/*
 function addNewMenuItem(menuId: number,
 field: string,
 description: string,
 price: number,
 currencyId: number
 ): Promise<IActionResult> {
 return new Promise((resolve, reject) => {
 resolve(null);
 });
 }
 */
/*
 this.menuId = menuId;
 this.field = field;
 this.description = description;
 this.price = price;

 //this.code = code;
 //symbol: string               = "",

 id:           number;
 menuId:       number;
 field:         string;
 description?: string;
 price:        number;
 code?:        string;
 symbol?:      string;
 photo?:       string;
 categories?:  Array<FoodMenuOption>;
 ref?:         string;
 weight?:      number;
 deleted?:     boolean;

 categories: FoodMenuOption[] = [],
 photo: string                = "",
 ref: string                  = "",
 weight: number               = -1,

 */
