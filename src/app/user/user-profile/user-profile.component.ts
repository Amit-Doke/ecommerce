import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Data.service';
import { UserForCheckout } from '../UserForCheckout';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  fullNameSwitch:boolean = false;
  phoneSwitch:boolean = false;
  pincodeSwitch:boolean = false;
  addressSwitch:boolean = false;

  user:UserForCheckout;
  
  constructor(public dataService:DataService,private router:Router) { }

  ngOnInit() 
  {
    this.dataService.http.get(this.dataService.baseUrl+"user/getUser/"+this.dataService.email).subscribe(
      (response:UserForCheckout) =>
      {
        this.user = response;
        if (this.user.pincode!=0) 
        {
          this.getInfo();
        }
      }
    );  
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

  confirmChanges()
  {
    if(this.user.address!==null)
    {
      if(!this.user.address.includes(this.district))
      this.user.address+=" , "+this.district;
      else if(!this.user.address.includes(this.state))
      this.user.address+=" , "+this.state;
      else if(!this.user.address.includes(this.country))
      this.user.address+=" , "+this.country;
    }
    this.dataService.http.post("user/updateUser", this.user).subscribe(
      (response:boolean) =>
      {
        if (response) 
        {
          window.alert("User Information Successfully Updated");
          this.router.navigate([""]);      
        }
      }
    );
  }

}
