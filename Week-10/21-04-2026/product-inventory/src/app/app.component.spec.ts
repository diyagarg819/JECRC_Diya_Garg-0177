import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductService } from './services/product.service';

// Verifies root component creation, filtering behavior, and summary getters.
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [ProductService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load products on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.allProducts.length).toBeGreaterThan(0);
  });

  it('should filter by category', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.onCategoryFilter('Electronics');
    expect(app.filteredProducts.every(p => p.category === 'Electronics')).toBeTrue();
  });

  it('should show all products when empty category selected', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.onCategoryFilter('');
    expect(app.filteredProducts.length).toBe(app.allProducts.length);
  });

  it('should filter in-stock products only', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.onStockFilter(true);
    expect(app.filteredProducts.every(p => p.stock > 0)).toBeTrue();
  });

  it('should combine category + stock filters', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.onCategoryFilter('Electronics');
    app.onStockFilter(true);
    expect(app.filteredProducts.every(p => p.category === 'Electronics' && p.stock > 0)).toBeTrue();
  });

  it('totalProducts should equal all products length', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.totalProducts).toBe(app.allProducts.length);
  });
});
