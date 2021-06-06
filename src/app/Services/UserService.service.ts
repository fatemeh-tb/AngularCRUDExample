import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Domains/user.component'


@Injectable()
export class UserService {

    baseUrl = 'http://localhost:5000/'


    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    GetUsers(): Observable<any> {
        return this.http.get(this.baseUrl + 'all');
    }

    PostUsers(user: User): Observable<User> {
        return this.http.post<User>(this.baseUrl + 'Employee', user, this.httpOptions);
    }

    DeleteUsers(id): Observable<any> {
        return this.http.delete(this.baseUrl + 'delete' + '/' + id)
    }

    UpdateUsers() {

    }


}
