// import { bootstrapApplication } from '@angular/platform-browser';

// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent)
//   .catch((err) => console.error(err));


// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
