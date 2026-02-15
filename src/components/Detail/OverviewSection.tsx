import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, COLORS, FONT_SIZES } from '../../constants';

interface DetailOverviewSectionProps {
  overview: string;
}

/**
 * Overview/description section
 */
export const DetailOverviewSection: React.FC<DetailOverviewSectionProps> = ({ overview }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.overview}>{overview}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  overview: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textMuted,
    lineHeight: 22,
  },
});