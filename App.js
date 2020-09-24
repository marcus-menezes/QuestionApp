import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme as NavigationDefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Easing,
  View
} from 'react-native';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AuthContext } from './src/context/context';
import { DrawerContent } from './src/screens/drawer/DrawerContent';
import MainTabScreen from './src/screens/routes/MainTabScreen';
import RootStackScreen from './src/screens/routes/RootStackScreen';

const { height, width } = Dimensions.get('window')


const Drawer = createDrawerNavigator();

const App = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };



  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const authContext = React.useMemo(() =>
    ({
      signIn: async (foundUser) => {
        const userToken = String(foundUser.userToken);
        const userName = foundUser.username;

        try {
          await AsyncStorage.setItem('@QUESTIONAPPUSERID', userToken);
          await AsyncStorage.setItem('@QUESTIONAPPUSERNAME', userName);
        }
        catch (e) {
          console.log(e);
        }

        dispatch({ type: 'LOGIN', id: userName, token: userToken });
      },
      signOut: async () => {
        try {

          await AsyncStorage.removeItem('@QUESTIONAPPUSERNAME');
          await AsyncStorage.removeItem('@QUESTIONAPPUSERID');
        
        }
        catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => {

      }
    }), []);

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('@QUESTIONAPPUSERID');
        setIsLoading(false)
      }
      catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  
  if (isLoading === false) {

    return (


        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            {loginState.userToken !== null ? (
              <Drawer.Navigator drawerStyle={{ width: null}} drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
              </Drawer.Navigator>
            )
              :
              <RootStackScreen />
            }
          </NavigationContainer>
        </AuthContext.Provider>

    );
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#191970' }}>
      <ActivityIndicator color={'#FFF'}></ActivityIndicator>
    </View>
  );

}

export default App;
