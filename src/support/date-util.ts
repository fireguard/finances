import { Injectable } from "@angular/core";

@Injectable()
export class DateUtil {

  parseData(data) {
    var parts = data.split("-");
    return new Date(parts[0], parts[1]-1, parts[2]);
  }

  formatDateToPresent(dataMiliseconds) {
    let newDate = new Date(dataMiliseconds);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    return ((day < 10) ? '0'+day : day)+"/"+((month < 10) ? '0'+month : month)+"/"+year;
  }

  formatDateShortToPresent(dataMiliseconds): String {
    let newDate = new Date(dataMiliseconds);
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    return ((day < 10) ? '0'+day : day)+"/"+((month < 10) ? '0'+month : month);
  }

  formatDateToSave(dateMiliseconds) {
    let data = new Date(dateMiliseconds);
    let ano = data.getFullYear();
    let mes = data.getMonth() + 1;
    let dia = data.getDate();

    return ano + "-" + ((mes < 10) ? '0'+mes : mes) + "-" + ((dia < 10) ? '0'+dia : dia);
  }

  getMonthName(date) {
    let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return meses[date.getMonth()];
  }

  getFirstDay(date) {
    let ano = date.getFullYear();
    let mes = date.getMonth();
    return new Date(ano, mes, 1);
  }

  getLastDay(date) {
    // let newData = date;

    let ano = date.getFullYear();
    let mes = date.getMonth() + 1;

    return new Date(ano, mes, 0);
  }

  //Ano bissexto
  isLeapYear(year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
  };

  getDaysInMonth(date) {
    return [31, (this.isLeapYear(date.getFullYear()) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][date.getMonth()];
  };

  addMonths (date, numberMonths) {
    let day = date.getDate();
    date.setDate(1);
    date.setMonth(date.getMonth() + numberMonths);
    date.setDate(Math.min(day, this.getDaysInMonth(date)));
    return date;
  }

}


