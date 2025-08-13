# Multi-Tenant Next.js Application

A modern, scalable multi-tenant web application built with Next.js that automatically routes users to tenant-specific content based on subdomains.

## 🏗️ Architecture Overview

This application implements a **subdomain-based multi-tenancy** system where each tenant gets their own subdomain (e.g., `tenant1.yourdomain.com`). The middleware automatically routes requests to the appropriate tenant routes while maintaining clean, user-friendly URLs.

### Key Features

- **Automatic Subdomain Detection**: No configuration needed - works with any domain
- **Secure Routing**: Tenant routes are only accessible through their subdomains
- **Clean URLs**: Users see `tenant1.yourdomain.com/dashboard` instead of `/tenant/tenant1/dashboard`
- **Dynamic Link Generation**: Automatically generates tenant URLs based on current domain
- **Production Ready**: Works seamlessly in development and production environments

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kingjohneycodey/multi-tenant.git
   cd multi-tenancy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 How It Works

### Subdomain Routing

The application uses Next.js middleware to automatically route subdomain requests:

- **`john.localhost:3000/`** → Serves content from `/tenant/john`
- **`john.localhost:3000/dashboard`** → Serves content from `/tenant/john/dashboard`
- **`localhost:3000/`** → Serves the main application (no tenant)

### URL Rewriting

The middleware internally rewrites URLs while keeping the browser URL clean:

```
User visits: john.localhost:3000/dashboard
Internal route: /tenant/john/dashboard
Browser shows: john.localhost:3000/dashboard
```

### Security Features

- Direct access to `/tenant/*` routes is blocked from the root domain
- Tenant routes are only accessible through their respective subdomains
- Static files and API routes bypass the middleware for performance

## 📁 Project Structure

```
src/
├── app/
│   ├── tenant/
│   │   └── [subdomain]/
│   │       ├── page.tsx          # Tenant home page
│   │       └── dashboard/
│   │           └── page.tsx      # Tenant dashboard
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page with tenant links
├── middleware.ts                  # Subdomain routing logic
└── globals.css                   # Global styles
```

## 🔧 Configuration

### Environment Variables (Optional)

**Note**: The application automatically detects domains and doesn't require configuration in most cases.

### Customizing Tenant Routes

Add new tenant routes by creating files in `src/app/tenant/[subdomain]/`:

```
src/app/tenant/[subdomain]/
├── page.tsx              # /tenant/[subdomain]
├── dashboard/
│   └── page.tsx          # /tenant/[subdomain]/dashboard
├── settings/
│   └── page.tsx          # /tenant/[subdomain]/settings
└── users/
    └── page.tsx          # /tenant/[subdomain]/users
```

## 🧪 Testing

### Local Development

1. **Test main application**: Visit `http://localhost:3000`
2. **Test tenant routes**: Visit `http://john.localhost:3000/dashboard`
3. **Test security**: Try `http://localhost:3000/tenant/john/dashboard` (should redirect)

### Available Test Tenants

The home page includes links to test different tenants:
- Test Tenant: `http://test.localhost:3000/dashboard`
- John Tenant: `http://john.localhost:3000/dashboard`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy - the middleware will automatically work with your custom domain

### Other Platforms

The application works with any hosting platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted servers

### Custom Domain Setup

1. Add your domain to your hosting platform
2. Set up DNS records pointing to your hosting provider
3. The middleware will automatically detect your domain and route subdomains

## 🔒 Security Considerations

- **Tenant Isolation**: Each tenant's routes are completely isolated
- **URL Protection**: Direct access to tenant routes is blocked
- **Middleware Security**: Only necessary routes are processed by middleware
- **Static Asset Protection**: Static files bypass tenant routing for performance

## 🛠️ Development

### Adding New Features

1. **New Tenant Routes**: Add files in `src/app/tenant/[subdomain]/`
2. **Global Features**: Add files in `src/app/`
3. **Middleware Logic**: Modify `src/middleware.ts`

### Debugging

The middleware includes console logging to help debug routing issues:

```typescript
console.log(`Middleware - Host: ${host}, Pathname: ${pathname}, Subdomain: ${subdomain}`);
```

### Testing Middleware Changes

1. Modify `src/middleware.ts`
2. Restart your development server
3. Test with different subdomains
4. Check console logs for debugging information

## 📚 API Reference

### Middleware Functions

#### `extractSubdomain(request: NextRequest): string | null`

Extracts the subdomain from the request hostname.

**Parameters:**
- `request`: Next.js request object

**Returns:**
- `string`: The subdomain (e.g., "john")
- `null`: If no subdomain is detected

#### `middleware(request: NextRequest): NextResponse`

Main middleware function that handles subdomain routing.

**Parameters:**
- `request`: Next.js request object

**Returns:**
- `NextResponse.rewrite()`: For tenant routes
- `NextResponse.next()`: For non-tenant routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the console logs for debugging information
2. Verify your domain configuration
3. Ensure Next.js version compatibility
4. Open an issue on GitHub with detailed information

## 🔮 Future Enhancements

- [ ] Database integration for tenant data
- [ ] User authentication and authorization
- [ ] Tenant-specific themes and branding
- [ ] API rate limiting per tenant
- [ ] Tenant analytics and monitoring
- [ ] Multi-region deployment support

---

Built with ❤️ using Next.js and TypeScript
