import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import {DatabaseService} from "./database.service";
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>|null;
  public currentUser: Observable<User>|null;
  public userData: any;
  public token:any;
  constructor(private http: HttpClient,
    private databaseService:DatabaseService,
    private route: ActivatedRoute,
    private router: Router,) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(<string>localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject!.value;
  }

  login(username: string, password: string) {

    return this.http
      .post<any>(`${environment.apiUrl}/auth/authenticate`, {
        username,
        password,
      }).subscribe( (res)=>{
        this.token=res.token;
        let   httpOptions = {
          headers: new HttpHeaders({'Authorization': `Bearer ${res.token}`,'Accept': 'application/json','Content-Type': 'application/json'})
        };
          this.http.get<any>(`${environment.apiUrl}/v1/users/byemail/${username}`,httpOptions).subscribe((res: any) => {
            this.SetUserData(res);
            localStorage.setItem('currentUser', JSON.stringify(this.userData));
            if (res) {
              this.router.navigate(["/component/dashboard"]);
            } else {
              this.router.navigate(["/authentication/signin"]);
            }
          }, err => {
            console.log(err);
          });
        },
        (error)=>{
          console.log(error)
        }
      );

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // @ts-ignore
    this.currentUserSubject!.next(null);
    return of({ success: false });
  }
  SetUserData(user:any) {
    let userData: User = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.email,
      token: this.token,
      role: user.roles,
      id: user.id,
      img: user.photoURL || 'assets/dashboeard/boy-2.png',
      username: undefined,
      phone: undefined,
      matricule: undefined,
      genre: undefined,
      etatCivil: undefined,
      compteIban: undefined,
      departement_id: undefined,
      departement: undefined
    };
    this.userData = userData;
    this.currentUserSubject!.next(this.userData);
    return userData;
  }
}
