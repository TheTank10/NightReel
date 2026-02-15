import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { SPACING, COLORS, FONT_SIZES } from '../../constants';
import { ContentDetails, TVDetails } from '../../types';

interface DetailStatsSectionProps {
  details: ContentDetails;
  genres: string;
}

/**
 * Stats section showing genres, status, and seasons (for TV)
 */
export const DetailStatsSection: React.FC<DetailStatsSectionProps> = ({ details, genres }) => {
  const isTVShow = 'number_of_seasons' in details.details;

  return (
    <View style={styles.section}>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Genres</Text>
          <Text style={styles.statValue}>{genres}</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Status</Text>
          <Text style={styles.statValue}>{details.details.status}</Text>
        </View>
        {isTVShow && (
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Seasons</Text>
            <Text style={styles.statValue}>
              {(details.details as TVDetails).number_of_seasons}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
    gap: SPACING.xl,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textDark,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
});