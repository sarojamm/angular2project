import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LicenseManager } from 'ag-grid-enterprise/main';
LicenseManager.setLicenseKey('Lawrence_Livermore_National_Lab_WebPricer_3Devs15_June_2018__MTUyOTAxNzIwMDAwMA==f69b39cee122ad83fea1bbe23d5d886c');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
