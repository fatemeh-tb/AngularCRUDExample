import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/Domains/employee.model';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})

export class AddEmpComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<AddEmpComponent>,
    public employeeService: EmployeeService,
    private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    this.employeeService.formData = {
      id: null,
      firstName: '',
      lastName: '',
      birthTime: null,
      image: null
    }
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

    this.employeeService.addEmployee(data).subscribe(res => {
      this.snackBar.open('', '! با موفقیت اضافه شد', {
        duration: 5000,
        verticalPosition: 'top'
      })
      this.dialogbox.close();
    })
  }

}
