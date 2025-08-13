import Image from "next/image";

// Component to generate dynamic tenant links
function TenantLinks() {
  // Function to get current hostname
  const getCurrentHost = () => {
    if (typeof window !== 'undefined') {
      return window.location.hostname;
    }
    return 'localhost';
  };

  // Function to generate tenant URL
  const generateTenantUrl = (subdomain: string, path: string = '') => {
    const host = getCurrentHost();
    const protocol = typeof window !== 'undefined' ? window.location.protocol : 'http:';
    const port = typeof window !== 'undefined' ? window.location.port : '3000';
    
    if (host.includes('localhost')) {
      return `${protocol}//${subdomain}.localhost:${port}${path}`;
    }
    
    // For production domains
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'example.com';
    return `${protocol}//${subdomain}.${rootDomain}${path}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Tenant Examples:</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Test Tenant</h3>
          <p className="text-sm text-gray-600 mb-2">Access the test tenant dashboard</p>
          <a 
            href={generateTenantUrl('test', '/dashboard')}
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {generateTenantUrl('test', '/dashboard')}
          </a>
        </div>


        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">John Tenant</h3>
          <p className="text-sm text-gray-600 mb-2">Access John's tenant dashboard</p>
          <a 
            href={generateTenantUrl('john', '/dashboard')}
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {generateTenantUrl('john', '/dashboard')}
          </a>
        </div>

      </div>


      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-medium mb-2">Current Domain Info:</h3>
        <p className="text-sm text-gray-600">
          <strong>Hostname:</strong> {getCurrentHost()}<br />
          <strong>Protocol:</strong> {typeof window !== 'undefined' ? window.location.protocol : 'http:'}<br />
          <strong>Port:</strong> {typeof window !== 'undefined' ? window.location.port : '3000'}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Multi-Tenant Architecture Demo
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 mb-4">
            This application demonstrates a multi-tenant architecture where each tenant has their own subdomain.
            Click on any tenant link below to see how the routing works.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Each tenant gets their own subdomain (e.g., john.localhost:3000)</li>
            <li>The middleware automatically routes subdomain requests to the appropriate tenant</li>
            <li>Tenant routes are protected and only accessible through their subdomain</li>
            <li>Direct access to /tenant/... routes is blocked for security</li>
          </ul>
        </div>

        <TenantLinks />
      </div>
    </div>
  );
}
