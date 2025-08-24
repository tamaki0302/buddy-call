import { Timestamp } from 'firebase/firestore';

// 既存の型定義に加えて、Group型を追加します。
// ファイルが空の場合は、この内容をそのまま記述してください。

export interface Group {
  id: string; // FirestoreのドキュメントID
  name: string;
  description: string;
  goal: string;
  memberIds: string[]; // 参加しているユーザーのIDリスト
  createdBy: string; // 作成者のユーザーID
  createdAt: Timestamp;
}
export interface UserProfile {
  id: string; // FirestoreのドキュメントID
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}