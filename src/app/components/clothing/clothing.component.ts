import { Component } from '@angular/core';
import { faStar, faStarHalfAlt, faHeart } from '@fortawesome/free-regular-svg-icons';
import { product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-clothing',
  templateUrl: './clothing.component.html',
  styleUrls: ['./clothing.component.css']
})
export class ClothingComponent {
  faStar = faStar
  faStarHalfAlt = faStarHalfAlt
  faHeart = faHeart

  constructor(private ps: ProductsService) { }
  products: undefined | product[];
  productData: undefined | product;

  ngOnInit(): void {
    this.ps.getClothings().subscribe((result) => {
      if (result) {
        this.products = result
      }
    })
  }

  isProductInCart(productId: number): boolean {
    let cartData = localStorage.getItem('localCart');
    if (productId && cartData) {
      let items = JSON.parse(cartData);
      return items.some((item: product) => item.id === productId)
    } else {
      return false;
    }

  }

  addToCart(productData: product) {
    this.productData = productData;
    if (this.productData) {
      this.productData.quantity = 1;
      if (!localStorage.getItem('customer')) {
        this.ps.localAddToCart(this.productData);
        this.isProductInCart(productData.id);
      }
    }
  }

  removeToCart(productId: number) {
    this.ps.removeItemFromCart(productId)
    this.isProductInCart(productId);
  }

  isProductInFav(productId: number): boolean {
    return this.ps.isProductInFav(productId);
  }

  addToFav(productData: product) {
    if (productData) {
      if (!localStorage.getItem('customer')) {
        this.ps.localAddToFav(productData);
        this.ps.isProductInFav(productData.id);
      }
    }
  }

  removeToFav(productId: number) {
    this.ps.removeItemFromFav(productId)
    this.ps.isProductInFav(productId);
  }


}
