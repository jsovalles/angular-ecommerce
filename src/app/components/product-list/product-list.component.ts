import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  previousCategoryId: number;
  productCategory: ProductCategory;
  searchMode: boolean;

  //pagination
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  previousKeyword: string = null;

  constructor(private productListService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    //pagination condition
    if(this.previousKeyword !=null){
      this.pageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`${theKeyword} and ${this.pageNumber}`);

    this.productListService.searchProductsPaginate(this.pageNumber-1, this.pageSize,theKeyword).subscribe(
      this.processResult()
      )


  }

  handleListProducts() {

    //Check if id value is available
    const hasCategoryId: Boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //"+" = converts string into number
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    //Check if we have a different category than previous (pagination)
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId= ${this.currentCategoryId}, pageNumber=${this.pageNumber}`)

    this.productListService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(
      this.processResult()
    )

    //getting category name
    //this.productListService.getProductCategoryName(this.currentCategoryId).subscribe(
    //  data => this.productCategory = data
    //)

  }

  processResult() {

    return data => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  updatePageSize(selectedPageSize: number){
    this.pageSize = selectedPageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

}
