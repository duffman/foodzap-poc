/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Input }             from "@angular/core";
import { Component, OnInit } from '@angular/core';
import { CatPopoverAction }  from "@app/admin/manage-menu/category-popover/cat-popover-result";
import { CatPopoverResult }  from "@app/admin/manage-menu/category-popover/cat-popover-result";
import { PopoverController } from "@ionic/angular";

@Component(
	{
		selector:    'app-cat-popover',
		templateUrl: './cat-popover.component.html',
		styleUrls:   ['./cat-popover.component.scss'],
	})
export class CatPopoverComponent implements OnInit {

	@Input() menuId: number;
	@Input() isFirst: boolean;
	@Input() isLast: boolean;
	@Input() controller: PopoverController;

	constructor() { }

	ngOnInit() {
		console.log('@Input() isFirst ::', this.isFirst);
		console.log('@Input() isLast ::', this.isLast);
	}

	makeCatResult(action: CatPopoverAction, data?: any): CatPopoverResult {
		if (!data) {
			data = {menuId: this.menuId}
		}

		return new CatPopoverResult(action, data);
	}

	doDismiss(action: CatPopoverAction, data?: any) {
		let result = this.makeCatResult(action, data);
		this.controller.dismiss(result);
	}

	addDish() {
		this.doDismiss(CatPopoverAction.AddDish);
	}

	showMoveUp(): boolean {
		return !this.isFirst;
	}

	showMoveDown(): boolean {
		return !this.isLast;
	}

	moveUp() {
		this.doDismiss(CatPopoverAction.MoveUp);
	}

	moveDown() {
		this.doDismiss(CatPopoverAction.MoveDown);
	}

	delete() {
		this.doDismiss(CatPopoverAction.Delete);
	}
}
