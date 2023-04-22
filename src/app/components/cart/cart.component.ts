import { Component } from '@angular/core';
import { faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { cartProduct, product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  faTrashAlt= faTrashAlt
  faCartShopping = faCartShopping
  cartProducts: undefined | product[];
  subTotal:number =0;
  total:number =0;

  constructor(private ps: ProductsService){}

  ngOnInit(): void{
    this.getCartProducts();
  }

  getCartProducts(){
    let localCart = localStorage.getItem('localCart');
    if(localCart){
      let cartData = JSON.parse(localCart);
      if (cartData.length) {
        this.cartProducts = cartData;
        const totalValue = cartData.reduce((acc:number, product:cartProduct) => {
          return acc + (product.price * product.quantity);
        }, 0);
        this.subTotal = totalValue;
        this.total = this.subTotal + 15;
      }else {
        this.cartProducts = undefined;
      }
    }
  }

  removeToCart(productId:number){
    this.ps.removeItemFromCart(productId);
    this.getCartProducts()
  }

}
