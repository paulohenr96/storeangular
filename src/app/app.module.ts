import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SalesComponent } from './components/sales/sales.component';
import { SalesformComponent } from './components/salesform/salesform.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { SidebarComponent } from './components/parts/sidebar/sidebar.component';
import { TopbarComponent } from './components/parts/topbar/topbar.component';
import { FooterComponent } from './components/parts/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BarChartComponent } from './components/chart/bar-chart/bar-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurveFactory } from 'd3-shape';
import { ScaleLinear } from 'd3-scale';
import { BaseType } from 'd3-selection';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NewProductComponent,
    SalesComponent,
    SalesformComponent,
    HomeComponent,
    LoginComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    BarChartComponent,
  ],
  imports: [
    NgxChartsModule,
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: { dateInput: 'DD/MM/YYYY' },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MM YYYY',
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
