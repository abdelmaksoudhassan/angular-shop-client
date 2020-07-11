import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCardService } from 'src/app/services/shopping-card.service';

@Component({
  selector: 'app-card-btn',
  templateUrl: './card-btn.component.html',
  styleUrls: ['./card-btn.component.css']
})
export class CardBtnComponent implements OnInit {
  @Input('product') product;
  counter:number = 0

  constructor(private ShoppingCardService:ShoppingCardService){ }

  ngOnInit(): void {
    for (let index = 0; index < this.ShoppingCardService.myCard.length; index++) {
      const element = this.ShoppingCardService.myCard[index];
      if(this.product.title == element.product.title){
        this.counter = element.count
        break;
      }
    }
  }

  addToCard(product){
    this.counter+=1
    this.ShoppingCardService.addToCard(product)
  }

  onDecrease(product){
    this.counter-=1
    this.ShoppingCardService.decreaseCount(product,this.counter)
  }

  onIncrease(product){
    this.counter+=1
    this.ShoppingCardService.increaseCount(product)
  }
}
