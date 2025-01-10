import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../FirebaseConfig'

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Main = ({navigation}: RouterProps) => {
  return (
    <View style={styles.container}>
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
    alignItems: 'center'
  },
})