# tekvoro-org
# tekvoro-org

# Tekvoro Technologies Website

A modern, responsive website for Tekvoro Technologies showcasing AI solutions, cloud computing, and digital transformation services.

## Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **3D Scene Integration**: Interactive 3D models using Three.js
- **AI-Powered Search**: Intelligent search functionality with OpenAI integration
- **Admin Dashboard**: Comprehensive content management system
- **Marketing Tools**: Campaign management and analytics
- **SEO Optimized**: Meta tags, sitemap, and robots.txt
- **Accessibility**: WCAG compliant with keyboard navigation

## AI Search Functionality

The website includes an intelligent AI-powered search feature that provides contextual answers and suggestions.

### Development Mode
In development mode (`npm run dev`), the AI search uses mock responses to avoid API costs and configuration issues. You'll see:
- Mock AI responses with realistic delays
- Sample suggestions for related searches
- Console logs indicating development mode

### Production Mode
In production (deployed to Netlify), the AI search connects to OpenAI's API for real responses.

#### Setup for Production

1. **Get OpenAI API Key**:
   - Sign up at [OpenAI](https://platform.openai.com/)
   - Create an API key in your dashboard

2. **Configure Environment Variables**:
   - In your Netlify dashboard, go to Site Settings > Environment Variables
   - Add: `VITE_OPENAI_API_KEY` with your OpenAI API key
   - Or add: `OPENAI_API_KEY` as an alternative

3. **Deploy to Netlify**:
   - The Netlify function (`netlify/functions/ai-search.cjs`) will automatically handle AI requests
   - No additional configuration needed

#### How It Works

- **Search Bar**: Click the search icon in the navbar
- **Real-time Suggestions**: As you type, AI suggests related search terms
- **AI Answers**: Submit queries to get detailed, contextual responses
- **Voice Search**: Use voice input for hands-free searching (browser support required)

#### Fallback Mode

If no OpenAI API key is configured, the system provides helpful demo responses explaining what would be available with proper configuration.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd project

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Backend**: Netlify Functions
- **AI**: OpenAI GPT API
- **Deployment**: Netlify

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components and routing
- `src/data/` - Static data and content
- `netlify/functions/` - Serverless functions
- `public/` - Static assets and SEO files

## Admin Dashboard

Access the admin dashboard at `/admin` with demo credentials:
- **Username**: `admin`
- **Password**: `admin123`

### Features:
- Content management
- Analytics tracking
- Blog post editor
- Campaign management
- SEO tools
- Security settings

## Deployment

### Netlify (Recommended)

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables for AI search
5. Deploy!

### Other Platforms

The build output in `dist/` can be deployed to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Tekvoro Technologies Pvt Ltd.

## Support

For technical support or questions about the AI search functionality, please contact the development team.
