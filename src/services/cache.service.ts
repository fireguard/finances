import { Injectable } from "@angular/core";
import {Events} from 'ionic-angular';

@Injectable()
export class CacheService {
  private reportByAccounts;
  private resultBalance;
  private balance;
  private countOverdue;
  
  constructor(public events: Events) {
    this.events = events;
    this._clearAll();
    events.subscribe("change:values", () => {
      this._clearAll();
    });
  }

  setDataReportByAccount(reportByAccounts) {
    this.reportByAccounts = reportByAccounts;
  }

  getDataReportByAccount() {
    return this.reportByAccounts;
  }

  setResultBalance(resultBalance) {
    this.resultBalance = resultBalance;
  }

  getResultBalance() {
    return this.resultBalance;
  }

  setBalance(balance) {
    this.balance = balance;
  }

  getBalance() {
    return this.balance;
  }

  setCountOverdue(countOverdue) {
    this.countOverdue = countOverdue;
    this.events.publish("change:countOverdue");
  }

  getCountOverdue() {
    return this.countOverdue;
  }

  _clearAll() {
    this.setDataReportByAccount([]);
    this.setResultBalance([]);
    this.setBalance([]);
    this.setCountOverdue(-1);
  }
}


