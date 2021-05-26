/**
 * The file is part of the ZynapticSQL project
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Licensed under the GNU Lesser General Public License, Version 3.0
 * Find a full copy of the license in the LICENSE.md file located in the project root.
 */

import { DCount }                              from "./records/records";
import {
	DAnd,
	DDelete,
	DDrop,
	DFrom,
	DInQuery,
	DInsert,
	DInto,
	DJoin,
	DLeftJoin,
	DLimit,
	DOrderBy,
	DSelect,
	DSelectAll,
	DSet,
	DUpdate,
	DWith
}                                              from "./records/records";
import { DSetMulti }                           from "./records/records";
import {
	DAndOrWhere,
	DAndWhere,
	DOrAndWhere,
	DOrWhere,
	DWhere,
	DWhereBetween,
	DWhereSimple
}                                              from "./records/where-record";
import { IDRecord }                            from "./types";
import { ColumnArray }                         from "./types";
import { CompareType, OrderType, SQLCommands } from "./types";
import { VarUtils }   from "./var.utils";
import { QueryUtils } from "./query-utils";

const l = console.log;
const e = console.error;

/**
 * Simple Active Record implementation
 * Note: This does not add any intelligens, stupid behaviour such
 * as calling an SELECT after a SET, broken SQL will remain broken :)
 */
export interface ISqlIgniter {
	clear(): void;
	debugShowAll(): void;
	escpaeVal(value: any);
	toSql(): string;
	selectAll(...elements: Array<string>|null): SqlIgniter;
	count(column: string, alias?: string): SqlIgniter;
	get(table: string): ISqlIgniter;
	select(...param: Array<string>): SqlIgniter;
	update(table: string): SqlIgniter;
	delete(table: string): SqlIgniter;
	insert(data: any, tableName: string, mySQLReplace?: boolean): SqlIgniter;
	replace(data: any, tableName: string): SqlIgniter;
	with(...data: Array<any>): SqlIgniter;
	into(tableName: string): SqlIgniter;
	set(column: string, value: any): SqlIgniter;
	setMulti(data: any, tableName: string): SqlIgniter;
	join(columns: ColumnArray): SqlIgniter;
	inQuery(dynSql: SqlIgniter): SqlIgniter;
	joinTable(tableName: string, on: string, value: any, escapeVal: boolean): SqlIgniter;
	selectAs(fromTable: string, alias?: string): SqlIgniter;
	from(tableName: string, alias?: string): SqlIgniter;
	whereIs(whereParamsObj: any, value2?: any, whereType?: CompareType): SqlIgniter;
	where(value1: any, value2: any, whereType?: CompareType, escapeValue?: boolean): SqlIgniter;
	orWhere(value1: any, value2?: any, compareType?: CompareType): SqlIgniter;
	andWhere(value1: any, value2?: any, compareType?: CompareType): SqlIgniter;
	andOrWhere(value1: any, value2?: any, compareType?: CompareType): SqlIgniter;
	orAndWhere(value1: any, value2?: any, compareType?: CompareType): SqlIgniter;
	whereBetween(value: any, rangeStart: any, rangeEnd: any): SqlIgniter;
	orderBy(column: string, orderType: OrderType): SqlIgniter;
	orderByRand(): SqlIgniter;
	and(col: string, value: any, compType: CompareType, escapeVal: boolean): SqlIgniter;
	limitBy(fromValue: number, toValue?: number): SqlIgniter;
}

export class SqlIgniter implements ISqlIgniter {
	public typeIdent: string = 'SqlIgniter';
	protected records: Array<IDRecord>;
	protected currRec: IDRecord = undefined;
	protected prevRec: IDRecord = undefined;

	constructor() {
		this.records = new Array<IDRecord>();
	}

	public clear(): void {
		this.records.length = 0;
	}

	public debugShowAll(): void {
		for (let item of this.records) {
			l('item ::', item);
		}
	}

	public escpaeVal(value: any): string {
		let result = value;

		if (!value) {
			result = 'null';
		}
		else if (typeof value === "string") {
			result = QueryUtils.escape(value);
		}
		else if (typeof value === "object") {
			result = QueryUtils.escape(value);
		}
		else {
			result = value;
		}

		return result;
	}

	private isSelectRec(arec: any): boolean {
		return ( arec instanceof DSelect || arec instanceof DSelectAll );
	}

	public toSql(): string {
		let sql: string = "";

		for (let i = 0; i < this.records.length; i++) {
			this.prevRec = this.currRec;
			this.currRec = this.records[i];

			if (this.currRec instanceof DCount) {
				sql += this.parseCount();
			}

			if (this.currRec instanceof DInsert) {
				sql += this.parseInsert();
			}

			if (this.currRec instanceof DSelect) {
				sql += this.parseSelect();
			}

			if (this.currRec instanceof DSelectAll) {
				if (this.prevRec !== undefined) {
					throw new Error(`${DSelectAll} instruction is not allowed after ${typeof this.prevRec}`);
				}

				sql += this.parseSelectAll();
			}

			if (this.currRec instanceof DFrom) {
				sql += this.parseFrom();
			}

			if (this.currRec instanceof DSet) {
				sql += this.parseSet();
			}

			if (this.currRec instanceof DSetMulti) {
				sql += this.parseSetMulti();
			}

			if (this.currRec instanceof DLeftJoin) {
				sql += this.parseLeftJoin();
			}

			if (VarUtils.isWhereRec(this.currRec)) {
				sql += this.parseWhere();
			}

			if (this.currRec instanceof DAnd) {
				sql += this.parseAnd();
			}

			if (this.currRec instanceof DOrderBy) {
				sql += this.parseOrderBy();
			}

			if (this.currRec instanceof DLimit) {
				sql += this.parseLimit();
			}
		}

		return sql;
	}

	/**
	 * Returns the previous record from a given
	 * record in the record array
	 * @param {IDRecord} record
	 * @returns {IDRecord}
	 */
	private getPreviousRecord(record: IDRecord): IDRecord|null {
		let result: IDRecord;
		let index = this.records.indexOf(record);

		if (index > -1 && index - 1 > 0) {
			result = this.records[index] as IDRecord;
		}

		return result;
	}

	public selectAll(...elements: Array<string>|null) {
		// Be nice, if no parameter is passed add an asterisk
		if (!elements) {
			elements.push("*")
		}

		for (let item in elements) {
			let name = elements[item];
			this.records.push(new DSelectAll(name));
		}

		return this;
	}

	public count(tableName: string, alias?: string, column: string = "*"): SqlIgniter {
		this.records.push(new DCount(tableName, column, alias));
		return this;
	}

	public get(table: string): ISqlIgniter {
		this.records.push(new DSelect('*'));
		let rec = new DFrom(table);
		this.records.push(rec);
		return this;
	}

	public select(...param: Array<string>): SqlIgniter {
		for (let item in param) {
			let name = param[item];
			this.records.push(new DSelect(name));
		}

		return this;
	}

	public update(table: string): SqlIgniter {
		this.records.push(new DUpdate(table));
		return this;
	}

	public delete(table: string): SqlIgniter {
		this.records.push(new DDelete(table));
		return this;
	}

	public insert(data: any, tableName: string, mySQLReplace?: boolean): SqlIgniter {
		this.clear(); //TODO: Split into multiple queries instead of clearing-
		this.records.push(new DInsert(data, tableName, mySQLReplace));
		return this;
	}

	public replace(data: any, tableName: string): SqlIgniter {
		this.clear(); //TODO: Split into multiple queries instead of clearing-
		return this.insert(data, tableName, true);
	}

	public with(...data: Array<any>): SqlIgniter {
		this.records.push(new DWith(data));
		return this;
	}

	public into(tableName: string): SqlIgniter {
		this.records.push(new DInto(tableName));
		return this;
	}

	public set(column: string, value: any): SqlIgniter {
		this.records.push(new DSet(column, value));
		return this;
	}

	public setMulti(data: any, tableName?: string): SqlIgniter {
		this.records.push(new DSetMulti(data, tableName));
		return this;
	}

	public join(columns: ColumnArray): SqlIgniter {
		this.records.push(new DJoin(columns));
		return this;
	}

	public inQuery(dynSql: SqlIgniter): SqlIgniter {
		this.records.push(new DInQuery(dynSql));
		return this;
	}

	public joinTable(tableName: string, on: string, value?: any, escapeVal: boolean = true): SqlIgniter {
		this.records.push(new DLeftJoin(tableName, on, value, escapeVal));
		return this;
	}

	public selectAs(fromTable: string, alias: string = null): SqlIgniter {
		this.records.push(new DSelect(fromTable, alias));
		return this;
	}

	public from(tableName: string, alias: string = null): SqlIgniter {
		let rec = new DFrom(tableName, alias);
		this.records.push(rec);
		return this;
	}

	public whereIs(whereParamsObj: any, value2?: any, whereType: CompareType = CompareType.Equal): SqlIgniter {
		this.records.push(
			new DWhere(whereParamsObj, value2, whereType)
		);

		return this;
	}

	public where(value1: any, value2: any = null, whereType: CompareType = CompareType.Equal, escapeValue: boolean = true): SqlIgniter {
		let rec = new DWhereSimple(value1, value2, whereType, escapeValue);
		this.records.push(rec);
		return this;
	}

	public orWhere(value1: any, value2: any = null, compareType?: CompareType): SqlIgniter {
		let rec = new DOrWhere(value1, value2, compareType);
		this.records.push(rec);
		return this;
	}

	public andWhere(value1: any, value2: any = null, compareType?: CompareType): SqlIgniter {
		let rec = new DAndWhere(value1, value2, compareType);
		this.records.push(rec);
		return this;
	}

	public andOrWhere(value1: any, value2: any = null, compareType?: CompareType): SqlIgniter {
		let rec = new DAndOrWhere(value1, value2, compareType);
		this.records.push(rec);
		return this;
	}

	public orAndWhere(value1: any, value2: any = null, compareType?: CompareType): SqlIgniter {
		let rec = new DOrAndWhere(value1, value2, compareType);
		this.records.push(rec);
		return this;
	}

	public whereBetween(value: any, rangeStart: any, rangeEnd: any): SqlIgniter {
		QueryUtils.escape(value);
		let rec = new DWhereBetween(CompareType.Between, value, rangeStart, rangeEnd);
		this.records.push(rec);
		return this;
	}

	public orderBy(column: string, orderType: OrderType = OrderType.None): SqlIgniter {
		let rec = new DOrderBy(column, orderType);
		this.records.push(rec);
		return this;
	}

	public orderByRand(): SqlIgniter {
		let rec = new DOrderBy("RAND()");
		this.records.push(rec);
		return this;
	}

	public and(col: string, value: any = null, compType: CompareType = CompareType.Equal, escapeVal: boolean = true) {
		let rec = new DAnd(col, value, compType, escapeVal);
		this.records.push(rec);
		return this;
	}

	public limitBy(fromValue: number, toValue: number = null): SqlIgniter {
		let rec = new DLimit(fromValue, toValue);
		this.records.push(rec);
		return this;
	}

	///////////////////////////////////////////
	//
	//     HELPERS
	//
	///////////////////////////////////////////

	findRecord(recType: IDRecord): IDRecord {
		let result = this.findRecords(recType);
		if (result.length > 0) {
			return result[0];
		}
		else {
			return null;
		}
	}

	findRecords(recType: IDRecord, firstHit: boolean = false): Array<IDRecord> {
		let result: Array<IDRecord> = [];
		for (let i = 0; i < this.records.length; i++) {
			let record = this.records[i];

			if (typeof record === recType) {
				result.push(record);
				if (firstHit) {
					break;
				}
			}
		}

		return result;
	}

	pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
		return propertyNames.map(n => o[n]);
	}

	protected parseCount(): string {
		let result = ``;

		if (this.currRec instanceof DCount) {
			const rec = this.currRec as DCount;

			result += `SELECT COUNT(${rec.column})`
			if (rec.alias) {
				result += ` AS ${rec.alias}`;
			}

			if (rec.tableName) {
				result += ` FROM ${rec.tableName}`;
			}
		}

		return result;
	}

	protected parseJoin(): string {
		let localCounter = 0;

		for (let i = 0; i < this.records.length; i++) {
			let record = this.records[i];

			if (record instanceof DJoin) {
				const dRec = record as DJoin;
			}
		}

		return "";
	}

	////////////////////////////////////////
	//
	//     INSERT
	//
	////////////////////////////////////////

	protected parseInsert(): string {
		let record = this.records[0];

		if (!( record instanceof DInsert )) {
			return "";
		}

		let result     = "";
		const dRec     = record as DInsert;
		let insertType = dRec.mySQLReplace ? SQLCommands.DbMySqlReplace : SQLCommands.DbInsert;
		let colNames   = new Array<string>();
		let colValues  = new Array<any>();

		let obj = dRec.data;

		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				colNames.push(key);
				colValues.push(obj[key]);
			}
		}

		for (let i = 0; i < colValues.length; i++) {
			let value    = colValues[i];
			value        = this.escpaeVal(value);
			colValues[i] = value;
		}

		result = `${insertType} INTO ${dRec.tableName} (${colNames.join(",")}) VALUES (${colValues.join(",")})`;

		return result;
	}

	////////////////////////////////////////
	//
	//     SELECT
	//
	///////////////////////////////////////

	protected parseSelect(): string {
		let result = ``;

		if (this.currRec instanceof DSelect) {
			const rec = this.currRec as DSelect;

			if (this.isSelectRec(this.prevRec)) {
				result += ",";
			}
			else {
				result += "SELECT"
			}

			result += ` ${rec.column}`;
		}

		return result;
	}

	protected parseSelectAll(): string {
		let result = ``;

		if (this.currRec instanceof DSelectAll) {
			const rec = this.currRec as DSelectAll;
			result += `SELECT * FROM ${rec.tableName}`
		}

		return result;
	}

	////////////////////////////////////////
	//
	//     UPDATE
	//
	///////////////////////////////////////

	protected parseUpdate(): string {
		let result = ``;

		if (this.currRec instanceof DUpdate) {
			const rec = this.currRec as DUpdate;
			result    = `UPDATE ${QueryUtils.escape(rec.table)}`;
		}

		return result;
	}

	////////////////////////////////////////
	//
	//     DELETE
	//
	///////////////////////////////////////

	protected parseDelete(): string {
		let result = ``;

		if (this.currRec instanceof DDelete) {
			result = `DELETE FROM ${QueryUtils.escape(this.currRec.tableName)}`;
		}

		return result;
	}

	////////////////////////////////////////
	//
	//     DROP
	//
	///////////////////////////////////////

	protected parseDrop(): string {
		let result = "";

		if (this.currRec instanceof DDrop) {
			const rec = this.currRec as DDrop;
			result    = `DROP ${QueryUtils.escape(rec.tableName)}`;
		}

		return result;
	}

	////////////////////////////////////////
	//
	//     FROM
	//
	///////////////////////////////////////

	protected parseFrom(): string {
		let result = "";

		if (this.currRec instanceof DFrom) {
			const rec = this.currRec as DFrom;

			if (this.prevRec instanceof DFrom) {
				result += ",";
			}
			else {
				result += " " + SQLCommands.DbFrom;
			}

			result += " " + rec.table;

			if (rec.alias != null) {
				result += " AS " + rec.alias;
			}
		}

		return result;
	}

	////////////////////////////////////////
	//
	//     SET
	//
	///////////////////////////////////////

	protected parseSet(): string {
		let result = "";

		if (this.currRec instanceof DSet) {
			const rec = this.currRec as DSet;

			if (this.prevRec instanceof DSet) {
				result += " SET"
			}
			else {
				result += " ,";
			}

			let val = rec.escape ? QueryUtils.escape(rec.value) : rec.value;
			result += " " + rec.column + "='" + val + "'";
		}

		return result;

	} // parseSet

	protected parseSetMulti(): string {
		let record = this.records[0];
		let result = "";

		if (!( record instanceof DSetMulti )) {
			return result;
		}

		const dRec: DSetMulti = record as DSetMulti;

		let setValues = new Array<any>();
		let obj = dRec.data;

		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				setValues.push(
					`${key}=${this.escpaeVal(obj[key])}`
				);
			}
		}

		if (record.tableName && this.prevRec !== DUpdate) {
			result = `${SQLCommands.DbUpdate} ${dRec.tableName} `;
		}

		result += `${SQLCommands.DbSet} ${setValues.join(",")}`;
		return result;
	}

	////////////////////////////////////////
	//
	//     LEFT JOIN
	//
	////////////////////////////////////////

	protected parseLeftJoin(): string {
		let result = "";

		if (this.currRec instanceof DLeftJoin) {
			const rec = this.currRec as DLeftJoin;

			result += " LEFT JOIN "
					  + rec.table + " ON "
					  + rec.on;

			if (rec.value) {
				rec.value = rec.escapeVal ? QueryUtils.escape(rec.value) : rec.value;
				result += " = " + rec.value;
			}
		}

		return result;

	} // parseLeftJoin

	////////////////////////////////////////
	//
	//     WHERE
	//
	////////////////////////////////////////

	protected parseWhere(): string {
		let result = ``;

		if (VarUtils.isWhereRec(this.prevRec)) {
			result += " AND ";
		}
		else {
			result += " WHERE ";
		}

		if (this.currRec instanceof DWhereSimple) {
			result += QueryUtils.parseCompareType(
				this.currRec.value1,
				this.currRec.value2,
				this.currRec.whereType
			);
		}

		if (this.currRec instanceof DWhere) {
			const rec = this.currRec as DWhere;

			if (typeof rec.data === "string") {
				result += rec.data;

			}
			else {
				let colNames  = new Array<string>();
				let colValues = new Array<any>();

				let obj = rec.data;

				for (let key in obj) {
					if (obj.hasOwnProperty(key)) {
						colNames.push(key);
						colValues.push(obj[key]);
					}
				}

				let colData = Array<string>();

				for (let i = 0; i < colValues.length; i++) {
					colData.push(`${colNames[i]}=${QueryUtils.escape(colValues[i])}`);
				}

				result += colData.join(" AND ");
			}
		}

		return result;

	} // parseWhere

	////////////////////////////////////////
	//
	//      And
	//
	////////////////////////////////////////
	protected parseAnd(): string {
		let result = "";

		if (this.currRec instanceof DAnd) {
			let rec = this.currRec as DAnd;
			result += " AND ";

			if (rec.value !== undefined) {
				// Special case for null value
				if (rec.value === null) {
					switch (rec.compare) {
						case CompareType.Equal:
							result += " IS NULL";
							break;

						case CompareType.NotEqual:
							result += " NOT NULL";
							break;
					}

				}
				else {
					result += QueryUtils.parseCompareType(
						rec.column,
						rec.value,
						rec.compare
					);
				}
			}
		}

		return result;
	}

	////////////////////////////////////////
	//
	//  Order
	//
	///////////////////////////////////////

	protected parseOrderBy(): string {
		let result = "";

		if (this.currRec instanceof DOrderBy) {
			let rec = this.currRec as DOrderBy;

			if (this.prevRec instanceof DOrderBy) {
				result += ", ";
			}
			else {
				result += " ORDER BY ";
			}

			result += rec.fieldName;

			if (rec.orderType !== OrderType.None) {
				switch (rec.orderType) {
					case OrderType.Asc:
						result += " ASC";
						break;
					case OrderType.Desc:
						result += " DESC";
						break;
				}
			}

		}

		return result;

	} // end parseOrderBy

	////////////////////////////////////////
	//
	//  Limit
	//
	///////////////////////////////////////
	protected parseLimit(): string {
		let result = "";

		if (this.currRec instanceof DLimit) {
			const rec = this.currRec as DLimit;
			result += " LIMIT " + rec.fromValue;

			if (rec.toValue != null) {
				result += ", " + rec.toValue;
			}
		}

		return result;

	} // end parseLimit
}
