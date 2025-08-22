import { Redirect } from 'expo-router';

// アプリの開始地点となるコンポーネント
export default function Index() {
  // このページが開かれたら、すぐに'/login'ページに移動（リダイレクト）する
  return <Redirect href="/login" />;
}
