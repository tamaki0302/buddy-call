import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../contexts/AuthContext'; // 作成したAuthProviderをインポート
import { useEffect } from 'react';
import { router } from 'expo-router';

const RootLayout = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // ロード中は処理しない

    if (user) {
      // ユーザーがログインしている場合、(tabs)内のホーム画面にリダイレクト
      router.replace('/(tabs)');
    } else {
      // ユーザーがログインしていない場合、ログイン画面にリダイレクト
      router.replace('/login');
    }
  }, [user, loading]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function AppLayout() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );  
};
