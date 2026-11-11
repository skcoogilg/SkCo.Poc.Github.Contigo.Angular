import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToNumber',
  standalone: true,
})
export class StringToNumberPipe implements PipeTransform {

  transform(value: string): number {
    return Number(value);
  }

}
