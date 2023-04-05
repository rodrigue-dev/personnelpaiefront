// @ts-ignore
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public showLoader: boolean = false;
  user: any;
  token: any;

  constructor(private http: HttpClient) {
    // this.user=JSON.parse(localStorage.getItem('user'))
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  };

  createUser(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/users`, data);
  }
  getUserByEmail(email:string) {
    return this.http.get<any>(`${environment.apiUrl}/v1/users/email/${email}`)
  }
  getUsers() {
    return this.http.get<any>(`${environment.apiUrl}/v1/users`)
  }
  getDepartements() {
    return this.http.get<any>(`${environment.apiUrl}/v1/departements`)
  }
  createDepartement(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/departements`, data);
  }
  getAvantages() {
    return this.http.get<any>(`${environment.apiUrl}/v1/avantages`)
  }
  createAvantage(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/avantages`, data);
  }
  getTypeplaning() {
    return this.http.get<any>(`${environment.apiUrl}/v1/typeplanings`)
  }
  createTypeplaning(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/typeplanings`, data);
  }
  getFonction() {
    return this.http.get<any>(`${environment.apiUrl}/v1/fonctions`)
  }
  createFonction(data:any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/v1/fonctions`, data);
  }
}
