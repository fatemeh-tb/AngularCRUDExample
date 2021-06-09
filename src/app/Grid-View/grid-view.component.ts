import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../Domains/user.component';
import { UserService } from '../Services/UserService.service'


@Component({
  selector: 'app-grid-users',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})

export class GetUsersComponent implements OnInit {
  users: any[] = [];

  public gridView: User[];
  public formGroup: FormGroup;
  private editedRowIndex: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.gridView = this.users;
    this.getData();
  }

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


  public addHandler({ sender }) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      'id': new FormControl('', Validators.compose([Validators.required,
      Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$')])),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'age': new FormControl('', Validators.compose([Validators.required,
      Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$')])),
    });
    this.formGroup.removeControl('id');
    sender.addRow(this.formGroup);
  }


  saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.users.length = 0
    const data: User = formGroup.value;

    if (isNew) {
      this.userService.PostUsers(data).subscribe(
        () => this.getData()
      )
    }
    else {
      this.userService.UpdateUsers(data).subscribe(
        () => this.getData()
      )
    }
    this.closeEditor(sender, rowIndex);
  }


  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      'id': new FormControl(dataItem.id, Validators.compose([Validators.required,
      Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$')])),
      'firstName': new FormControl(dataItem.firstName, Validators.required),
      'lastName': new FormControl(dataItem.lastName, Validators.required),
      'age': new FormControl(dataItem.age, Validators.compose([Validators.required,
      Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$')])),
    });
    sender.editRow(rowIndex, this.formGroup);
  }


  public removeHandler({ dataItem }) {
    this.users.length = 0
    this.userService.DeleteUsers(dataItem.id).subscribe(
      () => this.getData()
    );
  }


  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }


  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
  }

}
