'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, getBookingConfirmationEmail, getAdminNotificationEmail } from '@/lib/email/service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, date, time, timezone, serviceType, budget, message } = body

    // Validate required fields
    if (!name || !email || !date || !time || !serviceType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {}
          },
        },
      }
    )

    // Insert booking into database
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          name,
          email,
          company: company || null,
          phone: phone || null,
          date,
          time,
          timezone: timezone || 'UTC',
          service_type: serviceType,
          budget: budget || null,
          message: message || null,
          status: 'pending',
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Booking creation error:', error)
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      )
    }

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: 'Your consultation has been booked - AJEx Tech Empire',
      html: getBookingConfirmationEmail(name, date, time, serviceType),
    })

    // Send notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || '',
      subject: `New Booking: ${name}`,
      html: getAdminNotificationEmail('booking', {
        'Name': name,
        'Email': email,
        'Company': company || 'Not provided',
        'Phone': phone || 'Not provided',
        'Service Type': serviceType,
        'Date': new Date(date).toLocaleDateString(),
        'Time': time,
        'Timezone': timezone || 'UTC',
        'Budget': budget || 'Not specified',
        'Message': message ? message.substring(0, 100) + (message.length > 100 ? '...' : '') : 'None',
      }),
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Booking submitted successfully',
        booking: data,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {}
          },
        },
      }
    )

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch all bookings (admin only)
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Fetch bookings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
