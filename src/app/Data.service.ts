import { Product } from './Product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService 
{
constructor(public http:HttpClient) { }

public isLoggedIn:number=0;
public baseUrl:string =environment.API_URL;
public flag:boolean = false;
public email:string;
public products:Product[] = [];
public productsFlag:boolean = true;
public oneProduct:Product;
public preUrl:string='';
public colorFlag:boolean = true;
public adminEmail:string;
}
