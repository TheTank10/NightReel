import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { SPACING, COLORS, FONT_SIZES } from '../../constants';
import { TMDB_IMAGE_BASE_URL } from '../../constants/config';
import { CastMember } from '../../types';

interface DetailCastSectionProps {
  cast: CastMember[];
}

/**
 * Cast section displaying cast members
 */
export const DetailCastSection: React.FC<DetailCastSectionProps> = ({ cast }) => {
  if (cast.length === 0) return null;

  const renderCastMember = ({ item: castMember }: { item: CastMember }) => (
    <View style={styles.castCard}>
      {castMember.profile_path ? (
        <View style={styles.castImageContainer}>
          <Image
            source={{ uri: `${TMDB_IMAGE_BASE_URL}${castMember.profile_path}` }}
            style={styles.castImage}
            resizeMode="cover"
          />
        </View>
      ) : (
        <View style={[styles.castImageContainer, styles.castImagePlaceholder]}>
          <Text style={styles.castInitial}>{castMember.name.charAt(0)}</Text>
        </View>
      )}
      <Text style={styles.castName} numberOfLines={1}>
        {castMember.name}
      </Text>
      <Text style={styles.castCharacter} numberOfLines={1}>
        {castMember.character}
      </Text>
    </View>
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Cast</Text>
      <FlatList
        data={cast}
        renderItem={renderCastMember}
        keyExtractor={(item) => item.id.toString()}
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
  castCard: {
    width: 100,
    marginRight: SPACING.md,
  },
  castImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SPACING.xs,
    backgroundColor: COLORS.overlay,
    overflow: 'hidden',
  },
  castImage: {
    width: '100%',
    aspectRatio: 1,
  },
  castImagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  castInitial: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textMuted,
  },
  castName: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  castCharacter: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textDark,
    textAlign: 'center',
  },
});