'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface ClientDashboardProps {
  subdomain: string
}

const ClientDashboard = ({ subdomain }: ClientDashboardProps) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSessions: 0,
    storageUsed: 0,
    storageTotal: 10
  })
  const [recentActivity, setRecentActivity] = useState<Array<{
    id: number
    type: string
    message: string
    time: string
    color: string
  }>>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and data fetching
    const timer = setTimeout(() => {
      setStats({
        totalUsers: Math.floor(Math.random() * 2000) + 500,
        activeSessions: Math.floor(Math.random() * 800) + 200,
        storageUsed: Math.random() * 8 + 1,
        storageTotal: 10
      })

      setRecentActivity([
        {
          id: 1,
          type: 'user',
          message: 'New user registration',
          time: '2 min ago',
          color: 'green'
        },
        {
          id: 2,
          type: 'file',
          message: 'File uploaded',
          time: '15 min ago',
          color: 'blue'
        },
        {
          id: 3,
          type: 'payment',
          message: 'Payment received',
          time: '1 hour ago',
          color: 'yellow'
        },
        {
          id: 4,
          type: 'system',
          message: 'System backup completed',
          time: '2 hours ago',
          color: 'purple'
        }
      ])

      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [subdomain])

  const handleRefreshStats = () => {
    setIsLoading(true)
    setTimeout(() => {
      setStats({
        totalUsers: Math.floor(Math.random() * 2000) + 500,
        activeSessions: Math.floor(Math.random() * 800) + 200,
        storageUsed: Math.random() * 8 + 1,
        storageTotal: 10
      })
      setIsLoading(false)
    }, 500)
  }

  const getActivityColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-500'
      case 'blue': return 'bg-blue-500'
      case 'yellow': return 'bg-yellow-500'
      case 'purple': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <Link 
            href={`/`}
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to {subdomain} Home
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              {subdomain} Dashboard
            </h1>
            <button
              onClick={handleRefreshStats}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Stats
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-sm text-gray-500">+12% from last month</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Sessions</h3>
            <p className="text-3xl font-bold text-green-600">{stats.activeSessions.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Currently online</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Storage Used</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.storageUsed.toFixed(1)} GB</p>
            <p className="text-sm text-gray-500">of {stats.storageTotal} GB available</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 ${getActivityColor(activity.color)} rounded-full`}></div>
                  <span className="text-sm text-gray-700">{activity.message}</span>
                  <span className="text-xs text-gray-500 ml-auto">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                <span className="text-blue-900 font-medium">Add New User</span>
              </button>
              <button className="w-full text-left p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                <span className="text-green-900 font-medium">Generate Report</span>
              </button>
              <button className="w-full text-left p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
                <span className="text-purple-900 font-medium">View Analytics</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tenant Information</h3>
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
              <p className="text-sm text-gray-500">Created</p>
              <p className="font-medium">January 2025</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-green-600">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientDashboard
