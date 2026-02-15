import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SPACING, COLORS, FONT_SIZES, BORDER_RADIUS } from '../../constants';

interface DetailSeasonPickerProps {
  visible: boolean;
  numberOfSeasons: number;
  selectedSeason: number;
  onSeasonSelect: (season: number) => void;
  onClose: () => void;
}

/**
 * Modal for selecting TV show season
 */
export const DetailSeasonPicker: React.FC<DetailSeasonPickerProps> = ({
  visible,
  numberOfSeasons,
  selectedSeason,
  onSeasonSelect,
  onClose,
}) => {
  const handleSeasonSelect = (season: number) => {
    onSeasonSelect(season);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Season</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.seasonList}>
            {Array.from({ length: numberOfSeasons }, (_, i) => (
              <TouchableOpacity
                key={i + 1}
                style={[
                  styles.seasonOption,
                  selectedSeason === i + 1 && styles.seasonOptionSelected,
                ]}
                onPress={() => handleSeasonSelect(i + 1)}
              >
                <Text
                  style={[
                    styles.seasonOptionText,
                    selectedSeason === i + 1 && styles.seasonOptionTextSelected,
                  ]}
                >
                  Season {i + 1}
                </Text>
                {selectedSeason === i + 1 && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    width: '80%',
    maxHeight: '70%',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  modalClose: {
    fontSize: 24,
    color: COLORS.textMuted,
    fontWeight: '300',
  },
  seasonList: {
    maxHeight: 400,
  },
  seasonOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  seasonOptionSelected: {
    backgroundColor: COLORS.overlay,
  },
  seasonOptionText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.text,
  },
  seasonOptionTextSelected: {
    fontWeight: 'bold',
    color: COLORS.text,
  },
  checkmark: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.text,
    fontWeight: 'bold',
  },
});