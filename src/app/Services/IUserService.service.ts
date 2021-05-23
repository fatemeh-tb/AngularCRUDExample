import { Observable } from "rxjs";
import { User } from "../Domains/user.component";

export interface IUserService {
    GetUsers(): Observable<any>;
    PostUsers(user: User): Observable<User>
}
