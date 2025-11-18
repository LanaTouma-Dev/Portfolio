import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../services/email.service';

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

  constructor(private emailService: EmailService) {}

  async onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.formStatus = null;

    try {
      // Check if EmailJS is configured
      if (!this.emailService.isConfigured()) {
        this.formStatus = {
          success: false,
          message: 'Email service is not configured yet. Please set up EmailJS credentials.'
        };
        return;
      }

      // Send email using EmailJS
      const result = await this.emailService.sendEmail({
        from_name: this.formData.name,
        from_email: this.formData.email,
        subject: this.formData.subject,
        message: this.formData.message
      });

      this.formStatus = result;

      // Reset form only if successful
      if (result.success) {
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.formStatus = {
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again later.'
      };
    } finally {
      this.isSubmitting = false;
    }
  }
}
