import { AdminAddProduct } from './AdminAddProduct';
import { Product } from './../Product';
import { AdminOrder } from './AdminOrder';
import { AdminDashInfo } from './AdminDashInfo';
import { AdminProduct } from './AdminProduct';

import { Component, OnInit } from '@angular/core';
import { DataService } from '../Data.service';

import { Admin } from './Admin';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  mode1: string = 'login';
  mode2: string = 'dashBoard';
  otpFlag:boolean=false;
  emailError:string="";
  viewOrderFlag:boolean=false;
  viewProductFlag:boolean=false;

  categories: string[] = ["Mobile", "Electronics", "Men Fashion", "Women Fashion", "Kids Fashion", "Home and Kitchen"];
  category: string;

  

  info:AdminDashInfo;

  constructor(public dataService: DataService) { }

  ngOnInit() 
  { 
    
  }

  ot:boolean=false;
  generateOtp(email:string)
  {
    
    
    if(email.endsWith("@gmail.com"))
    {
      this.ot=true;
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
          this.ot=false;
        }
        
      );
    }
    else
    {
      this.emailError="Please Enter Valid Gmail Address Only";
    }
    console.log(this.ot);
    
  }

  otp:number=0;
  password:string;
  cntP:number;
  cntU:number;
  
  login(email:string)
  {
    let form:FormData=new FormData();
    form.append("email", email);
    form.append("password",this.password);
    this.dataService.http.post(this.dataService.baseUrl+"admin/login/"+this.otp,form).subscribe(
      (response:AdminDashInfo) =>
      {
        if(response.status === 1)
        {
          this.dataService.isLoggedIn=2;
          this.dataService.adminEmail=email;
          this.info=response;
          console.log(this.info);
          window.alert("Log in successfully !");
        }
        else if(response.status === -1)
        {
          this.cntU++;
          window.alert("User Incorrect");
          if(this.cntU>3)
          {
            let choice=window.confirm("It seems You Didn't Register As Admin Do you want Register");
            if(choice)
            {
              this.mode1='register';
            }
            this.cntU=0;
          }
        }
        else if(response.status === -2)
        {
          this.cntP++;
          window.alert("Password Incorrect");
          if(this.cntP>3)
          {
            let choice=window.confirm("It seems You Didn't remember Password Do you want Reset Password");
            if(choice)
            {
              this.mode1='forgot';
            }
            this.cntU=0;
          }
        }
        else
        {
          window.alert("Somthing is wrong");
        }
        this.otp=0;
        this.password='';
      }
    );
  }

  logOut()
  {
    this.mode1='login';
    this.dataService.adminEmail=null;
    this.dataService.isLoggedIn=0;
  }

  admin:Admin=new Admin();
  errorMessage:string="All Fields Are Mendetory to successfull login please Enter valid ";
  register()
  {
    let flag:boolean = true;
    if(this.admin.name==null)
    {
      this.errorMessage+="Full Name ";
      flag=false;
    }

    if(this.admin.password==null)
    {
      this.errorMessage+="Password ";
      flag=false;
    }

    if(this.admin.mobileNumber==null||this.admin.mobileNumber.length>11)
    {
      this.errorMessage+="Mobile Number ";
      flag:false;
    }

    if(this.admin.gstNumber==null)
    {
      this.errorMessage+="GST Number ";
      flag:false;
    }

    if(flag)
    {
      this.dataService.http.post(this.dataService.baseUrl+"admin/register/"+this.otp,this.admin).subscribe(
        (response:number) => 
        {
          if (response==1)
          {
            window.alert("Registration successful Please Log in");
            this.mode1='login';
            this.otpFlag=true;
            this.otp=0;
          }
          else if (response==-2)
          {
            window.alert(" 5 min time Out Please Try again");
            this.otpFlag=true;
            this.otp=0;
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
      window.alert(this.errorMessage);
    }

  }

  pass:string;
  cpass:string;
  forgot(email:string)
  {
    let form:FormData=new FormData();
    form.append("email",email);
    form.append("password",this.pass);
    if(this.pass===this.cpass)
    {
      this.dataService.http.post(this.dataService.baseUrl+"admin/forgot/"+this.otp,form).subscribe(
        (response:number) =>
        {
          if(response==1)
          {
            window.alert("Password Changed Successfully!");
            this.mode1='login';
            this.otpFlag=true;
            this.otp=0;   
          }
          else if(response==-2)
          {
            window.alert("5 min time Out please Generate Otp again");
            this.otpFlag=true;
          }
          else if(response==-4)
          {
            window.alert("User not found please enter correct email");
          }
          else
          {
            window.alert("somthing is wrong");
          }
        }
      );
    }
    else
    {
      window.alert("Password Doesn't Match Please Try again");
    }
  }

  


  code:string;
  image:File;
  
  
  

  orders:AdminOrder[]=[];
  viewOrder()
  {
    if (!this.viewOrderFlag) 
    {
      this.dataService.http.get(this.dataService.baseUrl+"admin/orderList/"+this.dataService.adminEmail).subscribe(
        (response:AdminOrder[]) =>
        {
          this.orders=response;
          if (this.orders.length!=0) 
          {
            for(let order of this.orders)
            {
              if(order.status.includes("Yet to be Dispatch"))
              {
                order.deliveryStatues=["Shipped","Delivered","Rejected"];
              }
              else if(order.status.includes("Shipped"))
              {
                order.deliveryStatues=["Delivered","Rejected"];
              }
            }
            this.viewOrderFlag=true;
          }
          else
          {
            window.alert("No Pending Orders");
            this.mode2='dashBoard';
          }
        }
      );  
    }
  }

  rejectReason:string = "";
  changeStatus(order:AdminOrder)
  {
    if (order.status ==="Rejected") 
    {
      order.status+=" due to, "+this.rejectReason;  
    }
    let header:HttpHeaders=new HttpHeaders({'status':order.status,'order':order.id.toString()});
    this.dataService.http.get(this.dataService.baseUrl+"admin/changeStatus",{headers:header}).subscribe(
      (response:boolean)=>
      {
        if (response) 
        {
          window.alert("Successfully Changed Status");
          order.flag=false;  
        }
        else
        {
          window.alert("Cannot Change Status");
        }
      }
    );
  }

  deliveryStatues:string[]=['Yet to be Dispatch','Shipped','Delivered','Rejected'];
  deliveryStatusFilter:string;
  filterOrder()
  {
    
      if(this.deliveryStatusFilter.includes("Yet to be Dispatch"))
        {
          this.orders.sort((a,b)=>(a.status.includes("Yet to be Dispatch"))?-1:(b.status.includes("Yet to Be Dispatch"))?1:0)
        }
      else if(this.deliveryStatusFilter.includes("Shipped"))
        {
          this.orders.sort((a,b)=>(a.status.includes("Shipped"))?-1:(b.status.includes("Shipped"))?1:0)
        }
      else if(this.deliveryStatusFilter.includes("Delivered"))
      {
        this.orders.sort((a,b)=>(a.status.includes("Delivered"))?-1:(b.status.includes("Delivered"))?1:0)
      }
      else if(this.deliveryStatusFilter.includes("Rejected"))
      {
        this.orders.sort((a,b)=>(a.status.includes("Rejected"))?-1:(b.status.includes("Rejected"))?1:0)
      }
      
    
  }


  //Product section
  products:AdminProduct[]=[];

  viewProduct()
  {
    if(!this.viewProductFlag)
    {
      this.dataService.http.get(this.dataService.baseUrl+"admin/getAdminProduct/"+this.dataService.adminEmail).subscribe(
        (response:AdminProduct[])=>
        {
          if(response!==null)
          {
            this.products=response;
            this.viewProductFlag=false;
            if (this.products.length==0) 
            {
              window.alert("No Product In Inventory");
              this.mode2='addProduct';
              this.viewProductFlag=true;
            }
            
          }
          
        }
      );
    }
  }
  updateProduct(product:AdminProduct)
  {
    let upProduct:Product = new Product(
      product.id,
      product.name,
      product.quantity,
      product.price,
      product.discount,
      product.description,
      product.url,
      product.category,
      product.popularity,
      product.brand,
      product.sizeName,
      product.color,
      product.costPrice  
    );

    this.dataService.http.post(this.dataService.baseUrl+"admin/updateProduct",product).subscribe(
      (response:boolean)=>
      {
        if(response)
        {
          window.alert("Product updated successfully");
          product.urlFlag=false;
        }
      }
    );
  }

  uploadFile(event: any,product:AdminProduct) 
  {
    let image: File = event.target.files[0];
    if (image !== null && image.size <= 1000000) {
      if (image.type !== 'image/png') {
        window.alert('Invalid file type. Only PNG images are allowed.');
      }
      else {
        let choice = window.confirm("Do you want to proceed?");
        if (choice) 
        {
          let formData: FormData = new FormData();
          formData.append('image', image);
          this.dataService.http.post(this.dataService.baseUrl + "admin/imageUpload/"+product.id, formData).subscribe(
            (response: boolean) => {
              if(response)
              {
                window.alert("Image Uploaded Successfully...!");
                product.urlFlag=false;
              }
              else
              {
                window.alert("Image Can't Updated successfully...!");
              }
            }
          );
        }
      }
    }
    else {
      window.alert("Please Enter File size of Max 1MB or Less");
    }

  }



  newProduct:AdminAddProduct=new AdminAddProduct();
  imgFile:File;

  imgUpdate(event:any):void 
  {
    this.imgFile=event.target.files[0];
  }
  addNewProduct()
  {
    let flag:boolean=true;
    this.errorMessage="All Fields Are Mendetory to successfull login please Enter valid ";
    console.log(flag+" "+this.newProduct);
    if (this.newProduct.brand===null||this.newProduct.brand===undefined) 
    {
      this.errorMessage+=" Brand";
      flag=false;  
    }

    if (this.newProduct.category===null||this.newProduct.category===undefined) 
    {
      this.errorMessage+=" category";
      flag=false;  
    }

    if (this.newProduct.color===null||this.newProduct.color===undefined) 
    {
      this.errorMessage+=" color code";
      flag=false;  
    }

    if (this.newProduct.costPrice===null||this.newProduct.costPrice===undefined) 
    {
      this.errorMessage+=" cost price";
      flag=false;  
    }

    if (this.newProduct.description===null||this.newProduct.description===undefined) 
    {
      this.errorMessage+=" description";
      flag=false;  
    }

    if (this.newProduct.discount==null||this.newProduct.discount===undefined) 
    {
      this.errorMessage+=" discount";
      flag=false;  
    }

    if (this.newProduct.name==null||this.newProduct.name===undefined) 
    {
      this.errorMessage+=" product name";
      flag=false;  
    }

    if (this.newProduct.price==null||this.newProduct.price===undefined) 
    {
      this.errorMessage+=" price";
      flag=false;  
    }

    if (this.newProduct.quantity==null||this.newProduct.quantity===undefined) 
    {
      this.errorMessage+=" product quantity";
      flag=false;  
    }

    if (this.newProduct.sizeName==null||this.newProduct.sizeName===undefined) 
    {
      this.errorMessage+=" product size name";
      flag=false;  
    }

    if(flag && (this.imgFile!==null || this.imgFile!==undefined))
    {
      if(this.imgFile.size<= 1000000)
      {
        if (this.imgFile.type !== 'image/png') 
        {
          window.alert('Invalid file type. Only PNG images are allowed.');
        }
        else 
        {
          let choice = window.confirm("Do you want to proceed?");
          if (choice) 
          {
            let formData: FormData = new FormData();
            formData.append('image', this.imgFile);
            
            this.dataService.http.post(this.dataService.baseUrl + "admin/addProduct/"+this.dataService.adminEmail, this.newProduct).subscribe(
              (response: number) => {
                if(response!=0)
                {
                  this.dataService.http.post(this.dataService.baseUrl + "admin/imageUpload/"+response,formData).subscribe(
                    (response:boolean)=>
                    {
                      if (response) 
                      {
                        window.alert("Product Added Successfully...!");
                      }
                      else
                      {
                        window.alert("Product Can't Added successfully please try again..!");
                      }
                    }
                  );
                }
                else
                {
                  window.alert("Product Can't Added successfully please try again..!");
                }
                
              }
            );
          }
        }
      }
      else 
      {
        window.alert("Please Enter File size of Max 1MB or Less");
      }
    }
    else
    {
      window.alert(this.errorMessage)
    } 
  }

  resetProduct()
  {
    this.newProduct=new AdminAddProduct();
  }

}
