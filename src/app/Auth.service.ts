import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }
flag:boolean=false;
url:string='';
isLoggedIn():boolean 
{
  return this.flag;
}

navigate(url:string):void
{
  this.url = url;
}


}
