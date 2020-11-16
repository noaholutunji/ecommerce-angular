import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  currentProduct = null;
  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getProduct(this.route.snapshot.paramMap.get('id'));
  }

  getProduct(id): void {
    this.productService.getSingleProduct(id)
      .subscribe(
        data => {
          this.currentProduct = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateProduct(): void {
    const data = {
      name: this.currentProduct.name,
      image: this.currentProduct.image,
      brand: this.currentProduct.brand,
      price: this.currentProduct.price,
      description: this.currentProduct.description
    }

    this.productService.update(this.currentProduct._id, data)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The product was updated!';
          this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
        });
  }
}
