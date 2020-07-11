import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCardComponent } from '../shopping-card/shopping-card.component';
import { HttpClient } from '@angular/common/http';
import { ShoppingCardService } from '../services/shopping-card.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  errorMsg:string = null
  loading = false
  userForm:FormGroup
  constructor(private router:Router,
    private ShoppingCardService:ShoppingCardService,
    private http:HttpClient) { 
    this.userForm = new FormGroup({
      name : new FormControl('',[Validators.required,Validators.pattern(/^[a-z][a-z\s]*$/)]),
      address: new FormControl('',[Validators.required,Validators.minLength(10)]),
      city : new FormControl('',[Validators.required,Validators.pattern(/^[A-Z]+$/i),Validators.minLength(4)])
    })
  }

  ngOnInit(): void {
  }

  goBack(){
    this.userForm.reset()
    this.router.navigate(['shopping-card'])
  }

  onSubmit(){
    this.loading = true
    this.http.post('https://angular-shop-6b594.firebaseio.com/orders.json',{
      order:this.ShoppingCardService.myCard,
      userData:this.userForm.value
    }).subscribe(res=>{
      this.userForm.reset()
      this.loading = false
      alert('Order Sent Successfully.')
      this.router.navigate([''])
    },err=>{
      this.loading = false
      this.errorMsg = 'Connection Error'
    })
  }

  get name(){
    return this.userForm.get('name')
  }
  get address(){
    return this.userForm.get('address')
  }
  get city(){
    return this.userForm.get('city')
  }

}
