
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const url = new URL(req.url)
    const path = url.pathname
    const method = req.method

    console.log(`Admin API: ${method} ${path}`)

    // Products endpoints
    if (path === '/admin-api/products') {
      if (method === 'GET') {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            categories (name),
            product_variants (*)
          `)
          .order('created_at', { ascending: false })

        if (error) throw error
        return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      if (method === 'POST') {
        const body = await req.json()
        const { data, error } = await supabase
          .from('products')
          .insert(body)
          .select()
          .single()

        if (error) throw error
        return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }
    }

    // Categories endpoints
    if (path === '/admin-api/categories') {
      if (method === 'GET') {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      if (method === 'POST') {
        const body = await req.json()
        const { data, error } = await supabase
          .from('categories')
          .insert(body)
          .select()
          .single()

        if (error) throw error
        return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }
    }

    // Orders endpoints
    if (path === '/admin-api/orders') {
      if (method === 'GET') {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              *,
              products (name)
            )
          `)
          .order('created_at', { ascending: false })

        if (error) throw error
        return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }
    }

    // Update order status
    if (path.startsWith('/admin-api/orders/') && path.endsWith('/status') && method === 'PATCH') {
      const orderId = path.split('/')[3]
      const body = await req.json()
      
      const { data, error } = await supabase
        .from('orders')
        .update({ status: body.status })
        .eq('id', orderId)
        .select()
        .single()

      if (error) throw error
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Admin stats
    if (path === '/admin-api/stats') {
      const [productsResult, ordersResult, revenueResult] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact' }),
        supabase.from('orders').select('id', { count: 'exact' }),
        supabase.from('financial_transactions').select('amount').eq('transaction_type', 'sale')
      ])

      const pendingOrders = await supabase
        .from('orders')
        .select('id', { count: 'exact' })
        .eq('status', 'pending')

      const totalRevenue = revenueResult.data?.reduce((sum, t) => sum + Number(t.amount), 0) || 0

      const stats = {
        total_products: productsResult.count || 0,
        total_orders: ordersResult.count || 0,
        total_revenue: totalRevenue,
        pending_orders: pendingOrders.count || 0
      }

      return new Response(JSON.stringify(stats), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders })

  } catch (error) {
    console.error('Admin API Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
