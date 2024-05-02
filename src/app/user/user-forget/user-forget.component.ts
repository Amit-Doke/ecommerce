import { DataService } from 'src/app/Data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-forget',
  templateUrl: './user-forget.component.html',
  styleUrls: ['./user-forget.component.css']
})
export class UserForgetComponent implements OnInit {

  constructor(private router:Router,public dataService:DataService) 
  { }

  ngOnInit() 
  {

  }

  logIn()
  {
    this.router.navigate(["login"]);
  }
  signUp()
  {
    this.router.navigate(["register"]);
  }

  flag:boolean = true;
  email:string = "";
  passError:string = "";
  otpError:string ="";
  emailError:string = "";
  cntU:number = 0;
  generateOtp() 
  {
    if(this.email.endsWith("@gmail.com"))
    {
      this.dataService.http.get(this.dataService.baseUrl+"user/generateOtp/"+this.email).subscribe(
        (response: boolean) => 
        {
          if(response)
          {
            console.log(response);
            window.alert("OTP Send Successfully please check inbox or Spam folder");
            this.flag=true;
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

  changePassword(otp:string,pass:string,cpass:string)
  {
    let headers=new HttpHeaders({
      "otp":otp,
      "password":pass,
    });
    if(pass===cpass)
    {
      this.dataService.http.post(this.dataService.baseUrl+"user/changePassword/"+this.email,{},{headers:headers}).subscribe(
        (response:number) =>
        {
          if(response==1)
          {
            window.alert("Password Changed Successfully!");
            this.router.navigate(["login"]);
          }
          else if(response==-2)
          {
            this.otpError="5 min time Out please Generate Otp again";
            this.flag=false;
          }
          else if(response==-4)
          {
            this.emailError="User not found please enter correct email";
            this.cntU++;
          }
          else
          {
  
          }
        }
      );
    }
    else
    {
      this.passError="Password Doesn't Match Please Try again";
    }
    
  }

}
