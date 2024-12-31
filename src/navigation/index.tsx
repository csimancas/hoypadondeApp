import React from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Splash from '../screens/Splash';
import Map from '../screens/Map';
import LogIn from '../screens/LogIn';

import colors from '../utils/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const logo = require('../assets/logo_nombre.png');

// Componente para Map que se define fuera del render
const MapTabIcon = ({ focused }) => (
  <View style={{
    backgroundColor: colors.darkTheme.colors.background,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  }}>
    <Image
      source={logo}
      style={{
        width: 45,
        height: 45,
        tintColor: focused ? '#D4AF37' : 'gray',
        marginBottom: 5,
      }}
    />
  </View>
);

// Componente para los iconos generales
const TabIcon = ({ route, focused, color, size }) => {
  let iconName;
  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'user' : 'user-o';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

function HomeStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: colors.darkTheme.colors.background,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Map') {
            return <MapTabIcon focused={focused} />;
          }
          return <TabIcon route={route} focused={focused} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#D4AF37',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Map" component={Map} options={{
        tabBarLabel: '',
      }}/>
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default Navigation;
