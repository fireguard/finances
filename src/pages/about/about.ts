import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApplicationService } from "../../services/application.service";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [ ApplicationService ]
})
export class AboutPage {
  version: String = "?";

  constructor(public navCtrl: NavController, public applicationService: ApplicationService) {
    this.updateVersion();
  }

  updateVersion() {
    this.applicationService.getAppVersion().then((version) => {
      this.version = version;
    });
  }
}
