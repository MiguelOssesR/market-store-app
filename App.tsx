import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from './FirebaseConfig';
import MainAdmin from './app/screens/MainAdmin';
import MainSeller from './app/screens/MainSeller';
import MainBuyer from './app/screens/MainBuyer';
import Login from './app/screens/Login';
import SignUp from './app/screens/SignUp';
import List from './app/screens/List';

const Stack = createNativeStackNavigator();

const insideStack = createNativeStackNavigator();

function AdminLayout() {
  return (
    <insideStack.Navigator>
      <insideStack.Screen name='Main' component={MainAdmin} options={{ headerShown: false }} />
      <insideStack.Screen name='List' component={List} options={{ headerShown: true }} />
    </insideStack.Navigator>
  );
}

function SellerLayout() {
  return (
    <insideStack.Navigator>
      <insideStack.Screen name='MainSeller' component={MainSeller} options={{ headerShown: false }} />
    </insideStack.Navigator>
  );
}

function BuyerLayout() {
  return (
    <insideStack.Navigator>
      <insideStack.Screen name='MainSeller' component={MainBuyer} options={{ headerShown: false }} />
    </insideStack.Navigator>
  );
}


export default function App() {
  const [user, setUser] = useState<{ uid: string; role: string } | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(FIREBASE_FIRESTORE, "users", user.uid));
        if (userDoc.exists()) {
          const userRole = userDoc.data().role;
          setUser({ uid: user.uid, role: userRole });
        }
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          user.role === 'Vendedor' ? (
            <Stack.Screen name='Seller' component={SellerLayout} options={{ headerShown: false }} />
          ) : user.role === 'Comprador' ? (
            <Stack.Screen name='Buyer' component={BuyerLayout} options={{ headerShown: false }} />
          ) : user.role === 'Admin' ? (
            <Stack.Screen name='Admin' component={AdminLayout} options={{ headerShown: false }} />
          ) : null
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