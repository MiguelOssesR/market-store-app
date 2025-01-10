import { View, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => { 
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth,email, password);
      console.log(response);
      alert('Sesión iniciada correctamente')
      } catch (error: any) {
          console.log(error);
          alert('Fallo el inicio de sesión ' + error.message);
      } finally {
          setLoading(false);
      }
  }

  const signUp = async () => { 
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth,email, password);
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
      <KeyboardAvoidingView >
        <TextInput value={email} style={styles.input} placeholder='Correo electronico' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='Contraseña' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>
        
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" /> 
        ) : (
          <>
            <Button title='Iniciar sesión' onPress={() => signIn()} />
            <Button title='Crear cuenta' onPress={() => signUp()} />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  )
}

export default Login

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