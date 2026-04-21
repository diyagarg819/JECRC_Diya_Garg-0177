import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockFilterComponent } from './stock-filter.component';

// Verifies stock toggle defaults and emitted values.
describe('StockFilterComponent', () => {
  let component: StockFilterComponent;
  let fixture: ComponentFixture<StockFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default inStockOnly to false', () => {
    expect(component.inStockOnly).toBeFalse();
  });

  it('should emit true when toggled on', () => {
    let emitted: boolean | null = null;
    component.stockFilterChange.subscribe((val: boolean) => emitted = val);
    component.inStockOnly = true;
    component.onToggle();
    expect(emitted).toBeTrue();
  });

  it('should emit false when toggled off', () => {
    let emitted: boolean | null = null;
    component.stockFilterChange.subscribe((val: boolean) => emitted = val);
    component.inStockOnly = false;
    component.onToggle();
    expect(emitted).toBeFalse();
  });
});
