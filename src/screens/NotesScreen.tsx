import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const NotesScreen: React.FC = () => {
  const [note, setNote] = useState<string>('');
  const [notes, setNotes] = useState<Array<{ id: string, text: string }>>([]);

  // useEffect(() => {
  //   const unsubscribe = firestore()
  //     .collection('notes')
  //     .onSnapshot(querySnapshot => {
  //       const notesArray = querySnapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       })) as Array<{ id: string, text: string }>;
  //       setNotes(notesArray);
  //     });

  //   return () => unsubscribe();
  // }, []);

  const addNote = async () => {
    if (note.trim()) {
      await firestore().collection('notes').add({
        text: note,
        createdAt: firestore.FieldValue.serverTimestamp()
      });
      setNote('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notes Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Write a note"
        value={note}
        onChangeText={setNote}
      />
      <Button title="Add Note" onPress={addNote} />
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.noteText}>{item.text}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default NotesScreen;
