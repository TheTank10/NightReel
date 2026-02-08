import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Linking } from 'react-native';
import { SPACING, COLORS, FONT_SIZES, BORDER_RADIUS } from '../constants';
import { Video } from '../types';

interface DetailVideosSectionProps {
  videos: Video[];
}

/**
 * Videos/Trailers section
 */
export const DetailVideosSection: React.FC<DetailVideosSectionProps> = ({ videos }) => {
  if (videos.length === 0) return null;

  /**
   * Open YouTube video in app or browser
   */
  const handleVideoPress = (videoKey: string) => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoKey}`;
    Linking.openURL(youtubeUrl).catch((err) => 
      console.error('Error opening YouTube:', err)
    );
  };

  const renderVideo = ({ item: video }: { item: Video }) => {
    if (video.site !== 'YouTube') return null;

    return (
      <TouchableOpacity 
        style={styles.videoCard}
        onPress={() => handleVideoPress(video.key)}
      >
        <Image
          source={{ uri: `https://img.youtube.com/vi/${video.key}/hqdefault.jpg` }}
          style={styles.videoThumbnail}
        />
        <View style={styles.playIconContainer}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {video.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Trailers & More</Text>
      <FlatList
        data={videos}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id}
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
  videoCard: {
    width: 200,
    marginRight: SPACING.md,
  },
  videoThumbnail: {
    width: 200,
    height: 112,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xs,
  },
  playIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: SPACING.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 32,
    color: COLORS.text,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  videoTitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
});
