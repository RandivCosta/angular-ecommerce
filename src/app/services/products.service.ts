import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../data-type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartData = new EventEmitter<product[] | []>()

  baseUrl:string = "https://json-server-kdq2.onrender.com/products";

  constructor(private http : HttpClient, private snackbar: MatSnackBar) { }

  getElectronics(){
    return this.http.get<product[]>(`${this.baseUrl}?category=electronics`);
  }

  getClothings(){
    return this.http.get<product[]>(`${this.baseUrl}?category=clothing`);
  }

  searchProduct(query: string){
    return this.http.get<product[]>(`${this.baseUrl}?q=${query}`);
  }

  searchProductDetails(productId: number){
    return this.http.get<product[]>(`${this.baseUrl}?id=${productId}`);
  }

  popularProducts(){
    return this.http.get<product[]>(`${this.baseUrl}?_limit=6`);
  }


  localAddToCart(data: product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data]);
    }else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
    this.snackbar.open('item added to the cart','undo', {duration: 2 * 1000,});
  }

  removeItemFromCart(productId:number){
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items:product[] = JSON.parse(cartData);
      items = items.filter((item:product) => productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  localAddToFav(data: product){
    let FavData = [];
    let localFav = localStorage.getItem('localFav');
    if(!localFav){
      localStorage.setItem('localFav',JSON.stringify([data]));
    }else{
      FavData = JSON.parse(localFav);
      FavData.push(data);
      localStorage.setItem('localFav',JSON.stringify(FavData));
    }
  }

  removeItemFromFav(productId:number){
    let FavData = localStorage.getItem('localFav');
    if (FavData) {
      let items:product[] = JSON.parse(FavData);
      items = items.filter((item:product) => productId !== item.id)
      localStorage.setItem('localFav', JSON.stringify(items));
    }
  }

  isProductInFav(productId: number): boolean {
    let FavData = localStorage.getItem('localFav');
    if (productId && FavData) {
      let items = JSON.parse(FavData);
      return items.some((item:product) => item.id === productId)
    } else {
      return false;
    }
    
  }
}
