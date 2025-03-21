import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { query } = body

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    const apiKey = process.env.GEOAPIFY_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing Geoapify API key' },
        { status: 500 }
      )
    }

    const geoapifyUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      query
    )}&lang=en&apiKey=${apiKey}`

    const response = await fetch(geoapifyUrl)

    if (!response.ok) {
      console.error('Geoapify API Error:', await response.text())
      return NextResponse.json(
        { error: 'Failed to fetch suggestions' },
        { status: 500 }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching Geoapify suggestions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    )
  }
}
