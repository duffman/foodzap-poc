'use strict';var __decorate=this&&this.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==='object'&&typeof Reflect.decorate==='function')r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r;};var __metadata=this&&this.__metadata||function(k,v){if(typeof Reflect==='object'&&typeof Reflect.metadata==='function')return Reflect.metadata(k,v);};Object.defineProperty(exports,'__esModule',{value:true});const cli_logger_1=require('../cli/cli.logger');const db_logger_1=require('../db-igniter/db-logger');const var_utils_1=require('./utils/var-utils');const mysql_client_1=require('./mysql-client');const inversify_1=require('inversify');let DbClient=class DbClient{constructor(){this.client=new mysql_client_1.MySqlClient();}configure(settings){this.settings=settings;this.client.configure(settings);}getConnection(settings){return this.client.getConnection();}startTransaction(){return this.client.startTransaction();}rollbackTransaction(){return this.client.rollbackTransaction();}commitTransaction(){return this.client.commitTransaction();}query(query){let sql=undefined;if(var_utils_1.DbVarUtils.isString(query)){sql=query;}else if(typeof query==='object'&&query.postIdent==='ZynSql'){sql=query.toSql();}if(sql){return this.client.query(sql);}else{return new Promise((resolve,reject)=>{reject(new Error('Invalid SQL'));});}}describeTable(tableName){return new Promise((resolve,reject)=>{const sql=`DESC ${tableName}`;db_logger_1.DbLogger.log('setRecord :: haveRow ::',sql);this.client.query(sql).then(res=>{resolve(res);}).catch(err=>{cli_logger_1.Logger.logError('describeTable :: haveRow ::',err);reject(err);});});}};DbClient=__decorate([inversify_1.injectable(),__metadata('design:paramtypes',[])],DbClient);exports.DbClient=DbClient;