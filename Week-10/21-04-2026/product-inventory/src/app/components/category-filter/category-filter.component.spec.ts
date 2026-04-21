import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryFilterComponent } from './category-filter.component';

// Verifies category selection events and option rendering.
describe('CategoryFilterComponent', () => {
  let component: CategoryFilterComponent;
  let fixture: ComponentFixture<CategoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFilterComponent);
    component = fixture.componentInstance;
    component.categories = ['Electronics', 'Furniture', 'Sports'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected category on filter click', () => {
    let emitted = '';
    component.filterChange.subscribe((val: string) => emitted = val);
    component.selectedCategory = 'Electronics';
    component.onFilter();
    expect(emitted).toBe('Electronics');
  });

  it('should emit empty string when no category selected', () => {
    let emitted = 'something';
    component.filterChange.subscribe((val: string) => emitted = val);
    component.selectedCategory = '';
    component.onFilter();
    expect(emitted).toBe('');
  });

  it('should render category options', () => {
    const el: HTMLElement = fixture.nativeElement;
    const options = el.querySelectorAll('option');
    // +1 for "All Categories" default option
    expect(options.length).toBe(4);
  });
});
