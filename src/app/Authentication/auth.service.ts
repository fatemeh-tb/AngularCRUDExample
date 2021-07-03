import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) { }

    signUp(name: string, email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyvI1RUJC-U_mvL66fFICZ1ZLBoBF6Urg',
            {
                name: name,
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
            .pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }


    signIn(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyvI1RUJC-U_mvL66fFICZ1ZLBoBF6Urg',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
            .pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            }));
    }

    logOut() {
        this.user.next(null);
        this.router.navigate(['/login']);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "خطایی رخ داده است!";
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = ' ایمیل وارد شده قبلا ثبت شده است!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'ایمیل و رمز عبور وارد شده صحیح نیست!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'ایمیل و رمز عبور وارد شده صحیح نیست !';
                break;
        }
        return throwError(errorMessage);
    }

}
