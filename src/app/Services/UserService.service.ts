import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Domains/user.component'
import { IUserService } from './IUserService.service'

@Injectable()
export class UserService implements IUserService {

    apiURL = 'http://localhost:5000/Employee';

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    GetUsers(): Observable<any> {
        return this.http.get('http://localhost:5000/all');
    }

    PostUsers(user: User): Observable<User> {
        return this.http.post<User>(this.apiURL, user, this.httpOptions);
    }
}
