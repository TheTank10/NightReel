import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SPACING, COLORS, FONT_SIZES, BORDER_RADIUS } from '../../constants';
import { TMDB_IMAGE_BASE_URL } from '../../constants/config';
import { Episode } from '../../types';

interface DetailEpisodesSectionProps {
  selectedSeason: number;
  episodes: Episode[] | undefined;
  loadingSeason: boolean;
  onSeasonPickerOpen: () => void;
  onEpisodePress: (episodeNumber: number) => void;  // Add this
  selectedEpisode: number;  // Add this
}

/**
 * Episodes section for TV shows
 */
export const DetailEpisodesSection: React.FC<DetailEpisodesSectionProps> = ({
  selectedSeason,
  episodes,
  loadingSeason,
  onSeasonPickerOpen,
  onEpisodePress,  // Add this
  selectedEpisode,  // Add this
}) => {
  const renderEpisode = ({ item: episode }: { item: Episode }) => {
    const isSelected = episode.episode_number === selectedEpisode;  // Add this
    
    return (
      <TouchableOpacity 
        style={styles.episodeCard}
        onPress={() => onEpisodePress(episode.episode_number)}  // Add this
      >
        {episode.still_path ? (
          <Image
            source={{ uri: `${TMDB_IMAGE_BASE_URL}${episode.still_path}` }}
            style={[
              styles.episodeImage,
              isSelected && styles.selectedEpisode  // Optional: highlight selected
            ]}
            resizeMode="cover"
          />
        ) : (
          <View style={[
            styles.episodeImage, 
            styles.episodePlaceholder,
            isSelected && styles.selectedEpisode  // Optional: highlight selected
          ]}>
            <Text style={styles.episodeNumber}>EP {episode.episode_number}</Text>
          </View>
        )}
        <View style={styles.episodeInfo}>
          <Text style={styles.episodeTitle} numberOfLines={1}>
            EP {episode.episode_number} • {episode.name}
          </Text>
          {episode.runtime && <Text style={styles.episodeRuntime}>{episode.runtime}m</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.section}>
      <View style={styles.seasonHeader}>
        <Text style={styles.sectionTitle}>Episodes</Text>
        <TouchableOpacity style={styles.seasonButton} onPress={onSeasonPickerOpen}>
          <Text style={styles.seasonButtonText}>Season {selectedSeason}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>
      {loadingSeason ? (
        <View style={styles.seasonLoadingContainer}>
          <ActivityIndicator size="small" color={COLORS.text} />
        </View>
      ) : episodes && episodes.length > 0 ? (
        <FlatList
          data={episodes}
          renderItem={renderEpisode}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      ) : (
        <Text style={styles.noEpisodesText}>No episodes available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  seasonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  seasonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.overlay,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 120,
  },
  seasonButtonText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '600',
    marginRight: SPACING.sm,
  },
  dropdownIcon: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  seasonLoadingContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEpisodesText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textDark,
    textAlign: 'center',
    paddingVertical: SPACING.lg,
  },
  horizontalList: {
    paddingRight: SPACING.lg,
  },
  episodeCard: {
    width: 220,
    marginRight: SPACING.md,
  },
  episodeImage: {
    width: 220,
    height: 124,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xs,
    backgroundColor: COLORS.overlay,
  },
  episodePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  episodeNumber: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  episodeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  episodeTitle: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    marginRight: SPACING.xs,
  },
  episodeRuntime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textDark,
  },
  // Optional: Add visual feedback for selected episode
  selectedEpisode: {
    borderWidth: 2,
    borderColor: COLORS.buttonDark || COLORS.text,
  },
});