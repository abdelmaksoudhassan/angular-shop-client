import { Component } from '@angular/core';
import { ShoppingCardService } from './services/shopping-card.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  constructor(
    private ShoppingCardService:ShoppingCardService,
    private AuthService:AuthService
    ){
      this.AuthService.autoLogin()
      const card = JSON.parse(localStorage.getItem('card')) || []
      this.ShoppingCardService.setCard(card)
  }
}