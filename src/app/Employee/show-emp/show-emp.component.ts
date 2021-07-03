import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../Domains/employee.model';
import { EmployeeService } from '../../Services/employee.service'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {
  isLoading = false;

  displayedColumns: string[] = ['Options', 'birthTime',
    'lastName', 'firstName', 'id',]
  listData: MatTableDataSource<any>;
  expandedElement: any;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(public employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
    this.getData();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.employeeService.getEmpList().subscribe(data => {
      this.isLoading = false;
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    })
  }


  public addHandler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = "full-width-dialog"
    this.dialog.open(AddEmpComponent, dialogConfig).afterClosed().subscribe(
      () => this.getData()
    )
  }


  public editHandler(emp: Employee) {
    this.employeeService.formData = emp;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = "full-width-dialog"
    this.dialog.open(EditEmpComponent, dialogConfig).afterClosed().subscribe(
      () => this.getData()
    )
  }


  public removeHandler(id: number) {
    if (confirm('مطمئنید میخواهید حدف کنید ؟')) {
      this.employeeService.deleteEmployee(id).subscribe(res => {
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
