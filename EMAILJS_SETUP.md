# EmailJS Setup Guide

This portfolio uses EmailJS to handle contact form submissions. Follow these steps to configure it:

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. Go to the [Email Services](https://dashboard.emailjs.com/admin) page
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to the [Email Templates](https://dashboard.emailjs.com/admin/templates) page
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply to: {{reply_to}}
```

4. Note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to [Account Settings](https://dashboard.emailjs.com/admin/account)
2. Find your **Public Key** (also called API Key)
3. Copy it (e.g., `your_public_key_here`)

## Step 5: Update Your Code

### Update `src/index.html`

Find this line:
```javascript
emailjs.init('YOUR_PUBLIC_KEY');
```

Replace `YOUR_PUBLIC_KEY` with your actual public key:
```javascript
emailjs.init('your_public_key_here');
```

### Update `src/app/services/email.service.ts`

Find these lines:
```typescript
private readonly SERVICE_ID = 'YOUR_SERVICE_ID';
private readonly TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

Replace with your actual IDs:
```typescript
private readonly SERVICE_ID = 'service_abc123';
private readonly TEMPLATE_ID = 'template_xyz789';
```

## Step 6: Test Your Contact Form

1. Run your development server: `ng serve`
2. Navigate to the contact section
3. Fill out the form with test data
4. Submit the form
5. Check your email inbox for the message

## Troubleshooting

### Form shows "Email service is not configured"
- Make sure you've updated all three values (Public Key, Service ID, Template ID)
- Check that the values don't have quotes or extra spaces
- Clear your browser cache and reload

### Email not received
- Check your EmailJS dashboard for sent emails
- Look in your spam folder
- Verify your email service is properly connected in EmailJS dashboard
- Check browser console for error messages

### Error: "Invalid public key"
- Double-check you copied the entire public key
- Make sure you're using the Public Key, not the Private Key
- Re-initialize EmailJS if needed

## Alternative: FormSubmit

If you prefer not to use EmailJS, you can use FormSubmit.co (no signup required):

1. Update the contact form to use FormSubmit:
```html
<form action="https://formsubmit.co/your@email.com" method="POST">
```

2. Add hidden fields for configuration:
```html
<input type="hidden" name="_subject" value="New portfolio contact!">
<input type="hidden" name="_captcha" value="false">
<input type="hidden" name="_template" value="table">
```

## Security Notes

- Never commit your EmailJS credentials to public repositories
- Consider using environment variables for sensitive data
- The free tier has rate limiting (200 emails/month)
- Monitor your EmailJS dashboard for unusual activity

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Pricing](https://www.emailjs.com/pricing/)
- [EmailJS FAQ](https://www.emailjs.com/faq/)
