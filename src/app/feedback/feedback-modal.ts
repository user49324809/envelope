import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './feedback-modal.html',
  styleUrls: ['./feedback-modal.css']
})
export class FeedbackModal {
  name = '';
  email = '';
  message = '';
  submitted = false;

  @Output() close = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  submit() {
    if (this.name.trim() && this.email.trim() && this.message.trim()) {
      const payload = {
        name: this.name,
        email: this.email,
        message: this.message
      };

      this.http.post('http://localhost:3000/feedback', payload).subscribe({
        next: () => {
          this.submitted = true;
          alert('Спасибо за сообщение!');
          this.closeModal();
        },
        error: (err) => {
          console.error('Ошибка отправки:', err);
          alert('Ошибка при отправке. Попробуйте позже.');
        }
      });
    } else {
      alert('Пожалуйста, заполните все поля.');
    }
  }

  closeModal() {
    this.close.emit();
  }
}