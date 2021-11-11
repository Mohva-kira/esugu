import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MembersComponent } from './members/members.component';
import { AuthService } from './auth.service';
import { Role } from './models/role';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'sign-in', component: LoginComponent},
  { path: 'products/:categories/:genre', component: ListProductComponent, pathMatch: 'full'},
  { path: 'products', component: ListProductComponent, pathMatch: 'full'},
  { path: 'register', component: RegisterComponent},
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: DetailProductComponent },
  {
    path: 'admin',
    /*canLoad: [AuthGuard],
    canActivate: [AuthGuard],*/
    data: {
      roles: [
        Role.Admin,
      ]
    },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  // { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  // { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService]
})
export class AppRoutingModule { }
