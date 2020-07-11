import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  getCats(){
    return this.http.get('https://angular-shop-6b594.firebaseio.com/categories.json').pipe(map(res=>{
      const arr=[]
      for(const key in res){
        const category = res[key]
        category.id = key
        arr.push(category)
      }
      return arr
    }))
  }
}
