import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingPageComponent } from './features/parking/pages/parking-page/parking-page.component';
// 👇 La correction est ici : on ajoute "export" devant "const"
export const routes: Routes = [
  { path: 'parkings', component: ParkingPageComponent },
  // Redirige vers parkings par défaut quand on ouvre l'application
  { path: '', redirectTo: '/parkings', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }