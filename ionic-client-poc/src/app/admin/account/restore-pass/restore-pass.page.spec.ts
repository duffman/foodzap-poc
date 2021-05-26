import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RestorePassPage } from './restore-pass.page';

describe('RestorePassPage', () => {
  let component: RestorePassPage;
  let fixture: ComponentFixture<RestorePassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestorePassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RestorePassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
