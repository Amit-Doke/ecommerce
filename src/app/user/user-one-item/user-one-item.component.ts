import { Product } from 'src/app/Product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/Data.service';
import { Review } from 'src/app/Review';

@Component({
  selector: 'app-user-one-item',
  templateUrl: './user-one-item.component.html',
  styleUrls: ['./user-one-item.component.css']
})
export class UserOneItemComponent implements OnInit {

  product: Product;
  reviews: Review[]=[];
  mode:string='one';
  constructor(private route: ActivatedRoute,private router: Router,public dataService:DataService) 
  { }

  ngOnInit() 
  {
    this.dataService.preUrl=this.router.url;  
    if(this.dataService.oneProduct==null)
      {
        this.router.navigate([''])
      }
        this.product=this.dataService.oneProduct;
        this.getReviewOfProduct();
      
      
      
      
  }

  getReviewOfProduct()
  {
    this.dataService.http.get(this.dataService.baseUrl+"user/getReviewOfProduct/"+this.product.id).subscribe(
      (response:Review[]) =>
      {
          this.reviews = response;
          for(let review of this.reviews)
          {
            review.stars=this.getStar(review.star);
          }
      });
  }

  getStar(star:number):number[]
  {
    const arr=new Array(5);
    for(let i=0;i<arr.length;i++)
    {
      if(star>=1)
      arr[i]=1;
      else if(star<=0)
      arr[i]=0;
      else
      arr[i]=-1;
      star--;
    }
    return arr;
  }


  addToCart()
  {
    if (this.dataService.isLoggedIn==1) 
    {
      this.product.productFlag=true;
      this.dataService.http.get(this.dataService.baseUrl+"user/addProductToCart/"+this.dataService.email+"/"+this.product.id).subscribe(
        (response:number) =>
        {
          if (response==1) 
          {
            window.alert("Product Successfully Added To Cart!");  
            
          }
          else if(response==-1)
          {
            window.alert("Product Has no Stock Left , Sorry For incoveince");
          }
          else
          {
            window.alert("Somthing is wrong please try again");
            this.product.productFlag=false;
          }
        }
      );
    }
    else
    {
      window.alert("To add a product to your cart please login");
    }
    
  }

  
  buyNow()
  {
    if (this.dataService.isLoggedIn==1) 
    {
      this.mode='checkout';
    }
    else
    {
      window.alert("To buy a product  please login");
    }
  }

  flagFromCheckout(flag:boolean)
  {
    if(!flag)
    {
      this.mode='one';
      
    }
  }
}
