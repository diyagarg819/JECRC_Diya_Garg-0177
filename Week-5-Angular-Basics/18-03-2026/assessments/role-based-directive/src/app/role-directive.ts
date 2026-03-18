import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective {

  private userRole: string = '';
  private requiredRole: string = '';

  constructor(
    private templateRef?: TemplateRef<any>,
    private viewContainer?: ViewContainerRef
  ) {}

  @Input() set appRole(role: string) {
    this.userRole = role;
    this.updateView();
  }

  @Input('appRoleRequired') set required(role: string) {
    this.requiredRole = role;
    this.updateView();
  }

  private updateView() {
    if (!this.templateRef || !this.viewContainer) return;

    this.viewContainer.clear();

    if (this.userRole === this.requiredRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}