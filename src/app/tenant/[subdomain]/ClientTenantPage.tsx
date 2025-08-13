'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface ClientTenantPageProps {
  subdomain: string
}

const ClientTenantPage = ({ subdomain }: ClientTenantPageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [userCount, setUserCount] = useState(0)
  const [lastActivity, setLastActivity] = useState<string>('')

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Simulate fetching tenant data
    setUserCount(Math.floor(Math.random() * 1000) + 100)
    setLastActivity(new Date().toLocaleDateString())

    return () => clearTimeout(timer)
  }, [subdomain])

  const handleRefresh = () => {
    setUserCount(Math.floor(Math.random() * 1000) + 100)
    setLastActivity(new Date().toLocaleDateString())
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {subdomain}...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to {subdomain}
            </h1>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Data
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600">
              This is your tenant dashboard. You can access your specific features and data here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link 
              href={`/tenant/${subdomain}/dashboard`}
              className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-blue-900">Dashboard</h3>
              <p className="text-blue-700">View your analytics and overview</p>
            </Link>
            
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
              <p className="text-gray-700">Configure your tenant preferences</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Quick Stats</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Users:</span> {userCount}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Last Activity:</span> {lastActivity}
                </p>
              </div>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left text-sm text-purple-700 hover:text-purple-900">
                  • Manage Users
                </button>
                <button className="w-full text-left text-sm text-purple-700 hover:text-purple-900">
                  • View Reports
                </button>
                <button className="w-full text-left text-sm text-purple-700 hover:text-purple-900">
                  • Configure Settings
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tenant Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Subdomain</p>
                <p className="font-medium">{subdomain}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Access URL</p>
                <p className="font-medium">{subdomain}.localhost:3000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-green-600">Active</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientTenantPage
