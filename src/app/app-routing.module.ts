import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './Employee/employee.component';
import { MainContentComponent } from './main/mainContent/mainContent.component';
import { NotFoundComponent } from './main/notFound/notFound.component';
import { LoginComponent } from './Authentication/Login/login.component';
import { RegisterComponent } from './Authentication/Register/register.component';
import { ForgetPassComponent } from './Authentication/forget-pass/forget-pass.component';
import { ProfileComponent } from './main/profile/profile.component';
import { AuthGuard } from './Authentication/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainContentComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', canActivate:[AuthGuard], component: ProfileComponent },
  { path: 'forgetPass', component: ForgetPassComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
