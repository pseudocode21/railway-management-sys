import jwtDecode from 'jwt-decode';

export function getUserFromToken(token) {
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  const user = getUserFromToken(token);
  if (!user || !user.exp) return true;
  return Date.now() >= user.exp * 1000;
}

export function getRole(token) {
  const user = getUserFromToken(token);
  return user?.role || null;
}