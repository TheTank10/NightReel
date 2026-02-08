import React from 'react';
import { View, TouchableOpacity, Text, Animated, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { MediaType } from '../types';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants';

interface Props {
  selectedTab: MediaType;
  onTabChange: (tab: MediaType) => void;
  opacity?: Animated.Value;
  scale?: Animated.Value;
  translateY?: Animated.Value;
}

/**
 * Tab bar for switching between All, Movies, and TV Shows
 * Uses blur effect for glassmorphism design
 */
export const TabBar: React.FC<Props> = ({ selectedTab, onTabChange, opacity, scale, translateY }) => {
  const tabs: { key: MediaType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'movie', label: 'Movies' },
    { key: 'tv', label: 'Shows' },
  ];

  const animatedStyle = {
    opacity: opacity || 1,
    transform: [
      { scale: scale || 1 },
      { translateY: translateY || 0 },
    ],
  };

  return (
    <Animated.View style={animatedStyle}>
      <BlurView intensity={60} tint="dark" style={styles.container}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, selectedTab === tab.key && styles.tabActive]}
            onPress={() => onTabChange(tab.key)}
          >
            <Text
              style={[styles.tabText, selectedTab === tab.key && styles.tabTextActive]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.overlay,
    borderWidth: 1,
    borderColor: COLORS.border,
    zIndex: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: COLORS.overlayStrong,
  },
  tabText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  tabTextActive: {
    color: COLORS.text,
  },
});