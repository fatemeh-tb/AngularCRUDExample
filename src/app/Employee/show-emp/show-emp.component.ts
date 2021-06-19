import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../Domains/employee.model';
import { EmployeeService } from '../../Services/employee.service'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {
 @ViewChild(MatTable) table: MatTable<any>;

  employees: any[] = [];

  public gridView: Employee[];

  constructor(public employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.gridView = this.employees;
    this.getData();
  }


  getData() {
    this.employeeService.getEmpList().subscribe(resp => {
      this.User(resp);
    })
  }
  User(result: Object[]) {
    for (let i in result) {
      this.employees.push(result[i])
    }
  }


  public addHandler() {
    this.employees.length = 0

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(AddEmpComponent, dialogConfig).afterClosed().subscribe(
      () => this.getData()
    )
  }


  public editHandler(emp: Employee) {
    this.employees.length = 0
    this.employeeService.formData = emp;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(EditEmpComponent, dialogConfig).afterClosed().subscribe(
      () => this.getData()
    )
  }


  public removeHandler({ dataItem }) {
    this.employees.length = 0

    if (confirm('مطمئنید میخواهید حدف کنید ؟')) {
      this.employeeService.deleteEmployee(dataItem.id).subscribe(res => {
        this.getData()
        this.snackBar.open('', '! با موفقیت حذف شد ', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
    }
    else {
      this.getData()
    }
  }

}
