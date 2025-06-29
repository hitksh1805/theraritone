# RARITONE - AI-Powered Fashion Platform

## Project Overview

RARITONE is India's premier AI-powered fashion platform that revolutionizes the way people shop for clothing. Our innovative body scanning technology ensures perfect-fit fashion for every customer.

## Features

- **AI Body Scanning**: Advanced computer vision technology for accurate body measurements
- **Perfect Fit Recommendations**: AI-powered size recommendations based on your unique measurements
- **Premium Fashion Collection**: Curated selection of high-quality fashion items
- **Virtual Try-On**: Experience how clothes look on you before purchasing
- **Personalized Shopping**: AI-driven style recommendations based on your preferences
- **Seamless Shopping Experience**: Modern, responsive web interface with smooth animations

## Technology Stack

This project is built with modern web technologies:

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Animations**: Framer Motion for smooth interactions
- **Backend**: Firebase for authentication and data storage
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: React Context API
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd raritone-fashion-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── Navbar.tsx      # Navigation component
│   ├── ProductCard.tsx # Product display component
│   └── ...
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Page components
└── styles/             # Global styles and Tailwind config
```

## Key Features

### AI Body Scanning
- Uses device camera for real-time body measurement
- Processes data locally for privacy
- Provides accurate size recommendations

### Product Catalog
- Responsive grid layout
- Advanced filtering and search
- Real-time inventory management
- Wishlist functionality

### User Experience
- Smooth animations and transitions
- Mobile-first responsive design
- Dark theme with custom color palette
- Accessibility-focused design

### Shopping Features
- Shopping cart with persistent storage
- User authentication with Firebase
- Order history and tracking
- Customer support chat

## Design System

RARITONE uses a custom design system with:
- **Primary Colors**: Custom green palette (#697565, #3C3D37, #181C14, #ECDFCC)
- **Typography**: Inter and Poppins font families
- **Spacing**: 8px grid system
- **Components**: Consistent design patterns across all UI elements

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software owned by RARITONE Fashion Technologies Pvt. Ltd.

## Contact

- **Website**: [raritone.in](https://raritone.in)
- **Email**: hello@raritone.in
- **Support**: support@raritone.in
- **Phone**: +91 98765 43210

---

© 2025 RARITONE Fashion Technologies Pvt. Ltd. All rights reserved.