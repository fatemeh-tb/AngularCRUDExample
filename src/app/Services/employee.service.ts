import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../Domains/employee.model'

@Injectable()

export class EmployeeService {

    formData: Employee;
    baseUrl = 'http://localhost:5000/'

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    public getEmpList(): Observable<any> {
        return this.http.get(this.baseUrl + 'all')
    }

    addEmployee(user: Employee): Observable<Employee> {
        return this.http.post<Employee>(this.baseUrl + 'Employee', user, this.httpOptions);
    }

    deleteEmployee(id: number) {
        return this.http.delete(this.baseUrl + 'delete' + '/' + id);
    }

    updateEmployee(Data: object) {
        return this.http.put(this.baseUrl + 'Employee', Data)
    }

}
