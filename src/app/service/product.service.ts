import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


interface ProductResponseData {
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  productId: string;
}

const baseUrl = 'https://noah-ninostyle-api.herokuapp.com/products';
console.log(baseUrl);
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  createProduct(data): Observable<any> {

      const main = localStorage.getItem('token');
      const Token = main.replace(/['"]+/g, '');

      return this.http.post('https://noah-ninostyle-api.herokuapp.com/products', data , {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
    }


  getAllProducts(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getSingleProduct(productId): Observable<any> {
    return this.http.get(`${baseUrl}/${productId}`);
  }

  update(id, data): Observable<any> {
    const main = localStorage.getItem('token');
    const Token = main.replace(/['"]+/g, '');

    return this.http.patch<ProductResponseData>(`https://noah-ninostyle-api.herokuapp.com/products/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
    }
    });
  }


  delete(id): Observable<any> {
    const main = localStorage.getItem('token');
    const token = main.replace(/['"]+/g, '');

    return this.http.delete(`${baseUrl}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
  }

  // createProduct(name: string, brand: string, price: number, image: string, description: string) {
  //   const main = localStorage.getItem('token');
  //   const token = main.replace(/['"]+/g, '');
  //   const userId = localStorage.get('userId');
  //   return this.http
  //     .post<ProductResponseData>(
  //       `https://noah-ninostyle-api.herokuapp.com/products`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //         name,
  //         brand,
  //         price,
  //         image,
  //         description,
  //         ownerId: userId
  //       }
  //     )
  //     .pipe(
  //       catchError(errorRes => {
  //         const errorMessage = 'An error occurred!';
  //         return throwError(errorMessage);
  //       })
  //     );
  // }

  // getProducts() {
  //   return this.http
  //     .get<ProductResponseData>(
  //       'https://noah-ninostyle-api.herokuapp.com/products')
  //     .pipe(
  //       catchError(errorRes => {
  //         const errorMessage = 'An error occurred!';
  //         return throwError(errorMessage);
  //       })
  //     );
  // }
  // getAProduct(productId: string) {
  //   return this.http
  //     .get<ProductResponseData>(
  //       `https://noah-ninostyle-api.herokuapp.com/products/${productId}`)
  //     .pipe(
  //       catchError(errorRes => {
  //         const errorMessage = 'An error occurred!';
  //         return throwError(errorMessage);
  //       })
  //     );
  // }

  // create(data): Observable<any> {

  //   const main = localStorage.getItem('token');
  //   const Token = main.replace(/['"]+/g, '');

  //   return this.http.post('https://noah-ninostyle-api.herokuapp.com/products', data , {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${Token}`,
  //     },
  //   });
  // }

  // update(name: string, brand: string, price: number, image: string, description: string, productId: string) {
  //   const main = localStorage.getItem('token');
  //   const token = main.replace(/['"]+/g, '');
  //   return this.http
  //     .patch<ProductResponseData>(
  //       `https://noah-ninostyle-api.herokuapp.com/products/${productId}`,
  //         {
  //           headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //           name,
  //           brand,
  //           price,
  //           image,
  //           description,
  //         }
  //       )
  //     .pipe(
  //       catchError(errorRes => {
  //         const errorMessage = 'An error occurred!';
  //         return throwError(errorMessage);
  //       })
  //     );
  // }


}
