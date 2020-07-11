import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ProductFilterComponent } from './home/product-filter/product-filter.component';
import { ProductCardComponent } from './home/product-card/product-card.component';
import { CardBtnComponent } from './shared/card-btn/card-btn.component';
import { LoaderComponent } from './loader/loader.component';
import { OrderSummaryComponent } from './check-out/order-summary/order-summary.component';
import { AuthComponent } from './auth/auth.component'
import { authInterceptor } from './interceptors/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ShoppingCardComponent,
    CheckOutComponent,
    ProductFilterComponent,
    ProductCardComponent,
    CardBtnComponent,
    OrderSummaryComponent,
    LoaderComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:authInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
