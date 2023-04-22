import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signup } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  public selectedTabIndex :number = 0;

  constructor( private http : HttpClient, private router : Router , private snackbar: MatSnackBar) { }

  //following is the sign up with json server

  userSignup(data : signup){
    return this.http.post("https://json-server-kdq2.onrender.com/customer" , data , {observe : 'response'}).subscribe((result)=>{
      console.log(result.body);
      if(result){
        this.isUserLoggedIn.next(true);
        localStorage.setItem('customer',JSON.stringify(result.body));
        this.snackbar.open('You have successfully signed in','', {duration: 3 * 1000,});
        this.router.navigate(['']);
      }
    });
  }



  userLogin(data: login){
    return this.http.get(`https://json-server-kdq2.onrender.com/customer?email=${data.email}&password=${data.password}`, {observe : 'response'}).subscribe((result:any)=>{
      console.log(result.body);
      if(result && result.body && result.body.length===1){
        this.isUserLoggedIn.next(true);
        localStorage.setItem('customer',JSON.stringify(result.body[0]));
        this.snackbar.open('You have successfully logged in','', {duration: 3 * 1000,});
        this.router.navigate(['']);
      }else{
        console.warn('login failed');
        this.snackbar.open('Loggin failed','undo', {duration: 4 * 1000,});
      }
    })
  }
  userLogout(){
    localStorage.removeItem('customer');
    this.isUserLoggedIn.next(false);
    this.router.navigate(['']);
    this.snackbar.open('You are logged out','', {duration: 3 * 1000,});
  }
  reloadCustomer() {
    if(localStorage.getItem('customer')){
      this.isUserLoggedIn.next(true);
    }
  }
}
