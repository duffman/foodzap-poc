import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule }         from '@angular/forms';
import { ShellModule }         from "@app/shell/shell.module";

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';

@NgModule({
			  imports: [
				  CommonModule,
				  FormsModule,
				  IonicModule,
				  SettingsPageRoutingModule,
				  ShellModule,
				  ReactiveFormsModule
			  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
