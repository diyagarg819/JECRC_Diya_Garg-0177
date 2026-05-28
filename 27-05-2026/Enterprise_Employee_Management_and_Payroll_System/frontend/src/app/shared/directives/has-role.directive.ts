import { Directive, Input, TemplateRef, ViewContainerRef, inject, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/services/auth.service';
import { interval, startWith } from 'rxjs';

/**
 * Structural directive that conditionally renders elements based on user roles.
 * 
 * Edge case fix: This directive now re-evaluates on a periodic basis to handle
 * role changes after login/logout without requiring a full page reload.
 * 
 * Usage: <div *appHasRole="['HR', 'SuperAdmin']">HR-only content</div>
 */
@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit {
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  private requiredRoles: string[] = [];
  private hasView = false;

  @Input() set appHasRole(roles: string[]) {
    this.requiredRoles = roles;
    this.updateView();
  }

  public ngOnInit(): void {
    // Edge case: re-evaluate role check periodically to react to session changes
    // (e.g., user logs out in another tab, role changes after API call)
    interval(2000).pipe(
      startWith(0),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => this.updateView());
  }

  private updateView(): void {
    const shouldShow = this.authService.hasRole(this.requiredRoles);

    if (shouldShow && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!shouldShow && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
