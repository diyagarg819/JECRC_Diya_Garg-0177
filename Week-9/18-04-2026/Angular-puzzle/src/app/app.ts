import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  hierarchy = [
    { name: 'AppComponent', strategy: 'Default', level: 0 },
    { name: 'DashboardComponent', strategy: 'OnPush', level: 1 },
    { name: 'StatsComponent', strategy: 'Default', level: 2 },
  ];

  puzzleCode = `updateLocally() {
  this.userStats.score = 100;
}`;

  puzzleQuestions = [
    {
      label: 'a',
      marks: 3,
      text: 'Why does DashboardComponent not update its own view?'
    },
    {
      label: 'b',
      marks: 3,
      text: 'Why does StatsComponent show the updated value?'
    },
    {
      label: 'c',
      marks: 4,
      text: 'How would you fix DashboardComponent without changing its strategy to Default?'
    }
  ];

  answers = [
    {
      label: 'a',
      marks: 3,
      question: 'Why does DashboardComponent NOT update its own view?',
      answer: `DashboardComponent uses OnPush change detection. With OnPush, Angular only re-checks the component when an @Input() reference changes, an event fires inside it, or markForCheck() is called manually. In updateLocally(), the userStats object is mutated directly (this.userStats.score = 100) — the object reference stays the same. Since the reference did not change, Angular's OnPush skips re-rendering the component's template entirely.`,
      fixes: []
    },
    {
      label: 'b',
      marks: 3,
      question: 'Why does StatsComponent show the updated value?',
      answer: `StatsComponent uses the Default change detection strategy. Default strategy checks every component in the tree on every change detection cycle, regardless of whether inputs changed. When the button click triggers a CD cycle, Angular walks the whole tree and runs StatsComponent too. It reads the already-mutated userStats.score = 100 and correctly renders the updated value.`,
      fixes: []
    },
    {
      label: 'c',
      marks: 4,
      question: 'How to fix DashboardComponent without changing strategy to Default?',
      answer: '',
      fixes: [
        {
          title: 'Option 1 — markForCheck()',
          best: false,
          code: `constructor(private cdr: ChangeDetectorRef) {}\n\nupdateLocally() {\n  this.userStats.score = 100;\n  this.cdr.markForCheck();\n}`
        },
        {
          title: 'Option 2 — Immutable Update ⭐ Best Practice',
          best: true,
          code: `updateLocally() {\n  this.userStats = { ...this.userStats, score: 100 };\n  // new reference triggers OnPush\n}`
        },
        {
          title: 'Option 3 — detectChanges()',
          best: false,
          code: `constructor(private cdr: ChangeDetectorRef) {}\n\nupdateLocally() {\n  this.userStats.score = 100;\n  this.cdr.detectChanges();\n}`
        }
      ]
    }
  ];
}