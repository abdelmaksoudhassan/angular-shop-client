import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getAll(){
    return this.http.get('https://angular-shop-6b594.firebaseio.com/products.json').pipe(map(res=>{
      const arr=[]
      for(const key in res){
        const product = res[key]
        product.id = key
        arr.push(product)
      }
      return arr
    }))
  }
}
