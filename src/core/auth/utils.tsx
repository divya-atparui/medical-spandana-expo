import { getItem, removeItem, setItem } from '@/core/storage';

const TOKEN = 'token';

export type TokenType = {
  access: string;
  refreshInterval: number;
};

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);
