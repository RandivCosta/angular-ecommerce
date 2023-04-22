import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult : undefined|product[]
  noSearchResults : boolean = false;
  resultValue : string | null ='';

  constructor(private activatedRoute : ActivatedRoute, private ps : ProductsService){}

  ngOnInit():void{
    let query = this.activatedRoute.snapshot.paramMap.get('query');
    this.resultValue = query
    query && this.ps.searchProduct(query).subscribe((result)=>{
      this.searchResult = result;
      if(result.length === 0) {
        this.noSearchResults = true;
      }
    });
  }

}
