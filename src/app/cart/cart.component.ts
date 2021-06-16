import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { Observable, Subscription } from 'rxjs';


import { AccountService } from '../service/account.service';
import * as cartActions from './store/cart.actions';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  isAuthenticated = true;
  cartProducts: Observable<Array<any>>;
  cartTotal: any = this.store.select(store => store.cartList.total);
  total: any;
  private userSubscription: Subscription;
  hasProducts = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AccountService
  ) {}

  ngOnInit(): void {
    this.cartProducts = this.store.select(store => store.cartList.addedItems);
    this.cartTotal.subscribe( currentTotal => {
      this.total = currentTotal;
      this.hasProducts = !!currentTotal;
    });
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onDelete(cartProductId): void {
    this.store.dispatch( new cartActions.RemoveItem(cartProductId) );
  }

  addQuantity(cartProductId): void {
    this.store.dispatch(new cartActions.AddQuantity(cartProductId));
  }

  subQuantity(cartProductId): void {
    this.store.dispatch( new cartActions.SubQuantity(cartProductId) );
  }

}
