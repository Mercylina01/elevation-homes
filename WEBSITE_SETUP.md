# Elevation Homes - Furniture Store Website

## Project Overview

A fully functional e-commerce website for Elevation Homes, a furniture store located in Mukono, Ku Buteebe, Uganda. The website features a complete product catalog, shopping cart, checkout system, contact forms, and location information with Google Maps integration.

## Key Features Implemented

### 1. Homepage
- **Hero Section**: Eye-catching banner with call-to-action buttons
- **Features Section**: Highlights of why customers should choose Elevation Homes
- **Featured Products**: Dynamic product showcase with 6 featured items
- **CTA Section**: Call-to-action for customer engagement

### 2. Product Catalog (`/products`)
- Browse all 15+ furniture products
- Filter by category (Beds, Sofas, Tables, Chairs, Desks, Cabinets)
- Search functionality
- Individual product detail pages with descriptions, pricing, and images
- Add to cart functionality

### 3. Shopping Cart (`/cart`)
- View all items in cart
- Adjust quantities
- Remove items
- Order summary with total calculation
- Customer information form

### 4. Checkout & Payment
- Customer details collection (name, email, phone, address)
- Payment method selection:
  - Bank Transfer
  - Cash on Delivery
  - Mobile Money
- Order confirmation page

### 5. Product Details Page (`/products/[id]`)
- High-quality product images
- Detailed descriptions
- Price display in UGX (Ugandan Shillings)
- Stock availability
- Related products
- Quick add to cart button
- Quantity selector

### 6. About Page (`/about`)
- Company story and mission
- Why Choose Elevation Homes section
- Complete location information
- Business hours
- Contact details
- Embedded Google Maps showing location in Mukono, Ku Buteebe

### 7. Contact Page (`/contact`)
- Contact form with fields: name, email, phone, subject, message
- Contact information displayed
- Direct phone and email links
- Business hours
- Location details

### 8. Navigation & Footer
- Consistent navigation bar across all pages
- Links to all main sections
- Footer with contact info and quick links
- Responsive design for mobile, tablet, and desktop

## Database Schema

### Products Table
- id (UUID)
- name (TEXT)
- description (TEXT)
- price (DECIMAL)
- category (TEXT)
- image_url (TEXT)
- stock (INT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Cart Items Table
- id (UUID)
- session_id (TEXT)
- product_id (UUID, FK to products)
- quantity (INT)
- created_at (TIMESTAMP)

### Orders Table
- id (UUID)
- customer_name (TEXT)
- customer_email (TEXT)
- customer_phone (TEXT)
- delivery_address (TEXT)
- total_price (DECIMAL)
- status (TEXT)
- stripe_payment_id (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Order Items Table
- id (UUID)
- order_id (UUID, FK to orders)
- product_id (UUID, FK to products)
- quantity (INT)
- price (DECIMAL)
- created_at (TIMESTAMP)

### Contact Messages Table
- id (UUID)
- name (TEXT)
- email (TEXT)
- phone (TEXT)
- subject (TEXT)
- message (TEXT)
- created_at (TIMESTAMP)

## Sample Products

The website includes 15 pre-loaded furniture products:
1. Premium King Size Bed - 2,500,000 UGX
2. Comfortable Sofa Set - 3,200,000 UGX
3. Dining Table with Chairs - 1,800,000 UGX
4. Executive Office Chair - 650,000 UGX
5. Study Desk - 850,000 UGX
6. Wardrobe Cabinet - 1,950,000 UGX
7. Single Bed Frame - 1,200,000 UGX
8. Reclining Chair - 950,000 UGX
9. Coffee Table - 450,000 UGX
10. Bookcase Shelving - 750,000 UGX
11. Bar Stools Set - 1,100,000 UGX
12. Gaming Desk - 1,400,000 UGX
13. Corner Sofa - 4,200,000 UGX
14. Bedside Table - 350,000 UGX
15. Bedroom Wardrobe Set - 2,800,000 UGX

## Business Information

**Company Name:** Elevation Homes

**Location:** Mukono, Ku Buteebe, Uganda

**Contact Details:**
- Phone: +256 700 000 000
- Email: info@elevationhomes.ug

**Business Hours:**
- Monday - Friday: 8:00 AM - 6:00 PM
- Saturday: 9:00 AM - 4:00 PM
- Sunday: Closed

**Google Maps Location:** Embedded on About page with coordinates for Mukono showroom

## API Endpoints

### Products
- `GET /api/products` - Get all products with filtering options
- `GET /api/products/[id]` - Get specific product details

### Cart
- `GET /api/cart` - Get cart items for session
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/[id]` - Update cart item quantity
- `DELETE /api/cart/[id]` - Remove item from cart

### Orders
- `POST /api/orders` - Create new order

### Contact
- `POST /api/contact` - Submit contact form

### Checkout
- `POST /api/checkout` - Process checkout

## Technology Stack

- **Frontend:** Next.js 16, React, TypeScript
- **Styling:** Tailwind CSS, Shadcn UI Components
- **Database:** Supabase (PostgreSQL)
- **Icons:** Lucide React
- **Images:** Next.js Image Component for optimization

## Setup Instructions

### 1. Environment Variables
No additional environment variables are required for the basic setup. The website uses Supabase which is already integrated.

### 2. Database Initialization
The database has been initialized with the following script:
- `/scripts/init-database.sql` - Creates all necessary tables

### 3. Seed Data
Product data has been seeded using:
- `/scripts/seed-products.sql` - Adds 15 sample furniture products

### 4. Running the Website
```bash
# Install dependencies (if needed)
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## Responsive Design

The website is fully responsive with:
- Mobile-first design approach
- Tablet optimization
- Desktop enhancements
- Touch-friendly interface

## Color Scheme

- **Primary Color:** Orange (#FF6B35) - Brand color for call-to-actions
- **Background:** Slate shades (900-50) - Professional appearance
- **Text:** Slate 900 for headings, Slate 600 for body text
- **Accents:** White for clean contrast

## Performance Features

- Image optimization with Next.js Image component
- Product images are JPG format for optimal file size
- CSS-in-JS with Tailwind for minimal bundle size
- Server-side rendering for SEO
- Lazy loading of images

## SEO Optimization

- Meta tags configured in layout.tsx
- Semantic HTML structure
- Proper heading hierarchy
- Alt text on all images
- Open Graph tags for social sharing

## Error Handling

- Try-catch blocks on all API calls
- User-friendly error messages
- Form validation on contact and checkout forms
- Loading states for async operations

## Future Enhancements

Potential additions for the website:
1. Stripe payment integration for online payments
2. User accounts and order history
3. Product reviews and ratings
4. Wishlist functionality
5. Email notifications for orders
6. Admin dashboard for product management
7. Multi-language support
8. Live chat support
9. Image gallery with zoom functionality
10. Bulk order discounts

## Support & Maintenance

For questions or issues with the website, contact:
- Email: info@elevationhomes.ug
- Phone: +256 700 000 000
- In-person: Mukono, Ku Buteebe, Uganda

---

**Last Updated:** January 2026
**Website Status:** Fully Functional - Ready for Production
