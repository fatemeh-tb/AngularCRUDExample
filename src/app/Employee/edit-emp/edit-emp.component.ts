import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/Domains/employee.model';
import { EmployeeService } from 'src/app/Services/employee.service';


@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(public dialogbox: MatDialogRef<EditEmpComponent>,
    public employeeService: EmployeeService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  fileAttr = 'انتخاب تصویر:';
  upload(files: any) {
    this.employeeService.uploadFile(files).subscribe(res => {
      console.log(res)
    })
  }

  onClose() {
    this.dialogbox.close();
  }

  onSubmit(formGroup) {
    const data: Employee = formGroup.value;
    this.employeeService.updateEmployee(data).subscribe(res => {
      this.snackBar.open('', ' ! تغییرات با موفقیت اعمال شد', {
        duration: 5000,
        verticalPosition: 'top'
      })
      this.dialogbox.close();
    })
  }

}
