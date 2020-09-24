console.disableYellowBox = true;
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { Image, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import {
  AnwserForm, HomeScreen,

  InsertForm
} from '../tab';



const DetailsStack = createStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
});
const navOptionHandler2 = () => ({
  headerShown: false,
  ...TransitionPresets.RevealFromBottomAndroid,
  gestureEnabled: true,
});
const navOptionHandler3 = () => ({
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
  gestureEnabled: true,
});
const navOptionHandler4 = () => ({
  headerShown: true,
  ...TransitionPresets.SlideFromRightIOS,
});

const Tab = createMaterialBottomTabNavigator();
const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="HomeScreen" activeColor="#fff"
  swipeEnabled={ true }
  
  barStyle={{
    backgroundColor: '#191970'  
  }}
      screenOptions={ ( { route, navigation } ) => ( {
        
        tabBarIcon: ( { focused, color, size } ) =>
        {
          let iconName;
          let badgeCount = 0;

          badgeCount = navigation.params?.Tipooption ?? 0;

          if ( route.name === 'HomeScreen' )
          {
            iconName =  "home"
          } else if ( route.name === 'AddQuiz' )
          {
            iconName =  "plus";
          }

          return (
            <Feather name={iconName} color="white" size={20} />
          );
        },
      } ) }
  >

    <Tab.Screen
      name="HomeScreen"
      component={HomeStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: <Text style={{ fontSize: 10, color: COLORS.BRANCO_APP,  }}> Home </Text>,
        tabBarColor: COLORS.ROXO_APP,

        tabBarIcon: ({ color }) => (

          <Feather name="home" color="white" size={20} />
        ),

      }}
    />

    <Tab.Screen
      name="InsertForm"
      component={InsertFormScreen}
      options={{
        tabBarLabel: <Text style={{ fontSize: 10, color: COLORS.BRANCO_APP,  }}>Add Quiz</Text>,
        tabBarColor: COLORS.ROXO_APP,
        labelStyle: { fontSize: 9 },
        tabBarIcon: ({ color }) => (
          <Feather name="plus" color="white" size={20} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;


const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator  screenOptions={{
    headerStyle: {
      backgroundColor:  COLORS.ROXO_APP,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      
    },
    headerShown: false
    
  }}>

    <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Overview' }} />
    <HomeStack.Screen name="AnwserForm" component={AnwserForm} options={navOptionHandler} />

  </HomeStack.Navigator>
);

const InsertStack = createStackNavigator();
const InsertFormScreen = ({ navigation }) => (
  <InsertStack.Navigator  screenOptions={{
    headerStyle: {
      backgroundColor:  COLORS.ROXO_APP,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      
    },
    headerShown: false
    
  }}>

    <InsertStack.Screen name="InsertForm" component={InsertForm} options={navOptionHandler} />
    <InsertStack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Overview' }} />
    <InsertStack.Screen name="AnwserForm" component={AnwserForm} options={navOptionHandler} />
    

  </InsertStack.Navigator>
);

