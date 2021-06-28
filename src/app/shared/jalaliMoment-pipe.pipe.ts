import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import * as jalaliMoment from "jalali-moment";


@Pipe({ name: 'momentJalaali' })

export class MomentJalaali implements PipeTransform {
  transform(value: any, args?: any): any {
    return jalaliMoment(value).format(args);
  }
}
