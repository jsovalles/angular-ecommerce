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

  getProductCategoryName(categoryId: number): Observable<ProductCategory> {

    const productUrl = `${this.categoryUrl}/${categoryId}`

    return this.httpClient.get<ProductCategory>(productUrl).pipe(
      map(res => res)
    )
  }

  getProductListPaginate(thePage: number, thePageSize: number, categoryId: number): Observable<GetResponseProduct> {

    const searchUrl = `${this.url}/search/findByCategoryId?id=${categoryId}&page=${thePage}&size=${thePageSize}`

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProductList(categoryId: number): Observable<Product[]> {

    const searchUrl = `${this.url}/search/findByCategoryId?id=${categoryId}`

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(res => res._embedded.productCategory)
    )
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    const searchUrl = `${this.url}/search/findByNameContaining?name=${theKeyword}`

    return this.getProducts(searchUrl);

  }

  searchProductsPaginate(thePage: number, thePageSize: number, keyword: string): Observable<GetResponseProduct> {

    const searchUrl = `${this.url}/search/findByNameContaining?name=${keyword}&page=${thePage}&size=${thePageSize}`

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(res => res._embedded.products)
    );
  }

  getProduct(productId: number) {

    const productUrl = `${this.url}/${productId}`

    return this.httpClient.get<Product>(productUrl);
  }

}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  }
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}