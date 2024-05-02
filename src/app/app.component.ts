import { DataService } from 'src/app/Data.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './loadingService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'new-frontend';
  constructor(private http:HttpClient,private router:Router,private dataService:DataService,public loadingService:LoadingService) 
  {
  }
  ngOnInit(): void 
  {
   this.dataService.productsFlag=true; 
  }
  


}
