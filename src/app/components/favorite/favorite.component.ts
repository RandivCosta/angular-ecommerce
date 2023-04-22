import { Component } from '@angular/core';
import { product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {

  favProducts: undefined | product[];

  constructor(private ps: ProductsService){}

  ngOnInit(): void{
    this.getFavProducts();
  }

  getFavProducts(){
    let localFav = localStorage.getItem('localFav');
    if(localFav){
      let favData = JSON.parse(localFav);
      if (favData.length) {
        this.favProducts = favData;
      }else {
        this.favProducts = undefined;
      }
    }
  }

  removeToFav(productId:number){
    this.ps.removeItemFromFav(productId);
    this.getFavProducts()
  }

}
