import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

// Verifies product retrieval, category generation, and copy semantics.
describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProducts() should return all products', () => {
    const products = service.getProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  it('getProducts() should return products with required fields', () => {
    const products = service.getProducts();
    products.forEach(p => {
      expect(p.id).toBeDefined();
      expect(p.name).toBeDefined();
      expect(p.category).toBeDefined();
      expect(p.price).toBeDefined();
      expect(p.stock).toBeDefined();
    });
  });

  it('getCategories() should return unique sorted categories', () => {
    const cats = service.getCategories();
    const unique = [...new Set(cats)];
    expect(cats.length).toBe(unique.length);
    expect(cats).toEqual([...cats].sort());
  });

  it('getProducts() should return a copy, not the original array', () => {
    const p1 = service.getProducts();
    const p2 = service.getProducts();
    expect(p1).not.toBe(p2);
  });
});
