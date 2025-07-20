import { Component } from '@angular/core';
import { Envelope } from './envelope/envelope';
import { CartComponent } from './cart/cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Envelope, CartComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
