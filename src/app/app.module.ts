import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { DevlogSeleniumComponent } from './devlog-selenium/devlog-selenium.component';
import { MapComponent } from './map/map.component';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DevlogSeleniumComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPageScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
