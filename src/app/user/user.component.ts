import { Product } from './../Product';
import { AuthService } from './../Auth.service';
import { DataService } from './../Data.service';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public router:Router,public dataService:DataService,private authService:AuthService,private renderer:Renderer2,private ele:ElementRef) { }

  //search:string;
  ngOnInit() 
  {
    
  }

  
  navi(mode:string)
  {
    switch(mode) 
    {
      case 'profile':this.router.navigate(["profile"]);
      break;

      case 'home':this.router.navigate([""]);
      break;

      case 'cart':this.router.navigate(["cart"]);
      break;

      case 'order':this.router.navigate(["order"]);
      break;
    }
  }

  logout() 
  {
    this.dataService.isLoggedIn=0;
    this.authService.flag=false;
    this.router.navigate([""]);
    window.alert("Successfully Logged Out");
  }

  search:string;
  searchProduct()
  {
    this.dataService.http.get(this.dataService.baseUrl+"user/productSearch/"+this.search).subscribe(
      (response:Product[]) =>
      {
        if(response.length>0)
        {
          this.dataService.products=response;
          this.calculateDiscountPrice();
          this.router.navigate([""]);
        }
        else
        {
            window.alert("There was no search result");
        }
      }
    );
    this.search=null;
    
  }
  

  calculateDiscountPrice()
  {
    for(let product of this.dataService.products)
          {
            product.discountPrice=product.price-(product.price*(product.discount/100));

            this.dataService.http.get(this.dataService.baseUrl+"user/getStarOfProduct/"+product.id).subscribe(
              (response:number) =>
              {
                product.star=response-1;
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

  darkTheme()
  {
    document.documentElement.style.setProperty('--dl-color-ecommecre-10', '#161616');
    document.documentElement.style.setProperty('--dl-color-ecommecre-30', '#C84B31');
    document.documentElement.style.setProperty('--dl-color-ecommecre-60', '#ECDBBA');
    this.dataService.colorFlag=false;
  }

  ligthTheme()
  {
    document.documentElement.style.setProperty('--dl-color-ecommecre-10', '#54BAB9');
    document.documentElement.style.setProperty('--dl-color-ecommecre-30', '#E9DAC1');
    document.documentElement.style.setProperty('--dl-color-ecommecre-60', '#FBF8F1');
    this.dataService.colorFlag=true;
  }
}
