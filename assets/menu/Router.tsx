import React from 'react';
import { Image, StyleSheet, ImageBackground, View } from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Splash from './Splash';
import KangkungPage from './KangkungPage';
import BayamPage from './BayamPage';
import PakcoyPage from './PakcoyPage';
import bayam from '../image/bayam.png';
import kangkung from '../image/kangkung.png';
import pakcoy from '../image/pakcoy.png'
import footerpage from '../image/footer.png'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: { height: 65, position: 'absolute' }, headerShown: false, tabBarShowLabel: false,
            tabBarBackground: () => (
                <ImageBackground source={footerpage} style={{ height: 65, backgroundColor: '#0B8C76' }} />
            )
        }}>
            <Tab.Screen name="Pakcoy" component={PakcoyPage} options={{
                tabBarIcon: ({ focused }) => (
                    <Image source={pakcoy} style={styles.logosayur} />
                )
            }} />
            <Tab.Screen name="Kangkung" component={KangkungPage} options={{
                tabBarIcon: ({ focused }) => (
                    <Image source={kangkung} style={styles.logosayur} />
                )
            }} />
            <Tab.Screen name="Bayam" component={BayamPage} options={{
                tabBarIcon: ({ focused }) => (
                    <Image source={bayam} style={styles.logosayur} />
                )
            }} />
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Splash' component={Splash} />
                <Stack.Screen name='Screen' component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>


    )
}


const styles = StyleSheet.create({
    logosayur: { width: 50, height: 50 }
})
export default Router;