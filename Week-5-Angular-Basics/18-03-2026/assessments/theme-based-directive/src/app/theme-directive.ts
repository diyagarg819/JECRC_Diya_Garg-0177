import { Directive, Input, ElementRef, Renderer2, OnChanges } from '@angular/core';

@Directive({
  selector: '[appTheme]',
  standalone: true
})
export class ThemeDirective implements OnChanges {

  @Input() appTheme: 'light' | 'dark' = 'light';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.applyTheme();
  }

  private applyTheme() {
    if (this.appTheme === 'dark') {
      // 🌙 Dark Mode
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#222');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#fff');
    } else {
      // ☀️ Light Mode
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#000');
    }
  }
}