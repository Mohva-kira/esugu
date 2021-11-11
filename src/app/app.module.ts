import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from './auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AppfooterComponent } from './appfooter/appfooter.component';
import { ListProductComponent } from './list-product/list-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { InMemoryCache } from '@apollo/client';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { MembersComponent } from './members/members.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatCarouselModule } from '@ngmodule/material-carousel';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData, CommonModule } from '@angular/common';
import { UserDirective } from './manager/user.directive';
import { UserRoleDirective } from './manager/usser-role.driective';
import {MatCardModule} from '@angular/material/card';
import { DetailOrderComponent } from './admin/orders/detail-order/detail-order.component';
import { SidebarlinksComponent } from './sidebarlinks/sidebarlinks.component';

registerLocaleData(localeFr);



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    ListProductComponent,
    DetailProductComponent,
    HomeComponent,
    CartComponent,
    ShoppingCartComponent,
    ProductComponent,
    RegisterComponent,

    MembersComponent,
    UserDirective,
    UserRoleDirective,
    SidebarlinksComponent,
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatStepperModule,
    MatTableModule,
    NgbModule,
    MatMenuModule,
    MatIconModule,
    MatCarouselModule,
    MatCardModule,
    CommonModule,
    MatDialogModule
 


  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://48p1r2roz4.sse.codesandbox.io',
          }),
        };
      },
      deps: [HttpLink],
    },
    AuthService,
    { provide: MatDialogRef, useValue: {} },
  	{ provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: LOCALE_ID, useValue: 'fr-FR'},
     ],
  exports: [
    UserDirective,
    UserRoleDirective
  ],
  bootstrap: [AppComponent],
  entryComponents : [ShoppingCartComponent]
})
export class AppModule { }
