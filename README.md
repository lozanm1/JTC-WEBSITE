# JTC GROUP OF COMPANIES - Modern Website

A sleek, modern, and minimalist website for JTC Group of Companies built with HTML, CSS, JavaScript, and PHP.

## 🎨 Design Features

- **Modern Minimalist Design** with #15133F (Deep Navy Purple) as the primary color
- **Smooth Animations** throughout the site
- **Responsive Design** - works perfectly on all devices
- **Interactive Elements** - hover effects, transitions, and scroll animations
- **Company Picture Section** - easily replaceable placeholder
- **Mission & Vision Interface** - editable content sections
- **Contact Form** - fully functional with PHP backend
- **Professional Navigation** - sticky navbar with smooth scrolling

## 📁 File Structure

```
├── index.html              # Main HTML structure
├── style.css               # Modern CSS with animations
├── script.js               # Interactive JavaScript
├── process-contact.php     # Contact form processor
├── update-content.php      # Update mission/vision
├── get-content.php         # Retrieve stored content
├── data/                   # (Auto-created) Stores content.json
├── logs/                   # (Auto-created) Log files
└── README.md              # This file
```

## 🚀 Getting Started

### Requirements
- PHP 7.4 or higher
- Web server (Apache, Nginx, etc.)
- Modern web browser

### Installation

1. **Clone/Download** the repository to your web server
2. **Configure email** in `process-contact.php` (line 37):
   ```php
   $to = 'your-email@example.com'; // Update this
   ```
3. **Set permissions** for the `data` and `logs` directories:
   ```bash
   chmod 755 data logs
   ```
4. **Access** the website via your web browser

## 🎯 Key Features

### 1. **Navigation Bar**
- Sticky navigation with smooth scrolling
- Active section highlighting
- Logo: "JTC"

### 2. **Hero Section**
- Animated gradient background
- Call-to-action button
- Company tagline: "Excellence in Every Endeavor"

### 3. **About Section**
- Company picture placeholder (replace with your logo)
- Company description area
- Hover effects on images

### 4. **Mission & Vision Section**
- Two editable cards
- Click "Edit" to modify content
- Content is saved to backend (data/content.json)
- Hover animations and styling

### 5. **Contact Form**
- Name, Email, Message fields
- Form validation
- Backend processing with PHP
- Email notifications sent to configured address
- Success/Error messages

### 6. **Responsive Footer**
- Company copyright information

## 🎨 Color Scheme

- **Primary**: #15133F (Deep Navy Purple)
- **Secondary**: #FFFFFF (White)
- **Accent**: #6366F1 (Indigo)
- **Background**: #F9F9F9 (Light Gray)

## 📝 How to Customize

### Update Company Picture
In `index.html` (line 89), replace:
```html
<img src="https://via.placeholder.com/400x300?text=JTC+GROUP+LOGO" alt="JTC Group of Companies">
```

With your actual image URL:
```html
<img src="path/to/your/company-logo.png" alt="JTC Group of Companies">
```

### Edit Mission & Vision
1. Click the "Edit" button on either card
2. Modify the text
3. Click "Save" to persist changes
4. Content is automatically saved to `data/content.json`

### Customize Contact Email
Edit `process-contact.php` line 37:
```php
$to = 'your-email@jtcgroup.com';
```

### Modify Colors
Update the CSS variables in `style.css` (lines 10-16):
```css
:root {
    --primary-color: #15133F;
    --secondary-color: #ffffff;
    --accent-color: #6366f1;
    /* ... */
}
```

## 🔧 PHP Endpoints

### POST `/process-contact.php`
Processes contact form submissions.

**Parameters:**
- `name` - User's name
- `email` - User's email
- `message` - Contact message

**Response:**
```json
{
    "success": true,
    "message": "Thank you for your message! We will get back to you soon."
}
```

### POST `/update-content.php`
Updates mission or vision content.

**Body (JSON):**
```json
{
    "type": "mission",
    "content": "New mission statement"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Mission updated successfully"
}
```

### GET `/get-content.php`
Retrieves stored mission and vision content.

**Response:**
```json
{
    "mission": "...",
    "vision": "..."
}
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔒 Security Features

- Input sanitization in contact form
- HTML tag stripping for content updates
- File permissions for data storage
- Error handling and logging

## 📊 Logging

The system creates two log files (auto-generated):

1. **logs/contact_submissions.log** - Contact form submissions
2. **logs/content_updates.log** - Mission/Vision updates

## 🎬 Animations

The website includes multiple animations:
- **Fade In/Up** - Elements appearing on load
- **Hover Effects** - Cards and buttons
- **Floating** - Hero section background
- **Scroll Animations** - Elements appearing as you scroll

## 🐛 Troubleshooting

### Contact form not sending emails
- Check PHP mail configuration
- Verify email address in `process-contact.php`
- Check server logs for errors

### Content not saving
- Ensure `data/` directory is writable (chmod 755)
- Check PHP error logs
- Verify JSON format in `data/content.json`

### Images not loading
- Update image paths in `index.html`
- Ensure images are in the correct location
- Check file permissions

## 📄 License

Copyright © 2024 JTC GROUP OF COMPANIES. All rights reserved.

## 📧 Support

For issues or customization needs, please contact your development team.

---

**Created**: 2024
**Last Updated**: June 2024
**Version**: 1.0.0
