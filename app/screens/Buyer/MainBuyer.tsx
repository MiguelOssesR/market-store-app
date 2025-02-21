import { View, Text, StyleSheet, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../../../FirebaseConfig'
import { doc, getDoc } from 'firebase/firestore';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const MainBuyer = ({ navigation }: RouterProps) => {
  //Consultar información del usuario
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string>("Vacio");
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(FIREBASE_FIRESTORE, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
          setUserRole(userDoc.data().role);
          setUserImage(userDoc.data().image)
          //console.log(("User image: " + userDoc.data().image))
        } else {
          console.log("No se ha encontrado el documento de este usuario!");
        }
      }
    };

    fetchUserName();
  }, [auth.currentUser]);

  return (
    <View style={styles.container}>
      <Image
        source={{uri: userImage}}
        style={styles.profileImage}
      />
      {userName && <Text style={styles.userName}>Bienvenido a Main Buyer, Usuario: {userName}, Role: {userRole}</Text>}
      <Button onPress={() => FIREBASE_AUTH.signOut()} title='Cerrar Sesión' />
    </View>
  )
}

export default MainBuyer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60, // Espacio para la TabBar
  },
  userName: {
    fontSize: 18,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Hacer la imagen redonda
    marginBottom: 10,
  },
});