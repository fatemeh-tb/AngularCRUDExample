import * as moment from "moment";

export class Employee {
     public id: number;
     public firstName: string;
     public lastName: string;
     public birthTime: moment.Moment;
     public image: File;
}
