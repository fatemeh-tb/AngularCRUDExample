import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { User } from '../Domains/user.component';
import { UserService } from '../Services/UserService.service'

@Component({
  selector: 'app-grid-users',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GetUsersComponent implements OnInit {
  users = [];

  public gridView: any[];

  public formGroup: FormGroup;
  private editedRowIndex: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.gridView = this.users;

    this.getData();
  }


  // Get Data From Server
  getData() {
    this.userService.GetUsers().subscribe(resp => {
      this.User(resp);
    })

  }
  User(result: Object[]) {
    for (let i in result) {

      this.users.push(result[i])
    }
    console.table(this.users);
  }


  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'firstName': new FormControl(dataItem.firstName, Validators.required),
      'lastName': new FormControl(dataItem.lastName, Validators.required),
      'age': new FormControl(dataItem.age, Validators.required),
    });

    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formGroup);
  }


  public addHandler({ sender }) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      'id': new FormControl(0),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'age': new FormControl('',
        Validators.compose([Validators.required,
        Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$')])),
    });
    this.formGroup.removeControl('id');
    sender.addRow(this.formGroup);
  }


  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }


  saveHandler({ sender, rowIndex, formGroup }) {
    const data = formGroup.value;
    const newUser = new User(data.id, data.firstName, data.lastName, data.age);
    this.userService.PostUsers(newUser).subscribe()
    this.closeEditor(sender, rowIndex);
    location.reload();
  }


  public removeHandler({ dataItem }) {
    this.userService.DeleteUsers(dataItem.id).subscribe();
    location.reload();
  }


  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
  }

}
