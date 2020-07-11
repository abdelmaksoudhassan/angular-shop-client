import { Component, OnInit } from '@angular/core';
import { ShoppingCardService } from '../services/shopping-card.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {
  card=[]

  constructor(private ShoppingCardService:ShoppingCardService,
    private http:HttpClient,
    private router:Router ) {
    this.card  = this.ShoppingCardService.myCard
   }

  ngOnInit(): void {
  }

  clearCard(){
    this.card = []
    localStorage.removeItem('card')
    this.ShoppingCardService.setCard(this.card)
  }

  checkOut(){
    // this.http.post('https://angular-shop-6b594.firebaseio.com/cards.json',this.card).subscribe(res=>{
    //   console.log(res)
    //   this.clearCard()
    // },err=>{
    //   console.log(err)
    // })
    this.router.navigate(['check-out'])
  }

  get total(){
    let c = 0
    this.card.forEach(item =>{
      c += item.product.price*item.count
    })
    return c
  }
}
