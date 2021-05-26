'use strict';Object.defineProperty(exports,'__esModule',{value:true});const mysql=require('mysql');const db_logger_1=require('./db-logger');const db_result_parser_1=require('./db-result-parser');class DbTransaction{constructor(){this.scope=this;console.log('DbTransaction :: >> CONSTRUCTOR');}beginTransaction(){return new Promise((resolve,reject)=>{this.connection.query('START TRANSACTION',(error,result)=>{if(!error){resolve(result);}else{reject(error);}});});}executeQuery(sql){return new Promise((resolve,reject)=>{this.connection.query(sql,(error,result,tableFields)=>{db_result_parser_1.DbResultParser.parseQueryResult(error,result,tableFields).then(res=>{resolve(res);}).catch(err=>{reject(err);});});});}commit(){return new Promise((resolve,reject)=>{this.connection.query('COMMIT',(error,result)=>{console.log('error ::',error);console.log('result ::',result);if(!error){resolve(result);}else{reject(error);}});});}rollback(){return new Promise((resolve,reject)=>{this.connection.query('ROLLBACK',(error,result)=>{console.log('error ::',error);console.log('result ::',result);if(!error){resolve(result);}else{reject(error);}});});}createConnection(settings){let conn;return new Promise((resolve,reject)=>{try{conn=mysql.createConnection({host:settings.dbHost,user:settings.dbUser,password:settings.dbPass,database:settings.dbName});conn.on('error',err=>{if(err.code=='PROTOCOL_CONNECTION_LOST'){let error=new Error('PROTOCOL_CONNECTION_LOST');reject(error);}});conn.connect(err=>{if(err){reject(err);}resolve(conn);});}catch(err){db_logger_1.DbLogger.logErrorMessage('DbTransaction :: getConnection :: err ::',err);reject(err);}});}}exports.DbTransaction=DbTransaction;