import { createContext, useContext, useState } from "react";
import type { User } from "../types/User";

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  isVet: boolean;
  isOwner: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (userData: User) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        isVet: user?.role === "veterinary",
        isOwner: user?.role === "owner",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
