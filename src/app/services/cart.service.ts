import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'cart_items';
  private items: { product: Product; quantity: number }[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  private loadFromStorage() {
    const data = localStorage.getItem(this.storageKey);
    this.items = data ? JSON.parse(data) : [];
  }

  getItems() {
    return this.items;
  }

  addItem(product: Product, quantity: number = 1) {
    const existing = this.items.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.saveToStorage();
  }

  clearCart() {
    this.items = [];
    this.saveToStorage();
  }
}