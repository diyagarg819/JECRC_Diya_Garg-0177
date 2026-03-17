import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pizza } from './pizza';

describe('Pizza', () => {
  let component: Pizza;
  let fixture: ComponentFixture<Pizza>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pizza],
    }).compileComponents();

    fixture = TestBed.createComponent(Pizza);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
