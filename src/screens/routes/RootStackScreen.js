import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SignInScreen from '../auth/LoginScreen/SignInScreen';



const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        
    </RootStack.Navigator>
);

export default RootStackScreen;