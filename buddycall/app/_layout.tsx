import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, createContext, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

import { useColorScheme } from '@/hooks/useColorScheme';

// 認証情報と読み込み状態をアプリ全体で共有するための仕組み (Context)
const AuthContext = createContext<{ user: User | null; isLoading: boolean }>({
  user: null,
  isLoading: true,
});

// このフックを使って、アプリのどこからでもユーザー情報にアクセスできます
export function useAuth() {
  return useContext(AuthContext);
}

// アプリ全体をラップして、認証状態を提供するコンポーネント
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Firebaseの認証状態の変更を監視
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    // コンポーネントが不要になったら監視を解除
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // 認証状態が確定するまで、リダイレクトは実行しない
    if (isLoading) return;

    // ユーザーが未ログインで、かつ現在地がログイン画面ではない場合
    if (!user && pathname !== '/login') {
      // → /login に強制移動
      router.replace('/login');
    } 
    // ユーザーがログイン済みで、かつ現在地がログイン画面の場合
    else if (user && pathname === '/login') {
      // → メイン画面（トップページ）に強制移動
      router.replace('/');
    }
  }, [user, pathname, isLoading]);

  // 認証状態がわかるまでローディング画面を表示
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 認証状態が確定したら、現在のURLに応じた画面を表示
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // フォントが読み込まれるまで何も表示しない
  if (!loaded) {
    return null;
  }

  return (
    // AuthProviderでアプリ全体を囲み、認証状態をどこからでも利用できるようにする
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootLayoutNav />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
