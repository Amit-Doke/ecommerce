import { DataService } from './../../Data.service';
import { UserOrder } from './UserOrder';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderReview } from './OrderReview';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {


  

  stars:number[]=[1,1.5,2,2.5,3,3.5,4,4.5,5];
  star:number;
  comment:string;
  orderProducts:UserOrder[]= [];
  constructor(public dataService:DataService,private router:Router) { }

  ngOnInit() 
  {
    this.dataService.http.get(this.dataService.baseUrl+"user/getUserOrder/"+this.dataService.email).subscribe(
      (response:UserOrder[]) => 
      {
        this.orderProducts=response;
        for(let order of this.orderProducts) 
        {
          this.dataService.http.get(this.dataService.baseUrl+"user/getReview/"+this.dataService.email+"/"+order.product.id).subscribe(
            (response:OrderReview) =>
            {
              order.review=response;
            }
          );
          order.created=new Date(order.created.getTime() + (2 * 24 * 60 * 60 * 1000));
        }
      }
    );
  }

  addReview(order:UserOrder)
  {

    let rev:OrderReview=order.review;
    rev.comment=this.comment;
    rev.star=this.star;
    this.dataService.http.post(this.dataService.baseUrl+"user/createReview/"+this.dataService.email+"/"+order.product.id,rev).subscribe(
      (response:boolean) =>
      {
        if(response)
        {
          window.alert("Review Has been added successfully");
          order.flag=false;
        }
        else
        {
          window.alert("Review Has not been Successfully added");
        }
      }
    );
  }

  openReview(order:UserOrder)
  {
    order.flag=!order.flag;
    this.comment=order.review.comment;
  }

  
  



}
