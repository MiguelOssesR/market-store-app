import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button, KeyboardAvoidingView} from 'react-native'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth'

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Cuenta creada correctamente, revisa el nuevo registro creado en Firebase')
        } catch (error: any) {
            console.log(error);
            alert('Fallo la creación de usuario ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <Text>Crear nueva cuenta</Text>
                <TextInput value={email} style={styles.input} placeholder='Correo electronico' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='Contraseña' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>
                <Button title='Crear cuenta' onPress={() => signUp()} />
            </KeyboardAvoidingView>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        paddingLeft: 10
    },
})