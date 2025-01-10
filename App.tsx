import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import Main from './app/screens/Main';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from './FirebaseConfig';
import List from './app/screens/List';
import SignUp from './app/screens/SignUp';
import React from 'react';


const Stack = createNativeStackNavigator();

const insideStack = createNativeStackNavigator();

function insideLayout() {
  return (
    <insideStack.Navigator>
      <insideStack.Screen name='Main' component={Main} options={{ headerShown:false}} />
      <insideStack.Screen name='List' component={List} options={{ headerShown:true}} />
    </insideStack.Navigator>
    
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
        console.log('user',user);
        setUser(user);
      });
    }, [])
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
      {user ? (
          <Stack.Screen name='Inside' component={insideLayout} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>  
  );
};