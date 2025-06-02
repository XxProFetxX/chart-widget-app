import type { CryptoOption } from '../domain/CryptoOption';

export async function fetchCryptoList(): Promise<CryptoOption[]> {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/list');

  if (!response.ok) {
    throw new Error('Error al cargar la lista de criptomonedas');
  }

  const data = await response.json();
  return data as CryptoOption[];
}
