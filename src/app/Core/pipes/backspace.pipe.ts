import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backspacePipe'
})
export class BackspacePipe implements PipeTransform {
  transform(value: string): string {
   const newValue = value
   .replace(/(_|-)/g, ' ')
   .trim()
   .replace(/\w\S*/g, function(str) {
     return str.charAt(0).toUpperCase() + str.substr(1)
   })   
   .replace(/([a-z])([A-Z])/g, '$1 $2')
   .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')   
   return newValue
  }
}
