import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { subscribeToUserGroups } from '../../lib/firebase/firestore';
import { Group } from '../../types';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const GroupListScreen = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // ユーザーのグループを購読
    const unsubscribe = subscribeToUserGroups(user.uid, (fetchedGroups) => {
      setGroups(fetchedGroups);
      setLoading(false);
    });

    // スクリーンがアンマウントされる時に購読を停止
    return () => unsubscribe();
  }, [user]);

  const renderGroupItem = ({ item }: { item: Group }) => (
    <Pressable style={styles.groupItem}>
      <Text style={styles.groupName}>{item.name}</Text>
      <Text style={styles.groupGoal}>{item.goal}</Text>
    </Pressable>
  );

  if (loading) {
    return <View style={styles.container}><Text>読み込み中...</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={groups}
        renderItem={renderGroupItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>参加中のグループ</Text>
            <Pressable onPress={() => router.push('/group/create')}>
              <FontAwesome name="plus-circle" size={30} color={Colors.light.tint} />
            </Pressable>
          </View>
        }
        ListEmptyComponent={<Text style={styles.emptyText}>まだグループに参加していません。</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  title: { fontSize: 28, fontWeight: 'bold' },
  groupItem: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  groupName: { fontSize: 18, fontWeight: 'bold' },
  groupGoal: { fontSize: 14, color: 'gray', marginTop: 4 },
  emptyText: { textAlign: 'center', marginTop: 50, color: 'gray' },
});

export default GroupListScreen;
