import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isVip: boolean;
  vipExpiry?: string;
  isAdmin?: boolean;
};

type AppContextType = {
  user: User | null;
  isLoggedIn: boolean;
  loginModalOpen: boolean;
  loginTab: 'login' | 'register';
  vipModalOpen: boolean;
  openLogin: (tab?: 'login' | 'register') => void;
  closeLogin: () => void;
  openVip: () => void;
  closeVip: () => void;
  login: (user: User) => void;
  logout: () => void;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginTab, setLoginTab] = useState<'login' | 'register'>('login');
  const [vipModalOpen, setVipModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('film_user');
    if (stored) setUser(JSON.parse(stored));

    const users: any[] = JSON.parse(localStorage.getItem('film_users') || '[]');
    if (!users.find((u: any) => u.id === 'admin001')) {
      users.unshift({
        id: 'admin001',
        name: 'ADMINISTRATOR',
        email: 'admin@filmilebluo.com',
        phone: '0000000000',
        password: 'admin123',
        isVip: true,
        isAdmin: true,
        joinedAt: new Date().toISOString(),
        status: 'active',
      });
      localStorage.setItem('film_users', JSON.stringify(users));
    }
  }, []);

  const login = (u: User) => {
    setUser(u);
    localStorage.setItem('film_user', JSON.stringify(u));
    setLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('film_user');
  };

  return (
    <AppContext.Provider value={{
      user,
      isLoggedIn: !!user,
      loginModalOpen,
      loginTab,
      vipModalOpen,
      openLogin: (tab = 'login') => { setLoginTab(tab); setLoginModalOpen(true); },
      closeLogin: () => setLoginModalOpen(false),
      openVip: () => setVipModalOpen(true),
      closeVip: () => setVipModalOpen(false),
      login,
      logout,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
