import { Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderBy'
})
@Injectable()
export class OrderByPipe implements PipeTransform{
  obj: any;

  transform(obj, orderFields) {
    this.obj = obj;
    if (orderFields instanceof Array) {
      orderFields.forEach(function(currentField) {
        this._orderBy(currentField);
      });
    }
    else {
      this._orderBy(orderFields);
    }

    return this.obj;
  }

  _orderBy(field) {
    let orderType = 'ASC';

    if (field[0] === '-') {
      field = field.substring(1);
      orderType = 'DESC';
    }

    this.obj.sort(function(a, b) {
      if (orderType === 'ASC') {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
      } else {
        if (a[field] < b[field]) return 1;
        if (a[field] > b[field]) return -1;
        return 0;
      }
    });
  }
}

