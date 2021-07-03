import { Component, EventEmitter, Injectable, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable({ providedIn: 'root' })
export class LoginComponent {

  error: string = null;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.authService.signIn(email, password).subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['./employee']);
        this.isLoading = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
