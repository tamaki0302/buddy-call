import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // サインイン（ログイン）処理
  const handleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // ログイン処理を実行するだけ。画面遷移のコードは削除。
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error(error);
      Alert.alert('ログイン失敗', 'メールアドレスかパスワードが間違っています。');
    } finally {
      setLoading(false);
    }
  };

  // サインアップ（新規登録）処理
  const handleSignUp = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('登録成功', 'アカウントを作成しました。続けてログインしてください。');
    } catch (error: any) {
      console.error(error);
      Alert.alert('登録失敗', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BuddyCall</Text>

      <TextInput
        style={styles.input}
        placeholder="メールアドレス"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <>
          <Pressable style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>ログイン</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.subButton]} onPress={handleSignUp}>
            <Text style={[styles.buttonText, styles.subButtonText]}>新規登録</Text>
          </Pressable>
        </>
      )}
      
      <Link href="/(tabs)" asChild>
        <Pressable style={styles.guestButton}>
            <Text style={styles.guestButtonText}>ゲストとして続ける</Text>
        </Pressable>
      </Link>
    </View>
  );
}

// --- スタイル定義（変更なし） ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#1D1D1F',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  subButtonText: {
    color: '#007AFF',
  },
  guestButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  guestButtonText: {
    color: '#6E6E73',
    fontSize: 14,
  }
});
