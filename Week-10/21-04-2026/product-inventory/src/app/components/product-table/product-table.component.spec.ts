import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductTableComponent } from './product-table.component';
import { Product } from '../../models/product.model';

// Provides stable test data used to verify rendering and sorting behavior.
const mockProducts: Product[] = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 850.50, stock: 10 },
  { id: 2, name: 'Chair', category: 'Furniture', price: 349.00, stock: 0 },
  { id: 3, name: 'Mouse', category: 'Electronics', price: 29.99, stock: 5 },
];

// Verifies table rendering, sorting behavior, and stock status mapping.
describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    component.products = mockProducts;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all products initially', () => {
    expect(component.displayedProducts.length).toBe(3);
  });

  it('should sort by price ascending on first click', () => {
    component.togglePriceSort();
    const prices = component.displayedProducts.map(p => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it('should sort by price descending on second click', () => {
    component.togglePriceSort();
    component.togglePriceSort();
    const prices = component.displayedProducts.map(p => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  it('getStockStatus should return "out" for stock 0', () => {
    expect(component.getStockStatus(0)).toBe('out');
  });

  it('getStockStatus should return "low" for stock <= 5', () => {
    expect(component.getStockStatus(3)).toBe('low');
    expect(component.getStockStatus(5)).toBe('low');
  });

  it('getStockStatus should return "in" for stock > 5', () => {
    expect(component.getStockStatus(10)).toBe('in');
  });

  it('should show empty state when products is empty', () => {
    component.products = [];
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.empty-state')).toBeTruthy();
  });
});
