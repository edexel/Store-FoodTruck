import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListToysComponent } from './component/toys/list-toys/list-toys.component';
import { ListFoodtruckComponent } from './component/foodtuck/list-foodtruck/list-foodtruck.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list-toys' },
  { path: 'list-toys', component: ListToysComponent },
  { path: 'list-foodtruck', component: ListFoodtruckComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
