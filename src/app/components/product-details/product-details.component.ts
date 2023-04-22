import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { product } from 'src/app/data-type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  faHeart = faHeart
  images = [
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1617043983671-adaadcaa2460?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1609951894313-1390909edc11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1532435109783-fdb8a2be0baa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
  ];

  slideIndex = 1;
  intervalSubscription: Subscription = new Subscription;
  productDetailsArray:  undefined | product[];
  productData: product = {
    name: '',
    price: 0,
    description: '',
    image: '',
    category: '',
    id: 0,
    quantity: 1,
  }
  productId : number = 1;
  productQuantity: number = 1;
  removeCart = false;
  removeFav = false;

  constructor(private activatedRoute: ActivatedRoute, private ps: ProductsService) { }

  ngOnInit(): void {
    this.startAutoSliding();
    let productId = Number(this.activatedRoute.snapshot.paramMap.get('productId'));
    this.productId = productId;
    productId && this.ps.searchProductDetails(productId).subscribe((result) => {
      this.productDetailsArray = result;
      this.productData = this.productDetailsArray[0];
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item:product) => productId === item.id)
        if (items.length) {
          this.removeCart = true;
        }else {
          this.removeCart = false;
        }
      }

      let favData = localStorage.getItem('localFav');
      if (productId && favData) {
        let items = JSON.parse(favData);
        items = items.filter((item:product) => productId === item.id)
        if (items.length) {
          this.removeFav = true;
        }else {
          this.removeFav = false;
        }
      }


    });

  }

  ngOnDestroy() {
    this.stopAutoSliding();
  }

  startAutoSliding() {
    const source = interval(5000); // emit a value every 5 seconds
    this.intervalSubscription = source.subscribe(() => {
      this.plusSlides(1);
    });
  }

  stopAutoSliding() {
    this.intervalSubscription.unsubscribe();
  }
  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  showSlides(n: number) {
    let i: number;
    const slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;
    const prevIndex = this.slideIndex;

    if (n > slides.length) {
      this.slideIndex = 1;
    } else if (n < 1) {
      this.slideIndex = slides.length;
    } else {
      this.slideIndex = n;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active');
      slides[i].style.display = 'none';
    }

    slides[this.slideIndex - 1].style.display = 'block';
    slides[this.slideIndex - 1].classList.add('active');
  }

  addToCart(){
    if(this.productId == this.productData.id){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('customer')){
        this.ps.localAddToCart(this.productData)
        this.removeCart = true;
      }
    }
  }

  removeToCart(productId:number){
    this.ps.removeItemFromCart(productId)
    this.removeCart = false;
  }
  
  addToFav(){
    if(this.productId == this.productData.id){
      if(!localStorage.getItem('customer')){
        this.ps.localAddToFav(this.productData)
        this.removeFav = true;
      }
    }
  }

  removeToFav(productId:number){
    this.ps.removeItemFromFav(productId)
    this.removeFav = false;
  }

}
