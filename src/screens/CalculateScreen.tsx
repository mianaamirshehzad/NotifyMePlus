 import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet } from 'react-native';

const CalculateScreen: React.FC = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('addition');
    const [result, setResult] = useState(null);

    const calculate = () => {
        let res: number;
        const number1 = Number(num1);
        const number2 = Number(num2);

        switch (operation) {
            case 'addition':
                res = number1 + number2;
                break;
            case 'subtraction':
                res = number1 - number2;
                break;
            case 'multiplication':
                res = number1 * number2;
                break;
            default:
                res = 0;
                break;
        }

        setResult(res);
        console.log('Result:', res);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Simple Calculator</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter first number"
                keyboardType="numeric"
                value={num1}
                onChangeText={setNum1}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter second number"
                keyboardType="numeric"
                value={num2}
                onChangeText={setNum2}
            />
            <Picker
                selectedValue={operation}
                style={styles.picker}
                onValueChange={(itemValue) => setOperation(itemValue)}>
                <Picker.Item label="Addition" value="addition" />
                <Picker.Item label="Subtraction" value="subtraction" />
                <Picker.Item label="Multiplication" value="multiplication" />
            </Picker>
            <Button title="Calculate" onPress={calculate} />
            {result !== null && (
                <Text style={styles.result}>Result: {result}</Text>
            )}
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
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 12,
    },
    result: {
        marginTop: 20,
        fontSize: 20,
        textAlign: 'center',
    },
});

export default CalculateScreen;
