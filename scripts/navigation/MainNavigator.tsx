import React, { useState } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import ForgeScreen from '../screens/Forge/ForgeScreen';
import RankingScreen from '../screens/Rankings/RankingScreen';
import { BOTTOM_TABS } from '../utils/constants'; 
import CustomTabBar from '../components/CustomTabBar';
import HomeScreen from '../screens/Home/HomeScreen';
import MainLoader from '../components/MainLoader';


// MainNavigator
const MainNavigator = () => {
  const Tabs = createBottomTabNavigator();
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <MainLoader onFinish={() => setLoading(false)}/>
    ); // or a loading spinner
  }
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={({ route }) => ({
          header: () => (
            <AppHeader activeTab={route.name as 'Feed' | 'Forge' | 'Rankings'} />
          ),
        })}
      >
        <Tabs.Screen name={BOTTOM_TABS.Home}     component={HomeScreen} />
        <Tabs.Screen name={BOTTOM_TABS.Forge}    component={ForgeScreen} />
        <Tabs.Screen name={BOTTOM_TABS.Rankings} component={RankingScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});