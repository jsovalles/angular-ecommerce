import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:8080/api/products";
  
  private categoryUrl = "http://localhost:8080/api/product-category";

  constructor(private httpClient: HttpClient) { }

  getProductCategoryName(categoryId: number): Observable<ProductCategory>{

    const productUrl =  `${this.categoryUrl}/${categoryId}`

    return this.httpClient.get<ProductCategory>(productUrl).pipe(
      map(res => res)
    )
  }

  getProductList(categoryId: number): Observable<Product[]> {

    const searchUrl = `${this.url}/search/findByCategoryId?id=${categoryId}`

    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(res => res._embedded.products)
    )
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(res => res._embedded.productCategory)
    )
  }  
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}