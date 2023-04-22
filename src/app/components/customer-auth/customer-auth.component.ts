import { Component } from '@angular/core';
import { login, signup } from 'src/app/data-type';
import {CustomerService } from 'src/app/services/customer.service'
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-auth',
  templateUrl: './customer-auth.component.html',
  styleUrls: ['./customer-auth.component.css']
})
export class CustomerAuthComponent {
  constructor( 
    private customer : CustomerService,
    public dialogRef: MatDialogRef<CustomerAuthComponent>,
    private router:Router){}

  ngOnInit() {
    console.log('customer-auth component initiated');

  }
  ngOnDestroy():void{
  }

  selectedTabIndex = this.customer.selectedTabIndex;

  onSignup(data : signup) :void{
    this.customer.userSignup(data)
    this.dialogRef.close();
  }
  alreadyHaveAcc(){
    this.selectedTabIndex = 1;
  }
  onLogin(data : login) :void{
    this.customer.userLogin(data)
    this.dialogRef.close();
  }
  dontHaveAcc(){
    this.selectedTabIndex = 0;
  }

}
