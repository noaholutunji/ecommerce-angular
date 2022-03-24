import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface ProductResponseData {
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  productId: string;
}

const baseUrl = 'https://noah-ninostyle-api.herokuapp.com/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  createProduct(data): Observable<any> {
      const token = localStorage.getItem('token').replace(/['"]+/g, '');

      return this.http.post(baseUrl, data , {
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

  updateProduct(id, data): Observable<any> {
    const token = localStorage.getItem('token').replace(/['"]+/g, '');
    return this.http.patch<ProductResponseData>(`${baseUrl}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
    });
  }

  deleteProduct(id): Observable<any> {
    const token = localStorage.getItem('token').replace(/['"]+/g, '');

    return this.http.delete(`${baseUrl}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
  }
}
