import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../../FirebaseConfig'
import { doc, getDoc } from 'firebase/firestore';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Main = ({navigation}: RouterProps) => {
  //Consultar información del usuario
  const [userName, setUserName] = useState<string | null>(null);
  const auth = FIREBASE_AUTH;
  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser ;
      if (user) {
        const userDocRef = doc(FIREBASE_FIRESTORE, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserName();
  }, [auth.currentUser ]);
  return (
    <View style={styles.container}>
            {userName && <Text style={styles.userName}>Bienvenido, {userName}</Text>}

      <Button onPress={() => navigation.navigate('List')} title='Abrir lista' />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title='Cerrar Sesión' />
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    marginBottom: 20,
  },
});