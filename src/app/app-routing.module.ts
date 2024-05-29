import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { DevlogSeleniumComponent } from './devlog-selenium/devlog-selenium.component';
import { AppComponent } from './app.component';
const routes: Routes = [
    // {   path: '', 
    //     redirectTo: 'main-page', 
    //     pathMatch: 'full' 
    // }, // Redirect empty path
    {   path:'',
        component:MainPageComponent,
        data:{title:'Home'}, 
    },
    {   path:'devlog-selenium',
        component:DevlogSeleniumComponent,
        data:{title:'Devlog Selenium'}, 
    },
]; 


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }