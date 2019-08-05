import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product/product';
import { ProductUtils } from './product/productutils';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:8283/api/v1/products";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(product: Product,image:File): Observable<Product> {
    return this.http.post<Product>(apiUrl+ProductUtils.createProductUrl,ProductUtils.convertProduct(product,image)).pipe(
      tap((prod: Product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  uploadFile( file: File ) : Observable<any>  
  {  
    let url = apiUrl + "/uploadImage" ;  
  
    const formdata: FormData = new FormData();  
    
    formdata.append('file', file);  
     console.log("url "+url.toString());
    return this.http.post(url , formdata).pipe(
      tap((prod: Product) => console.log(``)),
      catchError(this.handleError<Object>('upload'))
    );
  }  

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl+"/list")
      .pipe(
        tap(product => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  deleteProductByID(id:Number): Observable<any>{
    console.log(apiUrl+'/delete/${id}');
    return this.http.get(apiUrl+'/delete/'+id).pipe(
        catchError(this.handleError('delete', []))
      );  
  }
  
  getProductByID(id:Number):Observable<Product>{
    console.log(apiUrl+'/edit/${id}');
    return this.http.get<any>(apiUrl+'/edit/'+id) .pipe(
        catchError(this.handleError('edit', []))
      );  
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
