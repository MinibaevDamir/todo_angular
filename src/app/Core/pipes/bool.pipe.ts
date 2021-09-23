import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanPipe'
})
export class BoolPipe implements PipeTransform {
  transform(value: boolean): string {
    if(value === false) {
      return "No complete"
    }
    else {
      return "Done"
    }
  }
}
