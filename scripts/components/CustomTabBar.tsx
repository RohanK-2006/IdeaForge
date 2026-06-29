import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { BOTTOM_TABS } from '../utils/constants'; 

const COLORS = {
  primary: '#0058be',
  primaryContainer: '#2170e4',
  onPrimary: '#ffffff',
  surface: '#f8f9ff',
  surfaceContainer: '#e5eeff',
  onSurfaceVariant: '#424754',
  outlineVariant: '#c2c6d6',
};



type MCIName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type TabConfig = {
  name: string;
  icon: MCIName;
  iconActive: MCIName;
  isFAB?: boolean;
};

const TAB_CONFIG: TabConfig[] = [
  { name: BOTTOM_TABS.Home,      icon: 'home-outline', iconActive: 'home' },
  { name: BOTTOM_TABS.Forge,     icon: 'plus',         iconActive: 'plus', isFAB: true },
  { name: BOTTOM_TABS.Rankings,  icon: 'trophy-outline', iconActive: 'trophy' },
];

// Custom Tab Bar 
interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, navigation }) => {

    const insets = useSafeAreaInsets();
  return (
    <View style={[tabStyles.container, {paddingBottom: insets.bottom}]}>
      {state.routes.map((route: any, index: number) => {
        const tab = TAB_CONFIG[index];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (tab.isFAB) {
          return (
            <View key={route.key} style={tabStyles.fabWrapper}>
              <TouchableOpacity
                onPress={onPress}
                style={[tabStyles.fab, isFocused && tabStyles.fabFocused]}
                activeOpacity={0.85}
              >
                <MaterialCommunityIcons
                  name={tab.icon}
                  size={30}
                  color={COLORS.onPrimary}
                />
              </TouchableOpacity>
              <Text style={[tabStyles.fabLabel, isFocused && tabStyles.activeLabel]}>
                {tab.name}
              </Text>
            </View>
          );
        }

        const iconName: MCIName = isFocused ? tab.iconActive : tab.icon;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={tabStyles.tab}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={iconName}
              size={24}
              color={isFocused ? COLORS.primary : COLORS.onSurfaceVariant}
            />
            <Text style={[tabStyles.label, isFocused && tabStyles.activeLabel]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const tabStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceContainer,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceContainer,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
    letterSpacing: 0.1,
  },
  activeLabel: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  fabWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: -28,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  fabFocused: {
    backgroundColor: COLORS.primaryContainer,
  },
  fabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
    letterSpacing: 0.1,
  },
});