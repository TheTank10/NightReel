import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants';
import { SubtitleStyling } from '../hooks/useSubtitleStyling';

interface SubtitleCustomizerModalProps {
  visible: boolean;
  styling: SubtitleStyling;
  onUpdate: (styling: Partial<SubtitleStyling>) => void;
  onReset: () => void;
  onClose: () => void;
}

const COLOR_OPTIONS = [
  { name: 'White', value: '#ffffff' },
  { name: 'Yellow', value: '#ffff00' },
  { name: 'Cyan', value: '#00ffff' },
  { name: 'Green', value: '#00ff00' },
  { name: 'Red', value: '#ff0000' },
];

const BG_COLOR_OPTIONS = [
  { name: 'Black', value: '#000000' },
  { name: 'Dark Gray', value: '#333333' },
  { name: 'Navy', value: '#001f3f' },
];

const FONT_WEIGHTS: Array<{ name: string; value: '400' | '500' | '600' | '700' | 'bold' }> = [
  { name: 'Normal', value: '400' },
  { name: 'Medium', value: '500' },
  { name: 'Semibold', value: '600' },
  { name: 'Bold', value: '700' },
];

const hexToRgba = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const SubtitleCustomizerModal: React.FC<SubtitleCustomizerModalProps> = ({
  visible,
  styling,
  onUpdate,
  onReset,
  onClose,
}) => {
  const insets = useSafeAreaInsets();

  const getSubtitleStyle = () => {
    const rgba = hexToRgba(styling.backgroundColor, styling.backgroundOpacity);
    return {
      color: styling.textColor,
      backgroundColor: rgba,
      fontSize: styling.fontSize,
      fontWeight: styling.fontWeight,
      paddingHorizontal: styling.paddingHorizontal,
      paddingVertical: styling.paddingVertical,
      borderRadius: styling.borderRadius,
      ...(styling.textShadow && {
        textShadowColor: 'rgba(0,0,0,0.95)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
      }),
    };
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Subtitle Appearance</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.previewContainer, { bottom: styling.bottomOffset }]}>
          <View style={styles.previewBackground}>
            <Text style={[styles.previewText, getSubtitleStyle()]}>
              This is how your subtitles will look
            </Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.controlGroup}>
              <View style={styles.controlHeader}>
                <Text style={styles.controlLabel}>Font Size</Text>
                <Text style={styles.controlValue}>{styling.fontSize}</Text>
              </View>
              <Slider
                style={styles.slider}
                value={styling.fontSize}
                minimumValue={12}
                maximumValue={32}
                step={1}
                minimumTrackTintColor="rgba(201, 255, 0, 0.9)"
                maximumTrackTintColor="rgba(255,255,255,0.2)"
                thumbTintColor="rgba(201, 255, 0, 0.9)"
                onValueChange={(value) => onUpdate({ fontSize: value })}
              />
            </View>

            <View style={styles.controlGroup}>
              <Text style={styles.controlLabel}>Font Weight</Text>
              <View style={styles.optionsRow}>
                {FONT_WEIGHTS.map((weight) => (
                  <TouchableOpacity
                    key={weight.value}
                    style={[
                      styles.optionButton,
                      styling.fontWeight === weight.value && styles.optionButtonActive,
                    ]}
                    onPress={() => onUpdate({ fontWeight: weight.value })}
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        styling.fontWeight === weight.value && styles.optionButtonTextActive,
                      ]}
                    >
                      {weight.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.controlGroup}>
              <Text style={styles.controlLabel}>Text Color</Text>
              <View style={styles.optionsRow}>
                {COLOR_OPTIONS.map((color) => (
                  <TouchableOpacity
                    key={color.value}
                    style={[
                      styles.colorButton,
                      { backgroundColor: color.value },
                      styling.textColor === color.value && styles.colorButtonActive,
                    ]}
                    onPress={() => onUpdate({ textColor: color.value })}
                  />
                ))}
              </View>
            </View>

            <View style={styles.controlGroup}>
              <Text style={styles.controlLabel}>Background Color</Text>
              <View style={styles.optionsRow}>
                {BG_COLOR_OPTIONS.map((color) => (
                  <TouchableOpacity
                    key={color.value}
                    style={[
                      styles.colorButton,
                      { backgroundColor: color.value },
                      styling.backgroundColor === color.value && styles.colorButtonActive,
                    ]}
                    onPress={() => onUpdate({ backgroundColor: color.value })}
                  />
                ))}
              </View>
            </View>

            <View style={styles.controlGroup}>
              <View style={styles.controlHeader}>
                <Text style={styles.controlLabel}>Background Opacity</Text>
                <Text style={styles.controlValue}>{Math.round(styling.backgroundOpacity * 100)}%</Text>
              </View>
              <Slider
                style={styles.slider}
                value={styling.backgroundOpacity}
                minimumValue={0}
                maximumValue={1}
                step={0.05}
                minimumTrackTintColor="rgba(201, 255, 0, 0.9)"
                maximumTrackTintColor="rgba(255,255,255,0.2)"
                thumbTintColor="rgba(201, 255, 0, 0.9)"
                onValueChange={(value) => onUpdate({ backgroundOpacity: value })}
              />
            </View>

            <View style={styles.controlGroup}>
              <View style={styles.controlHeader}>
                <Text style={styles.controlLabel}>Corner Roundness</Text>
                <Text style={styles.controlValue}>{styling.borderRadius}</Text>
              </View>
              <Slider
                style={styles.slider}
                value={styling.borderRadius}
                minimumValue={0}
                maximumValue={20}
                step={1}
                minimumTrackTintColor="rgba(201, 255, 0, 0.9)"
                maximumTrackTintColor="rgba(255,255,255,0.2)"
                thumbTintColor="rgba(201, 255, 0, 0.9)"
                onValueChange={(value) => onUpdate({ borderRadius: value })}
              />
            </View>

            <View style={styles.controlGroup}>
              <View style={styles.controlHeader}>
                <Text style={styles.controlLabel}>Horizontal Padding</Text>
                <Text style={styles.controlValue}>{styling.paddingHorizontal}</Text>
              </View>
              <Slider
                style={styles.slider}
                value={styling.paddingHorizontal}
                minimumValue={0}
                maximumValue={30}
                step={1}
                minimumTrackTintColor="rgba(201, 255, 0, 0.9)"
                maximumTrackTintColor="rgba(255,255,255,0.2)"
                thumbTintColor="rgba(201, 255, 0, 0.9)"
                onValueChange={(value) => onUpdate({ paddingHorizontal: value })}
              />
            </View>

            <View style={styles.controlGroup}>
              <View style={styles.controlHeader}>
                <Text style={styles.controlLabel}>Vertical Padding</Text>
                <Text style={styles.controlValue}>{styling.paddingVertical}</Text>
              </View>
              <Slider
                style={styles.slider}
                value={styling.paddingVertical}
                minimumValue={0}
                maximumValue={20}
                step={1}
                minimumTrackTintColor="rgba(201, 255, 0, 0.9)"
                maximumTrackTintColor="rgba(255,255,255,0.2)"
                thumbTintColor="rgba(201, 255, 0, 0.9)"
                onValueChange={(value) => onUpdate({ paddingVertical: value })}
              />
            </View>

            <View style={styles.controlGroup}>
              <View style={styles.controlHeader}>
                <Text style={styles.controlLabel}>Position from Bottom</Text>
                <Text style={styles.controlValue}>{styling.bottomOffset}</Text>
              </View>
              <Slider
                style={styles.slider}
                value={styling.bottomOffset}
                minimumValue={20}
                maximumValue={150}
                step={5}
                minimumTrackTintColor="rgba(201, 255, 0, 0.9)"
                maximumTrackTintColor="rgba(255,255,255,0.2)"
                thumbTintColor="rgba(201, 255, 0, 0.9)"
                onValueChange={(value) => onUpdate({ bottomOffset: value })}
              />
            </View>

            <TouchableOpacity
              style={styles.toggleRow}
              onPress={() => onUpdate({ textShadow: !styling.textShadow })}
            >
              <Text style={styles.controlLabel}>Text Shadow</Text>
              <View style={[styles.toggle, styling.textShadow && styles.toggleActive]}>
                <View style={[styles.toggleThumb, styling.textShadow && styles.toggleThumbActive]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={onReset}>
              <Ionicons name="refresh-outline" size={18} color={COLORS.text} />
              <Text style={styles.resetButtonText}>Reset to Default</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  closeText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '300',
  },
  previewContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  previewBackground: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderWidth: 2,
    borderColor: 'rgba(201, 255, 0, 0.3)',
    minWidth: '80%',
  },
  previewText: {
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  controlGroup: {
    marginBottom: 24,
  },
  controlHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  controlLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text,
  },
  controlValue: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(201, 255, 0, 0.9)',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionButtonActive: {
    backgroundColor: 'rgba(201, 255, 0, 0.15)',
    borderColor: 'rgba(201, 255, 0, 0.6)',
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  optionButtonTextActive: {
    color: 'rgba(201, 255, 0, 0.9)',
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  colorButtonActive: {
    borderColor: 'rgba(201, 255, 0, 0.9)',
    borderWidth: 4,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 24,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: 'rgba(201, 255, 0, 0.9)',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.text,
  },
  toggleThumbActive: {
    transform: [{ translateX: 22 }],
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  resetButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
});