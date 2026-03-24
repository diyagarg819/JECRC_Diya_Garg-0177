import { Component ,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { of , fromEvent , BehaviorSubject } from 'rxjs';
import { map , filter , switchMap , debounceTime , mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-demo.html',
  styleUrl: './rxjs-demo.css',
})
export class RxjsDemo implements OnInit, AfterViewInit {

  @ViewChild('clickBtn') clickBtn!: ElementRef;
  @ViewChild('searchBtn') searchBtn!: ElementRef;

  obsevableOutput: any[] = [];
  mapOutput: any[] = [];
  filterOutput: any[] = []
  multimapOutput: any[] = [];
  behaviorOutput: any[] = [];
  clickOutput: any[] = [];
  searchOutput: any[] = [];
  mergeMapOutput: any[] = [];

  loading = false;
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const observable$ = of(1, 2, 3, 4, 5);

    // Basic Observable example
    observable$.subscribe(value => {
      this.obsevableOutput.push(value);
    });

    // Map operator example
    observable$.pipe(
      map(x => x * 10)
    ).subscribe(res => {
      this.mapOutput.push(res);
    });

    // Filter + Map operator example
    observable$.pipe(
      map(x => x * 2 === 0 ? x * 100 : null),
    ).subscribe(res => {
      if (res !== null) {
        this.filterOutput.push(res);
      }
    });

    observable$.pipe(
      map(x => x + 1),
      map(x => x +2),
      map(x => `Final value: ${x}`),
    ).subscribe(res => 
      this.multimapOutput.push(res));

      of(1, 2, 3).pipe(
        mergeMap(id => this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${id}`))
      ).subscribe(res => {
        this.mergeMapOutput.push(res);
      });
  }

  ngAfterViewInit(): void {

    //search with filter and debouncetime and switchmap
    fromEvent(this.searchBtn.nativeElement, 'input').pipe(

      // Add debounce to limit API calls
      debounceTime(500),

      // Extract the search term from the input event
      map((event: any) => event.target.value.trim()),

      // Only proceed if the search term is longer than 3 characters
      filter(value => value.length > 3),

      // Use switchMap to cancel previous API calls if a new search term is entered
      switchMap(text => {
        this.loading = true;
        return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?q=${text}`);
      })
      ).subscribe({
      next : (res) => {
        this.searchOutput = res;
        this.loading = false;
      },
      error : () => {
        this.searchOutput = [];
        this.loading = false;
      },
      complete : () => {
        console.log('Search stream completed ');
      }
    });
  }
}
