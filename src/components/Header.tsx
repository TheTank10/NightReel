import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { MediaType } from '../types';
import { TabBar } from './TabBar';
import { SearchBar } from './SearchBar';
import { COLORS, SPACING, FONT_SIZES, SHADOWS } from '../constants';

interface Props {
  selectedTab: MediaType;
  onTabChange: (tab: MediaType) => void;
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onSearchClear: () => void;
  isSearching: boolean;
  animations?: {
    searchBarScale: Animated.Value;
    searchBarTranslate: Animated.Value;
    logoOpacity: Animated.Value;
    tabsOpacity: Animated.Value;
    tabsScale: Animated.Value;
    tabsTranslate: Animated.Value;
  };
}

/**
 * App header with logo, tabs, and search bar
 * Supports scroll animations for hiding/showing elements
 */
export const Header: React.FC<Props> = ({
  selectedTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onSearchClear,
  isSearching,
  animations,
}) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Animated.View style={{ opacity: animations?.logoOpacity, marginBottom: 20 }}>
        <Text style={styles.logo}>Lime TV</Text>
      </Animated.View>

      {/* Tabs (hidden when searching) */}
      {!isSearching && (
        <Animated.View
          style={[
            styles.tabWrapper,
            {
              transform: [
                { scale: animations?.tabsScale || 1 }
              ],
            },
          ]}
        >
          <TabBar
            selectedTab={selectedTab}
            onTabChange={onTabChange}
            opacity={animations?.tabsOpacity}
          />
        </Animated.View>
      )}

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={onSearchChange}
        onClear={onSearchClear}
        scale={animations?.searchBarScale}
        translateY={animations?.searchBarTranslate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: SPACING.lg,
    paddingBottom: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    letterSpacing: 2,
    ...SHADOWS.textGlow,
    zIndex: 1,
  },
  tabWrapper: {
    marginBottom: 5,
  },
});