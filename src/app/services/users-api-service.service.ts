import { Users } from './../models/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersApiServiceService {

  private ApiUrl = 'https://reqres.in/api/users';  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }
  /** GET users from the server based on pagenumber */
  getUsers(pageNum:number): Observable<Users[]> {
     return this.http.get<Users[]>(this.ApiUrl+`?page=${pageNum}`)
      .pipe(
        tap((data:any) => {
          // console.log('users fetched successfully',data);
          return data
        }),
        catchError((error) => {
          // console.error('Error fetching users:', error);
          return throwError('Something went wrong while fetching users. Please try again later.'); 
        })
      );
      
  }
  /** GET users from the server based on pagenumber */
  getAllUsers(): Observable<Users[]> {
     return this.http.get<Users[]>(this.ApiUrl)
      .pipe(
        tap((data:any) => {
          // console.log('users fetched successfully',data);
          return data
        }),
        catchError((error) => {
          // console.error('Error fetching users:', error);
          return throwError('Something went wrong while fetching users. Please try again later.'); 
        })
      );
      
  }
  /** GET users from the server */
  getUserById(id:number): Observable<Users[]> {
     return this.http.get<Users[]>(this.ApiUrl+`/${id}`)
      .pipe(
        tap((data:any) => {
          console.log('users fetched successfully',data);
          return data
        }),
        catchError((error) => {
          // console.error('Error fetching users:', error);
          return throwError('Something went wrong while fetching users. Please try again later.'); 
        })
      );
      
  }
  searchUsersByFirstName(firstName: string): Observable<Users[]> {
    console.log(firstName,"service");
    
    return this.http.get<Users[]>(`${this.ApiUrl}?first_name=${firstName}`);
  }
}
