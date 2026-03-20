import { CommonModule } from '@angular/common';
import { Component,
  Input,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  OnDestroy,
  SimpleChanges,
  AfterViewChecked,
 } from '@angular/core';

@Component({
  selector: 'app-order-child',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './order-child.html',
  styleUrl: './order-child.css',
})
export class OrderChild implements
OnChanges,
OnInit,
DoCheck,
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy {
  @Input() orderData : any ;
  logs : string[] = [];

  log(message : string){
    this.logs.push(`${new Date().toLocaleDateString()} - ${message}`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.log('ngonChanges - Input Data changed');
  }

  ngOnInit(): void {
    this.log('ngonInit - Component Intialised');
  }

  ngDoCheck(): void {
    this.log('ngDoCheck - Change detection');
  }

  ngAfterContentInit(): void {
    this.log('ngAfterContentInit- Content Intialised');
  }

  ngAfterContentChecked(): void {
    this.log('ngAfterContentChecked - Content Checked')
  }

  ngAfterViewInit(): void {
    this.log('ngAfterViewInit - View Checked');
  }

  ngAfterViewChecked(): void {
    this.log('ngAfterViewChecked - View Checked');
  }

  ngOnDestroy(): void {
    this.log('ngOnDestroy - Component Destroyed');
  }
}
