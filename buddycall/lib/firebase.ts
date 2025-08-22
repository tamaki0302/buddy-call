// lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// あなたのWebアプリのFirebase設定
const firebaseConfig = {
  apiKey: "AIzaSyBq6yTwHJKa3fgRcb4Eb7f5IbdlHW28wqE",
  authDomain: "buddycall-95d6c.firebaseapp.com",
  projectId: "buddycall-95d6c",
  storageBucket: "buddycall-95d6c.appspot.com",
  messagingSenderId: "395036853113",
  appId: "1:395036853113:web:6c7cfa663d6020003ba5a8",
  measurementId: "G-73C5E93KMW"
};

// Firebaseが既に初期化されているかを確認し、されていなければ初期化する
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// 各サービスを初期化してエクスポート
export const auth = getAuth(app); // ← この export が重要です！
export const db = getFirestore(app);

export default app;