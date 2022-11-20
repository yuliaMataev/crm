import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'timeStampToDate'})
export class TimeStampToDate implements PipeTransform {
    
  transform(value: number): string {
        var date = new Date(value);
        var year = date.getFullYear();
        var month =date.getMonth();
        var day = date.getDate();
        
        return `${day}/${month}/${year}`;
    }
  }