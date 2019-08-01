import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
{path:'products' ,component:ProductComponent},
{
  path: 'home',
  component: HomeComponent
},  
{ 
  path: '',
  pathMatch: 'full',
  redirectTo: 'home'

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
