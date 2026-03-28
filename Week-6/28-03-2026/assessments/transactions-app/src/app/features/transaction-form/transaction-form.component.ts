import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../core/services/transaction.service';
import { CanComponentDeactivate } from '../../core/guards/confirm-leave.guard';
import { Transaction } from '../../core/models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-form.component.html'
})
export class TransactionFormComponent implements OnInit, CanComponentDeactivate {
  form!: FormGroup;
  isEditMode = false;
  transactionId: number | null = null;
  isLoading = false;
  isSaving = false;
  errorMessage: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private txService: TransactionService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.transactionId = +id;
      this.loadTransaction(this.transactionId);
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      date: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      type: [0, Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      balance: ['', Validators.required]
    });
  }

  loadTransaction(id: number): void {
    this.isLoading = true;
    this.txService.getTransactionById(id).subscribe({
      next: (tx) => {
        this.form.patchValue(tx);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    this.isSaving = true;
    const payload = this.form.value as Transaction;

    const request$ = this.isEditMode && this.transactionId
      ? this.txService.updateTransaction(this.transactionId, { ...payload, id: this.transactionId })
      : this.txService.createTransaction(payload);

    request$.subscribe({
      next: () => {
        this.form.markAsPristine();
        this.router.navigate(['/transactions']);
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isSaving = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/transactions']);
  }

  canDeactivate(): boolean {
    return this.form.pristine || this.submitted;
  }

  get f() { return this.form.controls; }
}
