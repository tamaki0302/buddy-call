import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from './config'; // 初期化済みのdbインスタンスをインポート
import { Group } from '../../types'; // ステップ1で作成した型をインポート

/**
 * 新しいグループを作成する関数
 * @param groupData グループ名など
 * @param user 作成者
 * @returns {Promise<{id: string | null, error: Error | null}>} 作成されたグループのIDまたはエラー
 */
export const createGroup = async (groupData: { name: string; description: string; goal: string }, user: { uid: string }) => {
  try {
    const docRef = await addDoc(collection(db, 'groups'), {
      ...groupData,
      createdBy: user.uid,
      memberIds: [user.uid], // 作成者を最初のメンバーとして追加
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    console.error("Error creating group: ", error);
    return { id: null, error: error as Error };
  }
};

/**
 * ユーザーが所属するグループをリアルタイムで購読する関数
 * @param userId ユーザーのID
 * @param callback グループのリストを処理するコールバック関数
 * @returns {() => void} 購読を停止するためのアンサブスクライブ関数
 */
export const subscribeToUserGroups = (userId: string, callback: (groups: Group[]) => void) => {
  const groupsRef = collection(db, 'groups');
  const q = query(groupsRef, where('memberIds', 'array-contains', userId));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const groups: Group[] = [];
    querySnapshot.forEach((doc: DocumentData) => {
      groups.push({ id: doc.id, ...doc.data() } as Group);
    });
    callback(groups);
  }, (error) => {
    console.error("Error fetching groups: ", error);
  });

  return unsubscribe; // 購読を停止する関数を返す
};
