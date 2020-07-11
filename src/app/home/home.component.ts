import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:Product[] = []
  category
  filteredProducts:Product[] = []

  constructor(private ProductService:ProductService , private route:ActivatedRoute) { 
    this.ProductService.getAll().subscribe(x=> {
      this.products=x
      this.route.queryParamMap.subscribe(params =>{
        this.category = params.get('category')
        this.filteredProducts = (this.category) ? this.products.filter(p=>p.category==this.category) : this.products
      })
    })
  }

  ngOnInit(): void {
  }
}
