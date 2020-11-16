import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  product = {
    name: '',
    image: '',
    brand: '',
    price: '',
    description: '',
  };
  submitted = false;

  constructor(private productService: ProductService,  private router: Router) { }

  ngOnInit(): void {
  }

  createProduct(): void {
    const data = {
      name: this.product.name,
      image: this.product.image,
      brand: this.product.brand,
      price: this.product.price,
      description: this.product.description
    };

    this.productService.createProduct(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
        });
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      name: '',
      image: '',
      brand: '',
      price: '',
      description: '',
    };
  }
}
