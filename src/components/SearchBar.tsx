import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Animated, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  scale?: Animated.Value;
  translateY?: Animated.Value;
}

/**
 * Search bar with blur background and clear button
 * Supports animations for hiding/showing
 */
export const SearchBar: React.FC<Props> = ({
  value,
  onChangeText,
  onClear,
  scale,
  translateY,
}) => {
  const animatedStyle = {
    transform: [
      { scale: scale || 1 },
    ],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <BlurView intensity={80} tint="dark" style={styles.blur}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor={COLORS.textDark}
          value={value}
          onChangeText={onChangeText}
        />
      </BlurView>
      {value.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={onClear}>
          <Text style={styles.clearButtonText}>✕</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.sm,
    marginBottom: 0,
    zIndex: 1,
    overflow: 'hidden',
  },
  blur: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: BORDER_RADIUS.md,
    padding: 12,
    paddingRight: 45,
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.overlayStrong,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
});