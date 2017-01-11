import { Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatMoney'
})
@Injectable()
export class FormatMoneyPipe implements PipeTransform{
  obj: any;

  transform(value, reference ) {
    if (!isNaN(value)) {
      let currency = 'R$';
      let sign = ( value < 0 ) ? '-' : '';
      let formatedValue = this._formatNumber(value, 2, '.', ',');

      return sign + ' ' + currency + ' ' + formatedValue;
    }
    return value;
  }

  _formatNumber(value, decimalPlaces, thousandsSeparator, decimalSeparator ) {
    if (value < 0) value = value * -1;
    decimalPlaces = isNaN(decimalPlaces) ? 2 : Math.abs(decimalPlaces);
    decimalSeparator = decimalSeparator || ',';
    thousandsSeparator = thousandsSeparator || '.';

    let newValue = value.toFixed(decimalPlaces);
    return newValue.replace('.', decimalSeparator).replace(/(\d)(?=(\d{3})+\,)/g, "$1"+thousandsSeparator);
  }

}

