import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SPACING, COLORS, FONT_SIZES, BORDER_RADIUS } from '../../constants';
import { TMDB_IMAGE_BASE_URL } from '../../constants/config';

interface DetailSimilarSectionProps {
  similarContent: any[];
  mediaType: string;
  onItemPress: (item: any) => void;
}

/**
 * Similar content section
 */
export const DetailSimilarSection: React.FC<DetailSimilarSectionProps> = ({
  similarContent,
  mediaType,
  onItemPress,
}) => {
  if (similarContent.length === 0) return null;

  const renderSimilarItem = ({ item: similar }: { item: any }) => (
    <TouchableOpacity style={styles.similarCard} onPress={() => onItemPress(similar)}>
      {similar.poster_path && (
        <Image
          source={{ uri: `${TMDB_IMAGE_BASE_URL}${similar.poster_path}` }}
          style={styles.similarPoster}
        />
      )}
      <Text style={styles.similarTitle} numberOfLines={2}>
        {similar.title || similar.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>More Like This</Text>
      <FlatList
        data={similarContent}
        renderItem={renderSimilarItem}
        keyExtractor={(item) => `${item.id}-${item.media_type || mediaType}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  horizontalList: {
    paddingRight: SPACING.lg,
  },
  similarCard: {
    width: 120,
    marginRight: SPACING.md,
  },
  similarPoster: {
    width: 120,
    height: 180,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xs,
  },
  similarTitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
});