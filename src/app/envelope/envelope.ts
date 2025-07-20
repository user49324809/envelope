import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { FeedbackModal } from '../feedback/feedback-modal';

@Component({
  standalone: true,
  selector: 'app-envelope',
  imports: [CommonModule, FormsModule, FeedbackModal],
  templateUrl: './envelope.html',
  styleUrl: './envelope.css'
})
export class Envelope implements OnInit {
  isOpen = false;
  showFeedback = false;
  products: Product[] = [];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/products').subscribe(data => {
    this.products = data;
    });
  }

  toggleEnvelope(event: MouseEvent) {
    event.stopPropagation();
    if (!this.isOpen) {
      this.playSound();
      this.isOpen = true;
    }
  }

  playSound() {
    const audio = new Audio('assets/envelope-open.mp3');
    audio.play();
  }

  getTotal(product: Product): number {
    return product.price * product.quantity;
  }

  addToCart(product: Product) {
    const quantity = product.quantity || 1;
    this.cartService.addItem({ ...product, quantity });
    alert(`${product.name} x${quantity} добавлен в корзину 🛒`);
  }
}