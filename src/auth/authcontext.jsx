import { createContext, useContext, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const user = useMemo(() => {
    if (!token) return null;
    try {
      const payload = jwtDecode(token); // { sub, email, is_staff, exp, ... }
      if (payload.exp * 1000 < Date.now()) return null; // expired
      return { id: payload.sub, email: payload.email, is_staff: payload.is_staff };
    } catch {
      return null;
    }
  }, [token]);

  function login(nextToken) {
    localStorage.setItem("token", nextToken);
    setToken(nextToken);
  }
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthCtx.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
