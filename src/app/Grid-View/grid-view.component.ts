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
  @ViewChild(DataBindingDirective, { static: false }) dataBinding: DataBindingDirective;

  user = [];

  public gridData: any[] = this.user;
  public gridView: any[];
  public mySelection: string[] = [];

  public formGroup: FormGroup;
  private editedRowIndex: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.gridView = this.gridData;

    this.getData();
  }

  //Filtering Rows
  public onFilter(inputValue: string): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'userId',
            operator: (value) => (value + "").indexOf(inputValue) >= 0
          },
          {
            field: 'id',
            operator: (value) => (value + "").indexOf(inputValue) >= 0
          },
          {
            field: 'body',
            operator: (value) => (value + "").indexOf(inputValue) >= 0
          },
          {
            field: 'title',
            operator: (value) => (value + "").indexOf(inputValue) >= 0
          },
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }


  // Get Data From Server
  getData() {
    this.userService.GetUsers().subscribe(resp => {
      this.User(resp);
    })

  }

  User(result: Object[]) {
    for (let i in result) {

      this.user.push(result[i])
    }
    console.table(this.user);
  }


  public addHandler({ sender }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'id': new FormControl(0,
        Validators.compose([Validators.required,
        Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$')])),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'age': new FormControl(0,
        Validators.compose([Validators.required,
        Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$')])),
    });
    sender.addRow(this.formGroup);
  }


  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  // Send Post Request To the Server
  saveHandler({ sender, rowIndex, formGroup }) {
    const data = formGroup.value;
    const newUser = new User(data.id, data.firstName, data.lastName, data.age);
    this.userService.PostUsers(newUser).subscribe(data => {
      console.log('User Created!')
    })
    this.closeEditor(sender, rowIndex);
    location.reload();
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
  }

}
