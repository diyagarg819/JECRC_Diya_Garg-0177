import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsDemo } from './rxjs-demo';

describe('RxjsDemo', () => {
  let component: RxjsDemo;
  let fixture: ComponentFixture<RxjsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
