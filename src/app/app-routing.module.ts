import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './components/explore/explore.component';
import { ElectronicsComponent } from './components/electronics/electronics.component';
import { CustomerAuthComponent } from './components/customer-auth/customer-auth.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './auth.guard';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { ClothingComponent } from './components/clothing/clothing.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';


const routes: Routes = [
  { path: '', component: ExploreComponent },
  { path: 'electronics' , component: ElectronicsComponent},
  { path: 'customer-auth', component: CustomerAuthComponent},
  { path: 'cart', component: CartComponent},
  { path: 'favorite', component: FavoriteComponent},
  { path: 'clothing', component: ClothingComponent },
  { path: 'search/:query' , component: SearchComponent},
  { path: 'details/:productId' , component: ProductDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
