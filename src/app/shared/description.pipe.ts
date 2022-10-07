import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionShort'
})
export class DescriptionPipe implements PipeTransform {

  transform(text: any) {
 if (text.length > 60) {
   return text.substr(0, 40) + ' ...';
 }
 return text;
  }

}
