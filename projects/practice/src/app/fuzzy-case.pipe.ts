import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fuzzyCase',
  standalone: true,
  pure: true,
})
export class FuzzyCasePipe implements PipeTransform {
  transform(value: string) {
    // let result = '';
    // for (let i = 0; i < value.length; i++) {
    //   let letter = value[i];
    //   if (i % 2 === 0) letter = letter.toLowerCase();
    //   else letter = letter.toUpperCase();
    //   result += letter;
    // }
    // for (let i = 0; i < value.length; i++) {
    //   result += i % 2 === 0 ? value[i].toLowerCase() : value[i].toUpperCase();
    // }
    // return result
    // return value.split('').map((letter, i) =>i % 2 === 0 ? letter.toLowerCase() : letter.toUpperCase()).join('');
    return Array(value.length).fill(0).reduce((result, _, i) => result + (i % 2 === 0 ? value[i].toLowerCase() : value[i].toUpperCase()), '');
  }
}
