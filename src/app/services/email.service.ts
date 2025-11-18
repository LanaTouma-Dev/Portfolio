import { Injectable } from '@angular/core';

// Extend window interface to include emailjs
declare global {
  interface Window {
    emailjs: any;
  }
}

export interface EmailParams {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // Replace these with your actual EmailJS credentials
  // Get them from https://www.emailjs.com/
  private readonly SERVICE_ID = 'YOUR_SERVICE_ID';
  private readonly TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

  constructor() { }

  async sendEmail(params: EmailParams): Promise<{ success: boolean; message: string }> {
    // Check if emailjs is loaded
    if (typeof window.emailjs === 'undefined') {
      console.error('EmailJS is not loaded');
      return {
        success: false,
        message: 'Email service is not configured. Please check your EmailJS setup.'
      };
    }

    try {
      // Send email using EmailJS
      const response = await window.emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        {
          from_name: params.from_name,
          from_email: params.from_email,
          subject: params.subject,
          message: params.message,
          reply_to: params.from_email
        }
      );

      console.log('Email sent successfully:', response);
      return {
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      };
    } catch (error: any) {
      console.error('Failed to send email:', error);
      return {
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again later or contact me directly.'
      };
    }
  }

  /**
   * Validate email configuration
   * Returns true if EmailJS is properly configured
   */
  isConfigured(): boolean {
    return (
      typeof window.emailjs !== 'undefined' &&
      this.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
      this.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID'
    );
  }
}
