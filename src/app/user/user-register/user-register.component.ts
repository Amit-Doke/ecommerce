import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth.service';
import { DataService } from 'src/app/Data.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(public dataService:DataService,private router:Router,private location: PlatformLocation) { }
  otp:number;
  otpFlag:boolean=false;
  emailError:string="";

  ngOnInit() {
    
  }

  generateOtp(email:string)
  {
    if(email.endsWith("@gmail.com"))
    {
      this.dataService.http.get(this.dataService.baseUrl+"user/generateOtp/"+email).subscribe(
        (response: boolean) => 
        {
          if(response)
          {
            window.alert("OTP Send Successfully please check inbox or Spam folder");
            this.otpFlag=false;
          }
          else
          {
            this.emailError="Please Try again with valid mail Id";
          }
        }
      );
    }
    else
    {
      this.emailError="Please Enter Valid Gmail Address Only";
    }
    
  }

  phoneError:string="";

  register(email:string,otp:string,phone:string,password:string)
  {
    if(phone.length==10)
    {
      let pNumber=parseInt(phone);
      let otpNumber=parseInt(otp);
      let temp={"email":email, "password":password,"mobileNumber":phone,"role":1};
      
      this.dataService.http.post(this.dataService.baseUrl+"user/register/"+otpNumber,temp).subscribe(
        (response: number) =>
        {
          if (response==1)
          {
            window.alert("Registration successful Please Log in");
            this.router.navigate([""]);
          }
          else if (response==-2)
          {
            window.alert(" 5 min time Out Please Try again");
            this.otpFlag=true;
          }
          else if(response==-4)
          {
            window.alert("User Already Present Please try again with different email");
          }
          else
          {
            window.alert("Somthing is wrong");
          }
        }
      );
    }
    else
    {
      this.phoneError="Please Enter valid 10 Digit Phone number";
    }
  }

  navi()
  {
    this.router.navigate(["login"]);
  }

}
