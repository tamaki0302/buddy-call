import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  AuthError,
} from 'firebase/auth';
import { auth } from './config'; // 初期化済みのauthインスタンスをインポート

/**
 * メールアドレスとパスワードで新規登録を行う関数
 * @param email ユーザーのメールアドレス
 * @param password ユーザーのパスワード
 * @returns {Promise<{user: User | null, error: AuthError | null}>} ユーザー情報またはエラーオブジェクト
 */
export const signUpWithEmail = async (email: string, password: string): Promise<{ user: User | null; error: AuthError | null; }> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // 登録成功
    console.log('User signed up:', userCredential.user.email);
    return { user: userCredential.user, error: null };
  } catch (error) {
    // 登録失敗
    console.error('Sign up error:', error);
    return { user: null, error: error as AuthError };
  }
};

/**
 * メールアドレスとパスワードでログインを行う関数
 * @param email ユーザーのメールアドレス
 * @param password ユーザーのパスワード
 * @returns {Promise<{user: User | null, error: AuthError | null}>} ユーザー情報またはエラーオブジェクト
 */
export const signInWithEmail = async (email: string, password: string): Promise<{ user: User | null; error: AuthError | null; }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // ログイン成功
    console.log('User signed in:', userCredential.user.email);
    return { user: userCredential.user, error: null };
  } catch (error) {
    // ログイン失敗
    console.error('Sign in error:', error);
    return { user: null, error: error as AuthError };
  }
};

/**
 * ログアウトを行う関数
 */
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    // ログアウト成功
    console.log('User signed out');
  } catch (error) {
    // ログアウト失敗
    console.error('Sign out error:', error);
  }
};
