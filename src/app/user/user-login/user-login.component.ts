import { AuthService } from './../../Auth.service';
import { DataService } from './../../Data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  //preUrl:string;
  constructor(private route:ActivatedRoute,public dataService:DataService,private authService:AuthService,private router:Router,private location: PlatformLocation) 
  { 
    
  }
  ngOnInit() 
  {
    console.log(this.dataService.preUrl);
  }
  cntP:number = 0;
  cntU:number = 0;
  messageFlag:number;       //1 - user didn't exit,  2- password incorrect

  login(email:string,password:string)
  {
    //let headers=new HttpHeaders().set('email', email).set('password', password);
    this.dataService.http.get(this.dataService.baseUrl+"user/login/"+email+"/"+password).subscribe(
      (response:number)=>
      {
        if(response === 1)
        {
          this.dataService.isLoggedIn=1;
          this.dataService.email=email;
          this.authService.flag=true;
          window.alert("Log in successfully !");
          this.router.navigate([this.dataService.preUrl]);
        }
        else if(response === -1)
        {
          this.cntU++;
          this.messageFlag=1;
        }
        else if(response === -2)
        {
          this.cntP++;
          this.messageFlag=2;
        }
        else
        {
          window.alert("Somthing is wrong");
        }
      });
  }

  navi(mode:string)
  {
    switch(mode)
    {
      case 'register':this.router.navigate(["register"]);
      break;

      case 'forget':this.router.navigate(["forget"]);
      break;
    }
  }

}
