"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-17
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodMenuAdminDbBeta = exports.data = void 0;
const log_service_1 = require("@app/services/log.service");
const cli_logger_1 = require("@cli/cli.logger");
const interfaces_1 = require("@core/interfaces");
const action_result_1 = require("@models/action-result");
const fm_db_tables_1 = require("@modules/food-menu/fm.db-tables");
const db_logger_1 = require("@zynDb/db-logger");
const sql_igniter_1 = require("@zynDb/sql-igniter/sql-igniter");
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
const mysql = require("mysql");
const DB_COUNT_ALIAS = "count";
exports.data = {
    menus: [
        {
            menu: {
                id: null,
                restaurant_id: 1,
                name: "Förrätter",
                info: "Smarriga förrätter",
                weight: 32,
                items: [
                    {
                        id: null,
                        menu_id: 1,
                        photo: '',
                        name: "Köttbullar med Mos",
                        info: "",
                        allergies: {
                            veg: false,
                            lactose: false,
                            lchf: false
                        },
                        currency_id: 1,
                        price: 10.23,
                        weight: 10
                    }
                ]
            }
        }
    ]
};
let FoodMenuAdminDbBeta = class FoodMenuAdminDbBeta {
    constructor(dbClient, logger) {
        this.dbClient = dbClient;
        this.logger = logger;
        this.debugLevel = 1;
    }
    /**
     * Count rows in given table by given column
     * @param {string} tableName
     * @param {string} column
     * @returns {Promise<number>}
     */
    count(tableName, column) {
        return new Promise((resolve) => {
            this.dbClient.query(new sql_igniter_1.SqlIgniter().count(tableName, column, DB_COUNT_ALIAS)).then((res) => {
                resolve(res.result.safeGetFirstRow().asNum(DB_COUNT_ALIAS));
            }).catch(err => {
                resolve(0);
            });
        });
    }
    /**
     * Check if a table contains a certain row with a given primary key value
     * @param {string} tableName
     * @param {string} column
     * @param value
     * @returns {Promise<boolean>}
     */
    async haveRow(tableName, column, value) {
        return new Promise((resolve, reject) => {
            const sql = new sql_igniter_1.SqlIgniter().count(tableName, "count").where(column, value);
            this.dbClient.query(sql).then((res) => {
                let firstRow = res.safeGetFirstRow();
                let count = res.safeGetFirstRow().asNum("count");
                resolve(count > 0);
            }).catch(err => {
                cli_logger_1.Logger.logError("setRecord :: haveRow ::", err);
                reject(err);
            });
        });
    }
    /**
     * Get field value from given
     * @returns {string}
     * @param data
     * @param dataKey
     */
    safeGetDataVal(dataKey, data) {
        let result = undefined;
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                if (key == dataKey) {
                    result = data[key];
                    break;
                }
            }
        }
        return result;
    }
    async updateRow() {
        return new Promise((resolve, reject) => {
            let zynQuery = new sql_igniter_1.SqlIgniter().setMulti({}, '').where('');
        });
    }
    getRequiredFields(tableData) {
        let result = new Array();
        for (let row of tableData.dataRows) {
            for (let field of row.fields) {
                if (!field.nullable) {
                    result.push(field);
                }
            }
        }
        return result;
    }
    /**
     * Set database record, the function will
     * @param data
     * @param {string} tableName
     * @param validate - validate supplied fields against table meta data
     * @returns {Promise<IActionResult>}
     */
    async setRecord(data, tableName, validate = false) {
        const scope = this;
        let result = new action_result_1.ActionResult();
        function primaryKeySet(value) {
            return (value);
        }
        /**
         * Make sure all required fields are provided
         * TODO: Check datatypes
         * @param {ISQLTableData} tableData
         * @param data
         * @param primFieldName
         * @returns {IActionResult}
         */
        function validateData(tableData, data, primFieldName) {
            let result = new action_result_1.ActionResult(true);
            for (let field of tableData.fields) {
                let userDataVal = scope.safeGetDataVal(field.name, data);
                if ((!field.nullable && !userDataVal) && (!field.isPrimary) && !field.default) {
                    result.fail(new Error(`Required Field '${field.name}' is missing`));
                    break;
                }
            }
            return result;
        }
        async function execute() {
            try {
                let db = scope.dbClient;
                let desc = (await db.describeTable(tableName)).result;
                let primDbField = desc.getPrimaryField();
                let primFieldName = primDbField ? primDbField.name : undefined;
                let primFieldVal = scope.safeGetDataVal(primFieldName, data);
                let validateRes = validateData(desc, data, primFieldVal);
                console.log('Validation result ::', validateRes);
                db_logger_1.L.logUVE(primDbField, "primDbField :: Field is missing in Database");
                //L.log('Table DESC ::', desc);
                //L.log('primField ::', primFieldName);
                //L.log('primFieldVal ::', primFieldVal);
                let cleanedData = [];
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        let doInclude = true;
                        // Special fix for negative prim keys
                        // they are threated as not set...
                        if (primFieldName == key) {
                            let primNumVal = Number.parseInt(primFieldVal);
                            if (!isNaN(primNumVal) && primNumVal < 0) {
                                doInclude = false;
                            }
                        }
                        //
                        if (primFieldName !== key && desc.haveFieldName(key) && doInclude) {
                            cleanedData[key] = data[key];
                        }
                    }
                }
                //
                // Primary key if provided, make sure a row exist...
                //
                if (primaryKeySet(primFieldVal)) {
                    console.log('>>> scope.haveRow :: tableName ::', tableName);
                    console.log('>>> scope.haveRow :: primFieldName ::', primFieldName);
                    console.log('>>> scope.haveRow :: tableName ::', tableName);
                    let haveMenuItem = await scope.haveRow(tableName, primFieldName, primFieldVal);
                    if (haveMenuItem) {
                        cli_logger_1.Logger.spit();
                        cli_logger_1.Logger.spit();
                        cli_logger_1.Logger.logGreen("****************************");
                        cli_logger_1.Logger.logGreen("* UPDATE ROW");
                        cli_logger_1.Logger.logGreen("****************************");
                        cli_logger_1.Logger.spit();
                        cli_logger_1.Logger.spit();
                        let query = new sql_igniter_1.SqlIgniter().setMulti(cleanedData, tableName)
                            .where(primFieldName, primFieldVal);
                        cli_logger_1.Logger.logGreen("Query ::", query.toSql());
                        result.data = await db.query(query);
                    }
                }
                else {
                    cli_logger_1.Logger.spit();
                    cli_logger_1.Logger.spit();
                    cli_logger_1.Logger.logPurple("****************************");
                    cli_logger_1.Logger.logPurple("* INSERT ROW");
                    cli_logger_1.Logger.logPurple("****************************");
                    cli_logger_1.Logger.spit();
                    cli_logger_1.Logger.spit();
                    let query = new sql_igniter_1.SqlIgniter().insert(data, tableName);
                    cli_logger_1.Logger.logPurple("Query ::", query.toSql());
                    result.data = await db.query(query);
                }
            }
            catch (ex) {
                cli_logger_1.Logger.logError("setRecord :: err ::", ex);
                result.fail(ex);
            }
        }
        return new Promise((resolve, reject) => {
            execute().then(() => {
                console.log("FoodMenuAdminDbBeta :: setRecord :: executed ::", result);
                resolve(result);
            }).catch(err => {
                console.log('FoodMenuAdminDbBeta :: setRecord :: error ::', err);
                reject(err);
            });
        });
    }
    /**
     * Test function for create new Menu
     * @param data
     * @returns {Promise<IActionResult>}
     */
    async testNew(data) {
        const scope = this;
        let result = new action_result_1.ActionResult();
        cli_logger_1.Logger.logCyan("testNew ::", data);
        let tableName = fm_db_tables_1.MenuDBTables.Menu;
        async function execute() {
            try {
                let result = await scope.setRecord(data, tableName);
                console.log("testNew :: execute :: result ::", result);
            }
            catch (ex) {
                cli_logger_1.Logger.logError("testNew :: execute ::", ex);
            }
        }
        return new Promise((resolve, reject) => {
            execute().then(() => {
                cli_logger_1.Logger.log('testNew() :: executed');
                resolve(result);
            }).catch(err => {
                cli_logger_1.Logger.logError('testNew() :: err ::', err);
                reject(err);
            });
        });
    }
    /**
     * Test function for update Menu
     * @param data
     * @returns {Promise<IActionResult>}
     */
    async testUpdate(data) {
        const scope = this;
        let result = new action_result_1.ActionResult();
        cli_logger_1.Logger.logCyan("testUpdate ::", data);
        let tableName = fm_db_tables_1.MenuDBTables.Menu;
        async function execute() {
            try {
                let result = await scope.setRecord(data, tableName);
                console.log('result ::', result);
                result.setSuccess(result.success);
            }
            catch (ex) {
                result.fail(ex);
            }
        }
        return new Promise((resolve, reject) => {
            execute().then(() => {
                cli_logger_1.Logger.log("testUpdate() :: executed");
                resolve(result);
            });
        });
    }
    /**
     * Save all menus and items
     * -> Insert into DB if no ID is present
     * -> Update DB if items have an ID
     *
     * @param data
     * @returns {Promise<>}
     */
    async menusFullSave(data) {
        const scope = this;
        const logPrefix = "FoodMenuAdminDbBeta :: menusFullSave :: ";
        let errors = new Array();
        async function getCurrency(id) {
            let result = null;
        }
        async function setMenu(data) {
            return new Promise((resolve, reject) => {
                scope.setRecord(data, fm_db_tables_1.MenuDBTables.Menu).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            });
        }
        function doErr(mess) {
            errors.push(mess);
        }
        async function execute() {
            cli_logger_1.Logger.spit();
            cli_logger_1.Logger.spit();
            cli_logger_1.Logger.spit();
            cli_logger_1.Logger.spit();
            cli_logger_1.Logger.logCyan("**( EXECUTE )******************************************");
            cli_logger_1.Logger.spit();
            let connection = mysql.createConnection({
                host: this.dbSettings.dbHost,
                user: this.dbSettings.dbUser,
                password: this.dbSettings.dbPass,
                database: this.dbSettings.dbName
            });
            connection.connect((err) => {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return;
                }
                console.log('connected as id ' + connection.threadId);
            });
            connection.beginTransaction((err) => {
                if (err) {
                    throw err;
                }
                //
                // Food Menus
                //
                let foodMenus = data.foodMenus;
                let weight = 0;
                for (let menu of foodMenus) {
                    let query = null;
                    let primaryId = menu.id;
                    if (!primaryId || primaryId < 0) {
                        cli_logger_1.Logger.logCyan("****************** INSERT *******");
                        let insData = {
                            restaurant_id: data.restaurantId,
                            weight: menu.weight,
                            photo: menu.photo
                        };
                        query = new sql_igniter_1.SqlIgniter().insert(insData, fm_db_tables_1.MenuDBTables.Menu);
                        if (query) {
                            connection.query(query.toSql());
                            /*
                            if (res.success) {
                                primaryId = res.lastInsertId;
                                console.log(">>>>>>> MENU ID ::", res.lastInsertId);
                            }
                             */
                        }
                    }
                    else {
                        cli_logger_1.Logger.logCyan("****************** UPDATE *******");
                        let insData = {
                            restaurant_id: data.restaurantId,
                            weight: menu.weight,
                            photo: menu.photo
                        };
                        query = new sql_igniter_1.SqlIgniter().setMulti(insData, fm_db_tables_1.MenuDBTables.Menu)
                            .where('id', primaryId);
                        if (query) {
                            connection.query(query.toSql());
                            /*
                            if (res.success) {
                                primaryId = res.lastInsertId;
                                console.log(">>>>>>> MENU ID ::", res.lastInsertId);
                            }
                            */
                        }
                    }
                    cli_logger_1.Logger.logGreen("QUERY :::", query.toSql());
                    cli_logger_1.Logger.logGreen("LAST_ID :::", primaryId);
                    for (let menuItem of menu.items) {
                    } // end for
                } // end for
                // During testing, always roolback
                doErr('Test transaction - rollback');
            });
        }
        return new Promise((resolve, reject) => {
            return execute().then(() => {
                cli_logger_1.Logger.logGreen("menusFullSave :: executed");
            }).catch(err => {
                reject(err);
            });
        });
    }
    async createMenuItem(data) {
        const scope = this;
        data = {
            id: null,
            menu_id: 1,
            photo: '',
            name: "Köttbullar med Mos",
            info: "",
            allergies: {
                veg: false,
                lactose: false,
                lchf: false
            },
            currency_id: 1,
            price: 10.23
        };
        async function getCurrency(id) {
            let result = null;
        }
        async function execute() {
            let currency = getCurrency(data.currency_id);
            scope.dbClient.startTransaction();
            //let sql = new SqlIgniter().insert();
        }
        return new Promise((resolve, reject) => {
        });
    }
};
FoodMenuAdminDbBeta = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_2.inject(interfaces_1.Inf.IDbClient)),
    __param(1, inversify_2.inject(interfaces_1.Inf.ILogService)),
    __metadata("design:paramtypes", [Object, log_service_1.LogService])
], FoodMenuAdminDbBeta);
exports.FoodMenuAdminDbBeta = FoodMenuAdminDbBeta;
