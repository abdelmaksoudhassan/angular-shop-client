import { Component, OnInit } from '@angular/core';
import { ShoppingCardService } from 'src/app/services/shopping-card.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  order=[]
  items = 0
  constructor(private ShoppingCardService:ShoppingCardService) {
    this.order = this.ShoppingCardService.myCard
    this.items = this.ShoppingCardService.items
  }

  ngOnInit(): void {
  }

  get total(){
    let c = 0
    this.order.forEach(item =>{
      c += item.product.price*item.count
    })
    return c
  }

}
