import { Component, OnInit } from '@angular/core';
import { ShoppingCardService } from '../services/shopping-card.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(private ShoppingCardService:ShoppingCardService,private AuthService:AuthService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.AuthService.logOut()
  }

  get items(){
    return this.ShoppingCardService.items
  }

  get logged(){
    let user = null
    this.AuthService.user.subscribe(x=>user=x)
    return user
  }

  get name(){
    return (<string>this.logged.email).substr(0,(<string>this.logged.email).indexOf('@'))
  }

}
