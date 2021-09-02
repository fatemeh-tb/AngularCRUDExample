import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from './jalaliDate/material.persian-date.adapter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MomentJalaali } from './jalaliDate/jalaliMoment-pipe.pipe';


import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EmployeeComponent } from './Employee/employee.component'
import { AddEmpComponent } from './Employee/add-emp/add-emp.component';
import { EditEmpComponent } from './Employee/edit-emp/edit-emp.component';
import { ShowEmpComponent } from './Employee/show-emp/show-emp.component';


import { HeaderComponent } from './Header/header.component';
import { MainContentComponent } from './main/mainContent/mainContent.component';
import { NotFoundComponent } from './main/notFound/notFound.component';
import { LoginComponent } from './Authentication/Login/login.component';
import { RegisterComponent } from './Authentication/Register/register.component';
import { ForgetPassComponent } from './Authentication/forget-pass/forget-pass.component';
import { LoadingSpinnerComponent } from './shared/loaing-spinner/loading-spinner.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProfileComponent } from './main/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AddEmpComponent,
    EditEmpComponent,
    ShowEmpComponent,
    HeaderComponent,
    MainContentComponent,
    NotFoundComponent,
    MomentJalaali,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ForgetPassComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [ MomentJalaali,
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }],
  bootstrap: [AppComponent],
})
export class AppModule { }
