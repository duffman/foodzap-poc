import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageDishesPage } from './manage-dishes.page';

describe('ManageDishesPage', () => {
  let component: ManageDishesPage;
  let fixture: ComponentFixture<ManageDishesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDishesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageDishesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
