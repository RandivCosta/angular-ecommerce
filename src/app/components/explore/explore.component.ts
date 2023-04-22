import { Component } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent {
  faHeart = faHeart
  popularProducts: undefined | product[] ;
  productData: undefined | product;

  constructor(private ps: ProductsService){}

  ngOnInit():void {
    this.ps.popularProducts().subscribe((data) => {
      this.popularProducts = data;
    })
  }

  isProductInCart(productId: number): boolean {
    let cartData = localStorage.getItem('localCart');
    if (productId && cartData) {
      let items = JSON.parse(cartData);
      return items.some((item:product) => item.id === productId)
    } else {
      return false;
    }
    
  }

  addToCart(productData:product){
    this.productData = productData;
    if (this.productData) {
      this.productData.quantity = 1;
      if (!localStorage.getItem('customer')){
        this.ps.localAddToCart(this.productData);
        this.isProductInCart(productData.id);
      }
    }
  }

  removeToCart(productId:number){
    this.ps.removeItemFromCart(productId)
    this.isProductInCart(productId);
  }

  isProductInFav(productId: number): boolean {
    return this.ps.isProductInFav(productId);
  }

  addToFav(productData:product){
    if (productData) {
      if (!localStorage.getItem('customer')){
        this.ps.localAddToFav(productData);
        this.ps.isProductInFav(productData.id);
      }
    }
  }

  removeToFav(productId:number){
    this.ps.removeItemFromFav(productId)
    this.ps.isProductInFav(productId);
  }


}
