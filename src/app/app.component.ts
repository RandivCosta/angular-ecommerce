import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerAuthComponent } from './components/customer-auth/customer-auth.component';
import { CustomerService } from './services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faFacebook, faTwitter, faDribbble, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: any;

  faFacebook = faFacebook
  faTwitter = faTwitter
  faDribbble = faDribbble
  faYoutube = faYoutube

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private customerService: CustomerService, private snackBar: MatSnackBar, private router: Router, private ps: ProductsService) { }

  public isSearchClicked!: boolean;
  Mobile: boolean = false;
  userType: string = 'unauthorized';
  userViewMode: string = 'buying';
  public userName: string = '';
  cartBadgeNum:number = 0;
  ngOnInit(): void {
    this.breakpointObserver.observe('(max-width: 510px)').subscribe((result) => {
      this.Mobile = result.matches;
    });
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        this.authorization(val.url)

      }
    })
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartBadgeNum = JSON.parse(cartData).length;
    }
    this.ps.cartData.subscribe((items) => {
      this.cartBadgeNum = items.length;
    })
  }
  searchClicked() {
    this.isSearchClicked = true;
  }
  searchBarClose() {
    this.isSearchClicked = false;
  }
  openSignUpDialog() {
    this.customerService.selectedTabIndex = 0;
    const dialogRef = this.dialog.open(CustomerAuthComponent, { hasBackdrop: true });
  }
  openLoginDialog() {
    this.customerService.selectedTabIndex = 1;
    const dialogRef = this.dialog.open(CustomerAuthComponent, { hasBackdrop: true });
  }
  onLogout() {
    this.customerService.userLogout();
  }
  authorization(route: string) {
    if (route == '/cart' || route == '/favorite') {
      this.userViewMode = 'justView';
    } else {
      this.userViewMode = 'buying';
    }
    if (localStorage.getItem('customer')) {
      this.userType = 'authorized';
      console.warn('authorized user mode')
      this.user();
    } else {
      this.userType = 'unauthorized';
      console.warn('unauthorized user mode')
    }
  }
  user() {
    const customerString = localStorage.getItem('customer');
    if (customerString !== null) {
      const customer = JSON.parse(customerString);
      const userName = customer.username;
      if (userName) {
        console.log(`Hello, ${userName}!`);
        this.userName = userName;
      } else {
        console.log('Username not found in local storage');
      }
    }
  }








}
