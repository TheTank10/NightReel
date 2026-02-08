import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SPACING, COLORS, FONT_SIZES, BORDER_RADIUS } from '../constants';
import { TMDB_BACKDROP_HIGH_URL, TMDB_POSTER_HIGH_URL } from '../constants/config';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BACKDROP_HEIGHT = SCREEN_HEIGHT * 0.5;
const POSTER_WIDTH = 120;
const POSTER_HEIGHT = 180;

interface DetailHeroBackdropProps {
  backdropPath: string;
  posterPath: string;
  title: string;
  tagline?: string;
  year: string;
  runtime: string;
  rating: string;
}

/**
 * Hero section with backdrop image, poster, and title information
 */
export const DetailHeroBackdrop: React.FC<DetailHeroBackdropProps> = ({
  backdropPath,
  posterPath,
  title,
  tagline,
  year,
  runtime,
  rating,
}) => {
  return (
    <View style={styles.backdropContainer}>
      <ImageBackground
        source={{ uri: `${TMDB_BACKDROP_HIGH_URL}${backdropPath}` }}
        style={styles.backdrop}
        resizeMode="cover"
        imageStyle={styles.backdropImage}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)', COLORS.background]}
          style={styles.backdropGradient}
        />

        {/* Poster & Title Section */}
        <View style={styles.heroContent}>
          <View style={styles.posterContainer}>
            <Image
              source={{ uri: `${TMDB_POSTER_HIGH_URL}${posterPath}` }}
              style={styles.poster}
              resizeMode="cover"
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {tagline && <Text style={styles.tagline}>{tagline}</Text>}
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{year}</Text>
              {runtime && (
                <>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.metaText}>{runtime}</Text>
                </>
              )}
              <Text style={styles.metaDot}>•</Text>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {rating}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backdropContainer: {
    width: SCREEN_WIDTH,
    height: BACKDROP_HEIGHT,
    backgroundColor: COLORS.background,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  backdropImage: {
    // This controls the actual image positioning
  },
  backdropGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: BACKDROP_HEIGHT * 0.7,
  },
  heroContent: {
    position: 'absolute',
    bottom: SPACING.lg,
    left: SPACING.lg,
    right: SPACING.lg,
    flexDirection: 'row',
  },
  posterContainer: {
    marginRight: SPACING.md,
  },
  poster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: BORDER_RADIUS.md,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  tagline: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    marginBottom: SPACING.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
  },
  metaDot: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    marginHorizontal: SPACING.xs,
  },
  ratingBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.sm,
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '600',
  },
});