import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
} from 'react-native';

const COLORS = {
  primary: '#0058be',
  primaryContainer: '#2170e4',
  onPrimary: '#ffffff',
  surface: '#f8f9ff',
  surfaceContainer: '#e5eeff',
  onSurfaceVariant: '#424754',
  outlineVariant: '#c2c6d6',
};

interface AppHeaderProps {
  activeTab?: 'Feed' | 'Forge' | 'Rankings';
}

const SUBTITLES: Record<string, string> = {
  Feed: 'Explore Ideas',
  Forge: 'Create New Venture',
  Rankings: 'Leaderboard',
};

const AppHeader: React.FC<AppHeaderProps> = ({ activeTab }) => {
  const subtitle = activeTab ? SUBTITLES[activeTab] ?? '' : '';

  return (
    <View style={styles.container}>
      <View style={styles.brand}>
        <Image source={require('../../assets/IdeaForge-foreground.png')} style={styles.logo} />
        <Text style={styles.brandText}>IdeaForge</Text>
      </View>

      {!!subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop:
      Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) - 10 : 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
    shadowColor: '#005ac2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 4,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: -10,
  },
  brandText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 0.2,
  },
  logo:{
    width:60,
    height:60,
  }
});