# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Algeria E-commerce Platform 🇩🇿

A modern, full-featured e-commerce platform built specifically for the Algerian market with support for local payment methods, Arabic/French localization, and DZD currency.

## Features ✨

- 🛒 **Complete Shopping Cart System** with persistent storage
- 💳 **Multiple Payment Methods** (CIB, SATIM, PayPal, Stripe)
- 🌍 **Multi-language Support** (Arabic, French, English)
- 📱 **Responsive Design** optimized for mobile and desktop
- 🏪 **Multi-vendor Support** for sellers across Algeria
- 👥 **Role-based Access Control** (Admin, Seller, Customer)
- 🔐 **Secure Authentication** with JWT
- 📊 **Analytics Dashboard** for business insights
- 🚚 **Shipping Integration** with local delivery services
- 💰 **DZD Currency Support** with proper formatting

## Tech Stack 🛠️

- **Frontend**: React 18, Vite, Material-UI
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Material-UI + Custom CSS
- **Build Tool**: Vite
- **Linting**: ESLint

## Getting Started 🚀

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Soliperso/Algeria_eCommerce.git
   cd algeria-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit the .env file with your configuration
   nano .env  # or use your preferred editor
   ```

4. **Required Environment Variables**
   
   Create a `.env` file in the root directory with the following minimum configuration:
   
   ```env
   # Application
   VITE_APP_NAME=Algeria Commerce
   NODE_ENV=development
   
   # API Configuration  
   VITE_API_BASE_URL=http://localhost:3000/api
   
   # Database (for future backend)
   DATABASE_URL=postgresql://username:password@localhost:5432/algeria_ecommerce
   
   # Authentication
   JWT_SECRET=your-super-secure-jwt-secret-key-here
   
   # Payment Gateways
   STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
   CIB_MERCHANT_ID=your_cib_merchant_id
   
   # Business Configuration
   BUSINESS_NAME=Algeria Commerce
   BUSINESS_EMAIL=contact@algeriacommerce.dz
   BUSINESS_PHONE=+213 555 123 456
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Available Scripts 📜

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Testing
npm run test         # Run tests (when added)
```

## Project Structure 📁

```
algeria-ecommerce/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/       # Common components
│   │   └── layout/       # Layout components
│   ├── pages/            # Page components
│   │   ├── admin/        # Admin pages
│   │   ├── auth/         # Authentication pages
│   │   ├── customer/     # Customer pages
│   │   └── seller/       # Seller pages
│   ├── store/            # Redux store
│   │   └── slices/       # Redux slices
│   ├── constants/        # App constants
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── theme/            # Material-UI theme
│   ├── utils/            # Utility functions
│   └── config/           # Configuration files
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── SECURITY.md          # Security guidelines
└── README.md            # This file
```

## Key Features Implementation 🎯

### Shopping Cart System
- ✅ Add/remove items with quantity controls
- ✅ Persistent cart using localStorage
- ✅ Real-time cart counter in header
- ✅ Cart synchronization across browser tabs

### User Authentication & Roles
- ✅ JWT-based authentication
- ✅ Role-based access control (Admin, Seller, Customer)
- ✅ Protected routes for each user type
- ✅ User profile management

### E-commerce Features
- ✅ Product catalog with categories
- ✅ Product detail pages with reviews
- ✅ Multi-step checkout process
- ✅ Order confirmation and tracking
- ✅ Customer profile management

### Payment Integration
- 🏗️ Stripe integration (in progress)
- 🏗️ PayPal integration (in progress)
- 🏗️ Algerian payment gateways (CIB/SATIM)
- ✅ Cash on delivery option

## Environment Variables Security 🔐

⚠️ **IMPORTANT SECURITY NOTES:**

- Never commit `.env` files to version control
- Use different API keys for development and production
- Store sensitive data in environment variables only
- See `SECURITY.md` for detailed security guidelines

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Algeria-Specific Features 🇩🇿

- **Currency**: Full DZD (Algerian Dinar) support with proper formatting
- **Languages**: Arabic (RTL), French, and English support
- **Payment**: Integration with local Algerian payment gateways
- **Shipping**: Support for Algerian postal codes and wilaya system
- **Tax**: Automatic 19% TVA calculation as per Algerian law
- **Localization**: Dates, numbers, and addresses formatted for Algeria

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

For support and questions:
- Email: support@algeriacommerce.dz
- Phone: +213 555 123 456
- GitHub Issues: [Create an issue](https://github.com/Soliperso/Algeria_eCommerce/issues)

## Acknowledgments 🙏

- Built with ❤️ for the Algerian e-commerce community
- Special thanks to all contributors
- Inspired by the growing digital economy in Algeria

---

**Happy coding! 🚀🇩🇿**
