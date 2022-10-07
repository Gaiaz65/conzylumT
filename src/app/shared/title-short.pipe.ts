import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleShort',
})
export class TitleShortPipe implements PipeTransform {
  transform(text: any) {
    if (text.length > 24) {
      return text.substr(0, 24) + '...';
    }
    return text;
  }
}
