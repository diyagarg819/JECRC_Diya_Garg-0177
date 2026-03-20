import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderParent } from './order-parent';

describe('OrderParent', () => {
  let component: OrderParent;
  let fixture: ComponentFixture<OrderParent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderParent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderParent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
