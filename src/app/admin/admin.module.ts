import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './admin-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { RevenuesComponent } from './revenues/revenues.component';
import {MatTableModule} from '@angular/material/table';
import { SidebarComponent } from './sidebar/sidebar.component';
import {DetailOrderComponent} from './orders/detail-order/detail-order.component';
import { FormComponent } from './product/form/form.component';
import { ListComponent } from './product/list/list.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { CategorieListComponent } from './categorie/categorie-list/categorie-list.component';
import { HeaderComponent } from './header/header.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { CategorieFormComponent } from './categorie/categorie-form/categorie-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { CategoryComponent } from './category/category.component';
import { MatTableFilterModule } from 'mat-table-filter';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    OrdersComponent,
    RevenuesComponent,
    SidebarComponent,
    DetailOrderComponent,
    FormComponent,
    ListComponent,
    CategorieListComponent,
    HeaderComponent,
    UserFormComponent,
    CategorieFormComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatTableFilterModule,
    MatSortModule


  ],

})
export class AdminModule { }
