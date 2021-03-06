import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { AccountService } from '../../service/account.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as CartActions from '../../cart/store/cart.actions';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  currentProduct = null;
  message = '';
  isAuthenticated = false;
  private userSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private authService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getProduct(this.route.snapshot.paramMap.get('id'));
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  getProduct(id): void {
    this.productService.getSingleProduct(id)
      .subscribe(
        data => {
          this.currentProduct = data;
        },
        error => {
          console.log(error);
        });
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.currentProduct._id)
      .subscribe(
        response => {
          alert("product deleted successfully")
          this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
        });
  }

  addCart(): void{
    this.store.dispatch( new CartActions.AddCart(this.currentProduct));
    alert('Product Added to Cart');
  }

}

