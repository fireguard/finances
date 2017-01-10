import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { AboutPage } from '../pages/about/about';
import { SqlManagerService } from '../services/sql-manager.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = '';
  pages: Object = {
    about: AboutPage
  };
  about = AboutPage;

  constructor(platform: Platform, sqlManager: SqlManagerService) {

    // this.accounts = AccountsPage;
    // this.launches = LaunchesPage;
    // this.categories = CategoriesPage;
    // this.about = AboutPage;

    platform.ready().then(() => {
      sqlManager.checkVersionDb().then((version) => {
        this.rootPage = this.about;

        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
        Splashscreen.hide();
      }, (error) => {
        console.log('Error');
        console.log(error);
      });
    });
  }

  openPage(page) {
    this.rootPage = page;
  }

}
