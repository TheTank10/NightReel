import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS, BORDER_RADIUS } from '../constants';

/**
 * Skeleton loading placeholder for poster cards
 * Shows animated pulse effect while content loads
 */
export const SkeletonCard: React.FC = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.container, { opacity }]}>
        <View style={styles.skeleton} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 10,
  },
  container: {
    width: 125,
    height: 188,
    position: 'relative',
  },
  skeleton: {
    width: 125,
    height: 188,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.shimmer,
    justifyContent: 'center',
    alignItems: 'center',
  },
});