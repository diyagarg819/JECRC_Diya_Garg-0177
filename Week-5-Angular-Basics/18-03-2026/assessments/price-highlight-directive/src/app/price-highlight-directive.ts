import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appPriceHighlight]',
  standalone: true
})
export class PriceHighlightDirective implements OnChanges {

  @Input() appPriceHighlight!: number;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.appPriceHighlight > 50000) {
      this.el.nativeElement.style.color = 'red';
      this.el.nativeElement.style.fontWeight = 'bold';
    } else {
      this.el.nativeElement.style.color = 'green';
    }
  }
}