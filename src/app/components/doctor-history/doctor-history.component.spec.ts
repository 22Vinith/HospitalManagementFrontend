import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorHistoryComponent } from './doctor-history.component';

describe('DoctorHistoryComponent', () => {
  let component: DoctorHistoryComponent;
  let fixture: ComponentFixture<DoctorHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorHistoryComponent]
    });
    fixture = TestBed.createComponent(DoctorHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
