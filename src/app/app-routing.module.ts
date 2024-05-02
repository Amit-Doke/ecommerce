import { AdminComponent } from './admin/admin.component';
import { UserOneItemComponent } from './user/user-one-item/user-one-item.component';
import { AuthGuard } from './auth.guard';
import { UserForgetComponent } from './user/user-forget/user-forget.component';
import { UserOrderComponent } from './user/user-order/user-order.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserCartComponent } from './user/user-cart/user-cart.component';

import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path: '', component:UserComponent,children:[{path:'cart',component:UserCartComponent,canActivate:[AuthGuard]},{path: 'profile',component:UserProfileComponent,canActivate:[AuthGuard]},{path:'',component:UserHomeComponent},{path:'order',component:UserOrderComponent,canActivate:[AuthGuard]},{path:'item',component:UserOneItemComponent}]},{path: 'login', component:UserLoginComponent},{path:'register',component:UserRegisterComponent},{path:'forget',component:UserForgetComponent},{path:'admin',component:AdminComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
