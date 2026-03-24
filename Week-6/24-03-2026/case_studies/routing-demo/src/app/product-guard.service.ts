import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductGuardService implements CanActivate{
  constructor(private router: Router ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const id = Number(route.paramMap.get('id'));
    if (isNaN(id) || id <= 0) {
      alert('Invalid product ID. Please enter a valid number greater than 0.');
      this.router.navigate(['/product']);
      return false;
    }
    return true;
  }
 }
