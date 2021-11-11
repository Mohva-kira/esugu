import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieListComponent } from './categorie/categorie-list/categorie-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DetailOrderComponent} from './orders/detail-order/detail-order.component';
import {OrdersComponent} from './orders/orders.component';
import { ListComponent } from './product/list/list.component';
import { UsersComponent } from './users/users.component';
export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    {path: 'order/:id', component: DetailOrderComponent},
    {path: 'orders', component: OrdersComponent},
    {path:'product-lists', component: ListComponent},
    {path:'category', component: CategorieListComponent},
    {path:'utilisateurs', component: UsersComponent}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

  })
  export class AdminRoutingModule  {}
