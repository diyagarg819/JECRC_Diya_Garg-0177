import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeView } from './employee-view';

describe('EmployeeView', () => {
  let component: EmployeeView;
  let fixture: ComponentFixture<EmployeeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeView],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
