import { ComponentsModule } from "@components/components.module";
import { IonicModule }      from '@ionic/angular';
import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { TranslateModule }  from "@ngx-translate/core";
import { StartPage }        from './start.page';

import { StartPageRoutingModule } from './start-routing.module';

@NgModule({
			  imports: [
				  IonicModule,
				  CommonModule,
				  FormsModule,
				  StartPageRoutingModule,
				  ComponentsModule,
				  TranslateModule
			  ],
	declarations: [StartPage]
})
export class StartPageModule {
}
