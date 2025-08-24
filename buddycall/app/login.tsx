import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, SafeAreaView, Pressable } from 'react-native';
import { signInWithEmail, signUpWithEmail } from '../lib/firebase/auth'; // 作成した認証関数をインポート
import { Colors } from '../constants/Colors'; // 定義した色を使用

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // ログイン処理
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('エラー', 'メールアドレスとパスワードを入力してください。');
      return;
    }
    setLoading(true);
    const { error } = await signInWithEmail(email, password);
    if (error) {
      Alert.alert('ログインエラー', 'メールアドレスまたはパスワードが違います。');
    }
    // 成功時の画面遷移は app/_layout.tsx のリダイレクト処理に任せます
    setLoading(false);
  };

  // 新規登録処理
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('エラー', 'メールアドレスとパスワードを入力してください。');
      return;
    }
    setLoading(true);
    const { error } = await signUpWithEmail(email, password);
    if (error) {
      Alert.alert('登録エラー', 'このメールアドレスは既に使用されているか、形式が正しくありません。');
    }
    // 成功時の画面遷移も app/_layout.tsx が自動で行います
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Buddy Call</Text>
        <TextInput
          style={styles.input}
          placeholder="メールアドレス"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="パスワード"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#888"
        />
        <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? '処理中...' : 'ログイン'}</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.signUpButton]} onPress={handleSignUp} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? '...' : '新規登録'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: Colors.light.tint,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  signUpButton: {
    backgroundColor: '#5c6ac4',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
