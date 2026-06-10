'use client'

import { useEffect, useState } from 'react'
import { RequireRole } from '@/components/auth/require-role'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, Mail, Phone, User, Filter, Check, X, Clock3 } from 'lucide-react'
import { ROLES } from '@/lib/constants'

interface Booking {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  date: string
  time: string
  service_type: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  message?: string
  created_at: string
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all')

  useEffect(() => {
    fetchBookings()
  }, [])

  useEffect(() => {
    if (filter === 'all') {
      setFilteredBookings(bookings)
    } else {
      setFilteredBookings(bookings.filter(b => b.status === filter))
    }
  }, [filter, bookings])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/bookings')
      if (!response.ok) throw new Error('Failed to fetch bookings')
      const data = await response.json()
      setBookings(data.bookings || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b))
      }
    } catch (error) {
      console.error('Error updating booking:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'confirmed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock3 className="w-4 h-4" />
      case 'confirmed':
        return <Check className="w-4 h-4" />
      case 'completed':
        return <Check className="w-4 h-4" />
      case 'cancelled':
        return <X className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <RequireRole allowedRoles={[ROLES.CEO, ROLES.ADMIN]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Consultation Bookings</h1>
            <p className="text-gray-400">Manage all customer consultation bookings and meetings</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Bookings', value: bookings.length, color: 'from-blue-500/10' },
              { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'from-yellow-500/10' },
              { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: 'from-green-500/10' },
              { label: 'This Month', value: bookings.filter(b => new Date(b.created_at).getMonth() === new Date().getMonth()).length, color: 'from-purple-500/10' },
            ].map((stat, i) => (
              <Card key={i} className={`bg-gradient-to-br ${stat.color} to-transparent border-blue-500/20`}>
                <CardContent className="p-6">
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map(status => (
              <Button
                key={status}
                onClick={() => setFilter(status)}
                variant={filter === status ? 'default' : 'outline'}
                className={filter === status ? 'bg-blue-600' : 'border-white/20 text-gray-300 hover:bg-white/10'}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>

          {/* Bookings List */}
          {loading ? (
            <div className="text-center text-gray-400">Loading bookings...</div>
          ) : filteredBookings.length === 0 ? (
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardContent className="p-12 text-center">
                <p className="text-gray-400">No bookings found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredBookings.map(booking => (
                <Card key={booking.id} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start mb-6">
                      {/* Customer Info */}
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Customer</p>
                        <p className="text-white font-semibold flex items-center gap-2">
                          <User className="w-4 h-4" /> {booking.name}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">{booking.company || 'No company'}</p>
                      </div>

                      {/* Contact Info */}
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Contact</p>
                        <p className="text-white flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4" /> {booking.email}
                        </p>
                        {booking.phone && (
                          <p className="text-white flex items-center gap-2">
                            <Phone className="w-4 h-4" /> {booking.phone}
                          </p>
                        )}
                      </div>

                      {/* Booking Details */}
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Scheduled</p>
                        <p className="text-white flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4" /> {new Date(booking.date).toLocaleDateString()}
                        </p>
                        <p className="text-white flex items-center gap-2">
                          <Clock className="w-4 h-4" /> {booking.time}
                        </p>
                      </div>

                      {/* Status */}
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Status</p>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </div>
                      </div>
                    </div>

                    {/* Service & Message */}
                    <div className="mb-6 p-4 bg-white/5 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Service Type</p>
                      <p className="text-white font-medium mb-4">{booking.service_type}</p>
                      {booking.message && (
                        <>
                          <p className="text-gray-400 text-sm mb-1">Message</p>
                          <p className="text-gray-300">{booking.message}</p>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-wrap">
                      {booking.status !== 'confirmed' && (
                        <Button
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                        >
                          <Check className="w-4 h-4 mr-1" /> Confirm
                        </Button>
                      )}
                      {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                        <Button
                          onClick={() => updateBookingStatus(booking.id, 'completed')}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          size="sm"
                        >
                          <Check className="w-4 h-4 mr-1" /> Complete
                        </Button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <Button
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          className="bg-red-600 hover:bg-red-700 text-white"
                          size="sm"
                        >
                          <X className="w-4 h-4 mr-1" /> Cancel
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </RequireRole>
  )
}
