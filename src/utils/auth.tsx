// utils/auth.ts

import cookies from 'js-cookie';

export const isAuthenticated = (): boolean => {
  const token = cookies.get('token'); // Assuming you store the JWT in a cookie named 'token'
  return !!token;
};
