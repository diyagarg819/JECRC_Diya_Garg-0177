// src/app/shared/pipes/reverse.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reversePipe',
  standalone: true
})
export class ReversePipe implements PipeTransform {
  transform<T>(value: T[]): T[] {
    return [...value].reverse();
  }
}
