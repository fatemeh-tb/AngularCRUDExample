import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './Employee/employee.component';
import { MainComponent } from './main/mainContent/main.component';
import { NotFoundComponent } from './main/notFound/notFound.component';
import { LoginComponent } from './Authentication/Login/login.component';
import { RegisterComponent } from './Authentication/Register/register.component';
import { ForgetPassComponent } from './Authentication/forget-pass/forget-pass.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgetPass', component: ForgetPassComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
