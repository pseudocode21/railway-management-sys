import { useEffect, useState } from 'react';
import { getUserFromToken, isTokenExpired } from '../../utils/jwt';

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token && !isTokenExpired(token)) {
      setUser(getUserFromToken(token));
    } else {
      setUser(null);
    }
  }, []);

  return user;
}