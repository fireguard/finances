import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppVersion } from 'ionic-native';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  version: String = "?";

  constructor(public navCtrl: NavController, public platform: Platform) {
    this.updateVersion();
  }

  updateVersion() {
    if (this.platform.is('cordova') ) {
      AppVersion.getVersionNumber().then((version) => {
        this.version = version;
      });
    }
  }
}
