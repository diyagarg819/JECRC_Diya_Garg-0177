import { Directive, Input, HostListener, ElementRef, Renderer2, Optional } from '@angular/core';

@Directive({
  selector: '[appClickBlock]',
  standalone: true
})
export class ClickBlockDirective {

  @Input() appClickBlock: boolean = true;

  constructor(
    @Optional() private el?: ElementRef,
    @Optional() private renderer?: Renderer2
  ) {}

  ngOnChanges() {
    this.updateUI();
  }

  private updateUI() {
    // 👉 Safety check (important)
    if (!this.el || !this.renderer) return;

    if (!this.appClickBlock) {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5');
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'not-allowed');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'opacity');
      this.renderer.removeStyle(this.el.nativeElement, 'cursor');
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (!this.appClickBlock) {
      event.preventDefault();
      event.stopPropagation();
      console.log("❌ Click blocked!");
    }
  }
}