export class User {

     public id: number;
     public firstName: string;
     public lastName: string;
     public age: number;

     constructor(id: number, firstname: string, lastName: string, age: number) {
          this.id = id;
          this.firstName = firstname;
          this.lastName = lastName;
          this.age = age;
     }
}
