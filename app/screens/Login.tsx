import React, { useState } from 'react'
import { View, StyleSheet, Pressable, TextInput, ActivityIndicator, KeyboardAvoidingView, Image, Text } from 'react-native'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


interface RouterProps {
  navigation: NavigationProp<any, any>;
}

interface CustomButtonProps {
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const Login = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState('testcomprador@test.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;



  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      //console.log(response);
      //console.log(JSON.stringify(response, null, 2));
      //alert('Sesión iniciada correctamente')
    } catch (error: any) {
      console.log(error);
      alert('Fallo el inicio de sesión ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView >
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {/* <Image style={styles.image} source={require('../../assets/img_store_logo.png')} /> */}
            <View style={styles.icon}>
              <FontAwesome5 name="cookie-bite" size={150} color="gray" />
            </View>

            <Text style={styles.mark} >Cookie-Bite</Text>
            <Text style={{ alignSelf: 'center', marginBottom: 10 }} >Iniciar Sesión</Text>

            <View style={styles.inputContainer}>
              <TextInput
                value={email}
                style={styles.input}
                placeholder="Correo electrónico"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
              />
              <View style={{ marginRight: 10 }}>
                <FontAwesome5 name="envelope" size={24} color="gray" />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                secureTextEntry={true}
                value={password}
                style={styles.input}
                placeholder="Contraseña"
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
              />
              <View style={{ marginRight: 10 }}>
                <FontAwesome5 name="lock" size={24} color="gray" />
              </View>
            </View>

            <Text style={[styles.link, { alignSelf: 'flex-end' }]}>¿Olvidaste tu contraseña?</Text>
            <CustomButton title="Iniciar sesión" onPress={signIn} />
            <Text style={[styles.link, { alignSelf: 'center', marginTop: 5 }]} onPress={() => navigation.navigate('SignUp')}>
              ¿No tienes cuenta? Regístrate aquí
            </Text>
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
    alignItems: 'center',
    backgroundColor: 'fff'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    width: 300,
    justifyContent: 'space-between'
  },
  input: {
    width: '80%',
    height: 40,
    paddingLeft: 10,
    paddingVertical: 5,
  },
  icon: {
    alignItems: 'center',
    margin: 10
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  mark: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    color: '#494949'
  },
  button: {
    backgroundColor: '#494949',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
    marginTop: 20,
    width: 210,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: 'gray',
    textDecorationLine: 'underline',
    fontSize: 13,
  },
})