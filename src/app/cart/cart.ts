import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  name = '';
  phone = '';
  address = '';
  orderPlaced = false;
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  canCheckout(): boolean {
  return (
    this.cartItems.length > 0 &&
    this.name.trim().length > 0 &&
    this.phone.trim().length > 0 &&
    this.address.trim().length > 0
  );
}

  checkout(): void {
    if (!this.canCheckout()) {
      alert('Пожалуйста, заполните все поля и добавьте товары в корзину.');
      return;
    }

    this.orderPlaced = true;
    alert(`Спасибо за заказ, ${this.name}! Ваш заказ оформлен 📨`);
    this.cartService.clearCart();
    this.cartItems = [];
    this.name = '';
    this.phone = '';
    this.address = '';
  }
}