import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { CheckAuthGuard } from './guards/check-auth.guard';


const routes: Routes = [
  { path:'',component:HomeComponent },
  { path:'shopping-card',component:ShoppingCardComponent },
  { path:'check-out',component:CheckOutComponent,canActivate:[AuthGuard] },
  { path:'authentication',component:AuthComponent,canActivate:[CheckAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
