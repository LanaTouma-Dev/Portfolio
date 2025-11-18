export const environment = {
  production: true,

  // Portfolio Information
  name: 'Lana Touma',
  title: 'Full-Stack Developer & AI Engineer',
  portfolioUrl: 'https://portfolio-f6hbnyyqy-lanas-projects-4bd16455.vercel.app/',

  // Contact Information (Update these with your real info)
  contact: {
    email: 'your.email@example.com', // TODO: Update with your email
    phone: '+1 (555) 123-4567', // TODO: Update with your phone or set to null to hide
    location: 'San Francisco, CA', // TODO: Update with your location
    locationMapUrl: 'https://maps.google.com' // TODO: Update with your actual map link
  },

  // Social Media Links (Update these with your real profiles)
  social: {
    github: 'https://github.com/yourusername', // TODO: Update
    linkedin: 'https://linkedin.com/in/yourusername', // TODO: Update
    twitter: 'https://twitter.com/yourusername', // TODO: Update or set to null to hide
    instagram: 'https://instagram.com/yourusername' // TODO: Update or set to null to hide
  },

  // EmailJS Configuration (Get these from https://www.emailjs.com/)
  emailjs: {
    publicKey: 'YOUR_PUBLIC_KEY', // TODO: Update with your EmailJS public key
    serviceId: 'YOUR_SERVICE_ID', // TODO: Update with your EmailJS service ID
    templateId: 'YOUR_TEMPLATE_ID' // TODO: Update with your EmailJS template ID
  },

  // Resume
  resume: {
    filename: 'Lana_Touma_Resume.pdf',
    path: 'assets/documents/Lana_Touma_Resume.pdf'
  },

  // Feature Flags
  features: {
    showPhone: true, // Set to false to hide phone number
    showTwitter: true, // Set to false to hide Twitter link
    showInstagram: true, // Set to false to hide Instagram link
    enableAnalytics: true // Set to true when you add Google Analytics
  }
};
