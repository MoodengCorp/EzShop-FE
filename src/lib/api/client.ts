const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';


type FetchOptions = RequestInit & {
  token?: string
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options



  const headers = new Headers(fetchOptions.headers);

  // 기본 헤더 설정 (이미 있으면 덮어쓰지 않음)
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  // 토큰이 있으면 추가
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    ...fetchOptions,
    headers,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}