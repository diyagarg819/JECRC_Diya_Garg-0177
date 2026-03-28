import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEdit } from './employee-edit';

describe('EmployeeEdit', () => {
  let component: EmployeeEdit;
  let fixture: ComponentFixture<EmployeeEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
