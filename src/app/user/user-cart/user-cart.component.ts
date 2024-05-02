import { Product } from 'src/app/Product';
import { CartProduct } from './CartProduct';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/Data.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
flagFromCheckout(flag: boolean) 
{
  if(!flag)
    {
      this.mode='cart';
      
    }
}

  constructor(private route: ActivatedRoute,private router: Router,public dataService:DataService) { }


  cart:CartProduct[]=[];
  mode:string = 'cart';
  total:number=0;
  ngOnInit() 
  {
    this.dataService.preUrl=this.router.url; 
    this.dataService.http.get(this.dataService.baseUrl+"user/getCartProductOfUser/"+this.dataService.email).subscribe(
      (response: any) => 
      {
        this.cart = response;
        for(let product of this.cart)
        {
          product.product.discountPrice=product.product.price-((product.product.discount/100)*product.product.price)
          product.price=parseFloat(product.price.toFixed(2));
        }
        this.calculateTotal();
      }
    );
  }

  calculateTotal() 
  {
    this.total=0;
    for(let product of this.cart)
        {
          this.total+=product.product.discountPrice*product.quantity;
        }
        this.total=parseFloat(this.total.toFixed(2));
  }

  addQuantityOfProduct(id: number)
  {
    this.dataService.http.get(this.dataService.baseUrl+"user/addProductToCart/"+this.dataService.email+"/"+id).subscribe(
      (response: number) =>
      {
        
        if (response == 1) 
        {
            for(let product of this.cart)
            {
              if(product.product.id === id)
              {
                product.quantity = product.quantity+1;
                product.price = product.product.discountPrice*product.quantity;
                product.price=parseFloat(product.price.toFixed(2));
              }
            }
              this.calculateTotal();
        }
        else if(response == -1)
        {
          window.alert("Product is out of stock now Sorry for Inconvince");
        }
        else
        {
          window.alert("Somthing is wrong");
        }
      }
    );
  } 


  removeProductFromCart(id: number)
  {
    this.dataService.http.get(this.dataService.baseUrl+"user/removeProductFromCart/"+this.dataService.email+"/"+id).subscribe(
      (response: boolean) =>
      {
        if (response) 
        {
            for(let i=0 ;i<this.cart.length;i++)
            {
              if(this.cart[i].product.id === id)
              {
                
                  this.cart[i].quantity = this.cart[i].quantity-1;
                  this.cart[i].price = this.cart[i].product.discountPrice*this.cart[i].quantity;
                  this.cart[i].price=parseFloat(this.cart[i].price.toFixed(2));
                  if(this.cart[i].quantity==0)
                  {
                    this.cart.splice(i, 1);
                  }
                    
                  
                    this.calculateTotal();
                 
              }
            }
            if(this.cart.length==0)
            {
              this.total=0;
            }
            
              
        }
        else
        {
          window.alert("Somthing is wrong");
        }
        
      }
    );
  } 
  

}
