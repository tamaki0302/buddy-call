import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext'; // 認証状態を取得するフック
import { signOutUser } from '../../lib/firebase/auth'; // ログアウト関数

const HomeScreen = () => {
  const { user } = useAuth(); // AuthContextからユーザー情報を取得

  const handleLogout = async () => {
    await signOutUser();
    // ログアウト後の画面遷移は app/_layout.tsx のリダイレクト処理に任せます
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>ホーム画面</Text>
        {user ? (
          <Text style={styles.emailText}>ようこそ, {user.email} さん</Text>
        ) : (
          <Text>ログインしていません</Text>
        )}
        <Button title="ログアウト" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default HomeScreen;