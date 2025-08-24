import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase/config'; // ステップ1で作成したconfigファイルをインポート

// Contextの型定義
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// Contextを作成
const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

// Contextを提供するProviderコンポーネント
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChangedで認証状態の変更を監視
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // クリーンアップ関数
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// Contextを簡単に利用するためのカスタムフック
export const useAuth = () => {
  return useContext(AuthContext);
};