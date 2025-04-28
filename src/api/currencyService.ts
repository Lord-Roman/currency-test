const API_URL = 'https://status.neuralgeneration.com/api/currency'
const CACHE_TTL = 10 * 60 * 1000

type CurrencyRates = {
  [currency: string]: number
}

let cachedRates: CurrencyRates | null = null
let lastFetchTime: number = 0

export const fetchRates = async (): Promise<CurrencyRates> => {
  // Возвращаем кеш, если он актуален
  if (cachedRates && Date.now() - lastFetchTime < CACHE_TTL) {
    return cachedRates
  }

  try {
    const response: Response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: unknown = await response.json()

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid API response format')
    }

    cachedRates = data as CurrencyRates
    lastFetchTime = Date.now()

    return cachedRates
  } catch (error) {
    console.error('Currency API error:', error)

    // Fallback: возвращаем кеш даже если он устарел
    if (cachedRates) {
      console.warn('Using cached rates due to API failure')
      return cachedRates
    }

    // Если кеша нет, кидаем ошибку дальше
    throw new Error('Failed to fetch currency rates')
  }
}

export type { CurrencyRates }
