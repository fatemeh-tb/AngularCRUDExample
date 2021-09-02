import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Domains/employee.model'

@Injectable({providedIn: 'root'})
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

  addEmployee(user: Employee) {
    return this.http.post<Employee>(this.baseUrl + 'Employee', user, this.httpOptions);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.baseUrl + 'delete' + '/' + id);
  }

  updateEmployee(Data: object) {
    return this.http.put(this.baseUrl + 'Employee', Data)
  }

  uploadFile(files: any[]): Observable<HttpResponse<Blob>> {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append(file.name, file);
    }

    return this.http.post(`${this.baseUrl}Employee`, formData, {
      observe: "response",
      responseType: "blob"
    });
  }

}
