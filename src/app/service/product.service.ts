import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
      const token = localStorage.getItem('token').replace(/['"]+/g, '');

      return this.http.post('https://noah-ninostyle-api.herokuapp.com/products', data , {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
    const token = localStorage.getItem('token').replace(/['"]+/g, '');

    return this.http.patch<ProductResponseData>(`https://noah-ninostyle-api.herokuapp.com/products/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
    });
  }


  delete(id): Observable<any> {
    const token = localStorage.getItem('token').replace(/['"]+/g, '');

    return this.http.delete(`${baseUrl}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
  }
}
