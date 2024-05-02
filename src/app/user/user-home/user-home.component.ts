import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth.service';
import { DataService } from 'src/app/Data.service';
import { Product } from 'src/app/Product';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(public router:Router,public dataService:DataService,private authService:AuthService) { }

  ngOnInit() 
  {
    this.getRandomProducts();
    this.getCategories();  
  }

  getRandomProducts()
  {
    if(this.dataService.productsFlag || this.dataService.products.length>0)
    {
      this.dataService.http.get(this.dataService.baseUrl+"user/getProducts").subscribe(
        (response:Product[]) => 
        {
          this.dataService.products = response;
          this.calculateDiscountPrice();  
          console.log(this.dataService.products);
          this.dataService.productsFlag = false;
        }
      );
    }
    else
    {
      this.calculateDiscountPrice();
    }  
  }

  calculateDiscountPrice()
  {
    for(let product of this.dataService.products)
          {
            product.discountPrice=product.price-(product.price*(product.discount/100));

            this.dataService.http.get(this.dataService.baseUrl+"user/getStarOfProduct/"+product.id).subscribe(
              (response:number) =>
              {
                product.star=response;
                product.AvgStar=this.getStar(product.star);
              }
            );

          }
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

  categories:string[] = [];
  categoryNext:string;
  categoryPre:string;
  getCategories()
  {
    this.dataService.http.get(this.dataService.baseUrl+"user/getProductCategories").subscribe(
      (response:string[]) =>
      {
        this.categories=response;
      }
    );
  }


  brands:string[] = [];
  brand:string;
  getBrands()
  {
    this.dataService.http.get(this.dataService.baseUrl+"user/getProductBrands/"+this.categoryNext).subscribe(
      (response:string[]) =>
      {
        this.brands=response;
      }
    );
  }

  getBy()
  {
    if(this.categoryPre==null)
    {
      this.categoryPre=this.categoryNext;
    }
    else if(this.categoryPre!=this.categoryNext)
    {
      this.brand=null;
      this.mode=null;
      this.categoryPre=this.categoryNext;
    }
    if(this.brand==null)
    {
      this.dataService.http.get(this.dataService.baseUrl+"user/getProductsBy/"+this.categoryNext+"/all").subscribe(
        (response:Product[]) => 
        {
          this.dataService.products = response;
          for(let product of this.dataService.products)
          {
            product.discountPrice=product.price-(product.price*(product.discount/100));

            this.dataService.http.get(this.dataService.baseUrl+"user/getStarOfProduct/"+product.id).subscribe(
              (response:number) =>
              {
                product.star=response;
                product.AvgStar=this.getStar(product.star);
              }
            );

          }
          this.getBrands();
          console.log(response);
        }
      );
    }
    else
    {
      this.dataService.http.get(this.dataService.baseUrl+"user/getProductsBy/"+this.categoryNext+"/"+this.brand).subscribe(
        (response:Product[]) => 
        {
          this.dataService.products = response;
          for(let product of this.dataService.products)
          {
            product.discountPrice=product.price-(product.price*(product.discount/100));

            this.dataService.http.get(this.dataService.baseUrl+"user/getStarOfProduct/"+product.id).subscribe(
              (response:number) =>
              {
                product.star=response;
                product.AvgStar=this.getStar(product.star);
              }
            );

          }
        }
      );
    }
  }


  mode:string;
  sortMode:string[]=['High to Low', 'Low to High', 'By Popularity'];
  sort()
  {
    
    switch (this.mode) 
    {
      case 'High to Low':
        {
          this.dataService.products.sort((a,b)=> (a.discountPrice<b.discountPrice) ? 1 : -1);
        }
        break;
      
      case 'Low to High':
        {
          this.dataService.products.sort((a,b)=> (a.discountPrice>b.discountPrice) ? 1 : -1);
        }
        break;

      case 'By Popularity':
        {
          this.dataService.products.sort((a,b)=> (a.popularity<b.popularity) ? 1 : -1);
        }
        break;
      default:
        break;
    }
  }

  navigateToOneItem(product:Product)
  {
    this.dataService.oneProduct=product;
    this.router.navigate(["item"]);
  }



}
