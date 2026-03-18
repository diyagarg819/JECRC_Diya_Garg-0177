import { Directive, Input, ElementRef, Renderer2, OnChanges } from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
  standalone: true
})
export class StatusColorDirective implements OnChanges {

  @Input() appStatusColor: number = 0; // marks
  @Input() passingMarks: number = 50;  // default passing

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.applyColor();
  }

  private applyColor() {
    if (this.appStatusColor >= this.passingMarks) {
      // ✅ PASS → Green
      this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
    } else {
      // ❌ FAIL → Red
      this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
    }
  }
}