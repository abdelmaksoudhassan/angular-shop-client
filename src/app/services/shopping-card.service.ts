import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {
  myCard=[]

  constructor(private http:HttpClient) { }

  setCard(card){
    this.myCard = card
  }

  get items(){
    let x = 0
    this.myCard.forEach(item=>{
      x += item.count
    })
    return x
  }

  addToCard(product){
    this.myCard.push({product:product,count:1})
    localStorage.setItem('card',JSON.stringify(this.myCard))
  }

  decreaseCount(product,counter){
    this.myCard.forEach(x=>{
      if(x.product.title == product.title){
        if(counter>0){
          x.count-=1
        }else{
          this.myCard.splice(this.myCard.indexOf(x),1)
        }
      }
    })
    localStorage.setItem('card',JSON.stringify(this.myCard))
  }

  increaseCount(product){
    this.myCard.forEach(x=>{
      if(x.product.title == product.title){
          x.count+=1
      }
    })
    localStorage.setItem('card',JSON.stringify(this.myCard))
  }
}
