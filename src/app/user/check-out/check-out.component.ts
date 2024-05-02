import { CartProduct } from './../user-cart/CartProduct';
import { DataService } from './../../Data.service';
import { Product } from 'src/app/Product';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserForCheckout } from '../UserForCheckout';
import { Router } from '@angular/router';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit 
{
  @Output() checked = new EventEmitter<boolean>();

  @Input() product:Product;
  @Input() mode:string;
  
  user:UserForCheckout;

  fullNameSwitch:boolean = false;
  phoneSwitch:boolean = false;
  pincodeSwitch:boolean = false;
  addressSwitch:boolean = false;

  flag:boolean=false;
  constructor(public dataService:DataService,private router:Router) 
  {
    
  }


  ngOnInit(): void 
  {
    this.dataService.http.get(this.dataService.baseUrl+"user/getUser/"+this.dataService.email).subscribe(
      (response:UserForCheckout) =>
      {
        this.user = response;
        if (this.user.pincode!=0) 
        {
          this.getInfo();
        }

        if(this.mode==='buyNow')
        {
          this.product.quantity=1;
        }
      }
    );  
  }

  sendFlagToParent()
  {
    this.checked.emit(this.flag);
  }

  
  country:string;
  state:string;
  district:string;
  getInfo()
  {
    let info:any;
    this.dataService.http.get("https://api.postalpincode.in/pincode/"+this.user.pincode).subscribe(
      (report:any) => 
      {
        if(report.length==0)
        {
          window.alert("Please Enter Valid Indian Pincode");
        }
        else
        {
          info = report[0].PostOffice[0];
          this.country=info.Country;
          this.state=info.State;
          this.district=info.District;
        }
        
      });
  }

  confirmOrder()
  {
    let flag:boolean = true;
    let errorMessage:string ="Please Enter Valid ";
    if(this.user.address===null)
    {
      flag = false;
      errorMessage +="Address ";
    }
    else
    {
      if(!this.user.address.includes(this.district))
      this.user.address+=" , "+this.district;
      else if(!this.user.address.includes(this.state))
      this.user.address+=" , "+this.state;
      else if(!this.user.address.includes(this.country))
      this.user.address+=" , "+this.country;
    }
    if(this.user.mobileNumber===null)
    {
      flag = false;
      errorMessage +="Mobile Number ";
    }
    if(this.user.name===null)
    {
      flag = false;
      errorMessage +="Full Name ";
    }
    if(this.user.pincode===null)
    {
      flag = false;
      errorMessage +="Pincode ";
    }
    errorMessage+="To Procced With Your Order....!"
    if(!flag)
    {
      window.alert(errorMessage);
    }
    else
    {
      switch(this.mode)
      {
        case "buyNow":
          {
            this.dataService.http.post(this.dataService.baseUrl+"user/createOrderForUserOfOneProduct/"+this.dataService.email+"/"+this.product.id,this.user).subscribe(
              (response:number)=>
              {
                if(response==1)
                {
                  window.alert("Order Placed Successfully to check your order please go to Order Section...!");
                  this.router.navigate([""]);
                }
                else if(response==-1)
                {
                  window.alert("Product is Out Of Stock Sorry For incovince...!");
                }
                else
                {
                  window.alert("somthing is wrong");
                }
              }
            );
          }
          break;

        case "cart":
          {
            this.dataService.http.post(this.dataService.baseUrl+"user/createOrderForCart/"+this.dataService.email,this.user).subscribe(
              (response:boolean)=>
              {
                if (response) 
                {
                  window.alert("Order Placed Successfully to check your order please go to Order Section...!");
                  this.router.navigate([""]);  
                }
                else
                {
                  window.alert("Somthing is wrong");
                }
              }
            );
          }
          break;
          
      }
    }
  }
}
