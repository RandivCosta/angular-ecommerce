import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ElectronicsComponent } from './components/electronics/electronics.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ExploreComponent } from './components/explore/explore.component';
import { CustomerAuthComponent } from './components/customer-auth/customer-auth.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CartComponent } from './components/cart/cart.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClothingComponent } from './components/clothing/clothing.component';
import { SearchComponent } from './components/search/search.component';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoriesComponent,
    ElectronicsComponent,
    SearchBarComponent,
    ExploreComponent,
    CustomerAuthComponent,
    SpinnerComponent,
    CartComponent,
    FavoriteComponent,
    FooterComponent,
    ClothingComponent,
    SearchComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    LayoutModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    FontAwesomeModule,
    MatRippleModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatBadgeModule
    
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
