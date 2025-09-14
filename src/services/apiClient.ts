const API_BASE = import.meta.env.VITE_API_BASE as string;
const API_TOKEN = import.meta.env.VITE_API_TOKEN as string;

export async function apiClient<T>(path: string, config: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
      ...(config.headers || {}),
    },
    ...config,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || 'API Error');
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}
