import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  show = true
  sideClass = 'show'

  categories$
  @Input('category') category;
  
  constructor(private CategoryService:CategoryService) { 
    this.categories$ = this.CategoryService.getCats()
   }

  ngOnInit(): void {
  }
  toggle(){
    this.show =! this.show
    this.show ? this.sideClass='show' : this.sideClass='hide'
  }

}
