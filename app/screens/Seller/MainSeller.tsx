import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../../../FirebaseConfig'
import { doc, getDoc } from 'firebase/firestore';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const MainSeller = ({navigation}: RouterProps) => {
  //Consultar información del usuario
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser ;
      if (user) {
        const userDoc = await getDoc(doc(FIREBASE_FIRESTORE, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
          setUserRole(userDoc.data().role);
        } else {
          console.log("No se ha encontrado el documento de este usuario!");
        }
      }
    };

    fetchUserName();
  }, [auth.currentUser ]);

  return (
    <View style={styles.container}>
            {userName && <Text style={styles.userName}>Bienvenido a Main Seller, Usuario: {userName}, Role: {userRole}</Text>}

      <Button onPress={() => navigation.navigate('List')} title='Abrir lista' />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title='Cerrar Sesión' />
    </View>
  )
}

export default MainSeller

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