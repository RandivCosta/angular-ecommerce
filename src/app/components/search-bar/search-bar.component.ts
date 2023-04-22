import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchResult : undefined | product[];

  constructor(private ps : ProductsService, private router : Router){}

  searchProduct(query : KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.ps.searchProduct(element.value).subscribe((result)=>{
        if(result.length > 5){
          result.length = 5
        }
        this.searchResult = result;
      });
    }
  }
  hideSearch(){
    this.searchResult = undefined;
  }
  submitSearch(val:string){
    this.router.navigate([`search/${val}`]);
  }
  /*this is the code without material library
  (blur)="hideSearch()"
  <ul class="suggested-search" *ngIf="searchResult">
    <li *ngFor="let item of searchResult">
      <a>{{item.name}}</a>
    </li>
  </ul>*/
}
