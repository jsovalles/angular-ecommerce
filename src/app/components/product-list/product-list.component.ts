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
  productCategory: ProductCategory;

  constructor(private productListService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    //Check if id value is available
    const hasCategoryId: Boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //"+" = converts string into number
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    this.productListService.getProductList(this.currentCategoryId).subscribe(
      data => this.products = data
    )

    this.getProductCategoryName(this.currentCategoryId);

  }

  getProductCategoryName(currentCategoryId: number) {
    //getting the product category
    this.productListService.getProductCategoryName(this.currentCategoryId).subscribe(
      data => this.productCategory = data
    )
  }

}
