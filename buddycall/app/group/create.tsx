import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { createGroup } from '../../lib/firebase/firestore';
import { Colors } from '../../constants/Colors';

const CreateGroupScreen = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateGroup = async () => {
    if (!name || !goal) {
      Alert.alert('エラー', 'グループ名と目標は必須です。');
      return;
    }
    if (!user) {
      Alert.alert('エラー', 'ログインしていません。');
      return;
    }

    setLoading(true);
    const { error } = await createGroup({ name, description, goal }, user);
    setLoading(false);

    if (error) {
      Alert.alert('エラー', 'グループの作成に失敗しました。');
    } else {
      Alert.alert('成功', 'グループを作成しました！');
      router.back(); // 前の画面に戻る
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>新しいグループを作成</Text>
        <TextInput
          style={styles.input}
          placeholder="グループ名"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="グループの説明 (任意)"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="共有の目標"
          value={goal}
          onChangeText={setGoal}
        />
        <Pressable style={styles.button} onPress={handleCreateGroup} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? '作成中...' : '作成する'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

// ログイン画面と似たスタイル
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  innerContainer: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default CreateGroupScreen;
