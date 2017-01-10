import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { AppVersion } from 'ionic-native';

@Injectable()
export class ApplicationService {

  constructor(public platform: Platform) {

  }

  hasCordova(): boolean {
    return this.platform.is('cordova');
  }


  getAppVersion(){
    if ( this.hasCordova() ) {
      return AppVersion.getVersionNumber();
    }

    return new Promise(function (resolve, reject) {
      resolve('?');
    });
  }


}


