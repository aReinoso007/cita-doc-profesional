import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubespecialidaddetallePage } from './subespecialidaddetalle.page';

describe('SubespecialidaddetallePage', () => {
  let component: SubespecialidaddetallePage;
  let fixture: ComponentFixture<SubespecialidaddetallePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubespecialidaddetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubespecialidaddetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
