import { UserForgetComponent } from './user-forget/user-forget.component';


import { UserOneItemComponent } from './user-one-item/user-one-item.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { UserLoginComponent } from './user-login/user-login.component';

import { UserCartComponent } from './user-cart/user-cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule} from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { CheckOutComponent } from './check-out/check-out.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    UserComponent,
    UserCartComponent,
    UserLoginComponent,
    UserOrderComponent,
    UserProfileComponent,
    UserRegisterComponent,
    UserHomeComponent,
    UserOneItemComponent,
    CheckOutComponent,
    UserForgetComponent
  ],
  
  exports: [UserComponent]
})
export class UserModule { }
