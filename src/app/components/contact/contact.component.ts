import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  formData: FormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  formStatus: FormStatus | null = null;

  async onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.formStatus = null;

    try {
      // TODO: Replace with your actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call

      this.formStatus = {
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      };

      // Reset form
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    } catch (error) {
      this.formStatus = {
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again later.'
      };
    } finally {
      this.isSubmitting = false;
    }
  }
}
