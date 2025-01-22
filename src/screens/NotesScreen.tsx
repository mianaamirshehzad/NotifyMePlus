import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const NotesScreen: React.FC = () => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     const unsubscribe = firestore()
    //         .collection('messages')
    //         .onSnapshot((querySnapshot) => {
    //             const messagesList: Array<{ id: string; text: string }> = [];
    //             querySnapshot.forEach((doc) => {
    //                 messagesList.push({
    //                     id: doc.id,
    //                     text: doc.data().text,
    //                 });
    //             });
    //             setMessages(messagesList);
    //         });

    //     return () => unsubscribe();
    // }, []);

    const sendMessage = async () => {
        if (text.trim()) {
            try {
                await firestore().collection('messages').add({
                    text: text.trim(),
                    createdAt: firestore.FieldValue.serverTimestamp(),
                });
                setText('');
            } catch (error) {
                console.error('Error sending message: ', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Firestore Chat</Text>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.message}>
                        <Text>{item.text}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                placeholder="Type a message"
                value={text}
                onChangeText={setText}
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    message: {
        padding: 8,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
});

export default NotesScreen;
