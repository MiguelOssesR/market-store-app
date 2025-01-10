import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_FIRESTORE } from '../../FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { Checkbox } from 'expo-checkbox';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSeller, setIsSeller] = useState(true);
    const [isBuyer, setIsBuyer] = useState(false);
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signUp = async () => {
        setLoading(true);
        try {
            // Crear usuario en Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Guardar información adicional en Firestore
            await setDoc(doc(FIREBASE_FIRESTORE, "users", user.uid), {

                name: name,
                role: isSeller ? 'Vendedor' : 'Comprador', // Asignar el rol seleccionado
                email: email
            });

            alert('Cuenta creada correctamente, revisa el nuevo registro creado en Auth y en Firestore');
        } catch (error: any) {
            console.log(error);
            alert('Fallo la creación de usuario: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <Text style={styles.title}>Crear nueva cuenta</Text>
                <TextInput
                    value={name}
                    style={styles.input}
                    placeholder='Nombre'
                    autoCapitalize='words'
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    value={email}
                    style={styles.input}
                    placeholder='Correo electrónico'
                    autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    secureTextEntry={true}
                    value={password}
                    style={styles.input}
                    placeholder='Contraseña'
                    autoCapitalize='none'
                    onChangeText={(text) => setPassword(text)}
                />

                <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxLabel}>Vendedor</Text>
                    <Checkbox
                        value={isSeller}
                        onValueChange={(newValue) => {
                            setIsSeller(newValue);
                            if (newValue) setIsBuyer(false); // Desmarcar Comprador si se selecciona Vendedor
                        }}
                        color={isSeller ? '#4630EB' : undefined} // Color personalizado
                    />
                </View>

                <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxLabel}>Comprador</Text>
                    <Checkbox
                        value={isBuyer}
                        onValueChange={(newValue) => {
                            setIsBuyer(newValue);
                            if (newValue) setIsSeller(false); // Desmarcar Vendedor si se selecciona Comprador
                        }}
                        color={isBuyer ? '#4630EB' : undefined} // Color personalizado
                    />
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Button title='Crear cuenta' onPress={signUp} />
                )}
            </KeyboardAvoidingView>
        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        paddingLeft: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    checkboxLabel: {
        marginRight: 10,
    },
});