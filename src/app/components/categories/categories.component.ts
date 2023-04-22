import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  constructor(private router: Router){}
  routeActivehome = true;
  routeActiveelEctronics = false;
  routeActiveClothing = false;

  ngOnInit():void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        this.activeLink(val.url);
      }
    })
  }

  activeLink(route: string) {
    if(route === '/') {
      this.routeActivehome = true;
    } else{
      this.routeActivehome = false;
    };

    if(route === '/electronics') {
      this.routeActiveelEctronics = true;
    } else{
      this.routeActiveelEctronics = false;
    };

    if(route === '/clothing') {
      this.routeActiveClothing = true;
    } else{
      this.routeActiveClothing = false;
    };
  }
}
