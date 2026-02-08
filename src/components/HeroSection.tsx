import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Movie } from '../types';
import { getBackdropUrl, getDisplayTitle } from '../utils';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  item: Movie | null;
  loading?: boolean;
}

/**
 * Hero section - large featured content banner at top of screen
 * Shows backdrop image with title and call-to-action button
 */
export const HeroSection: React.FC<Props> = ({ item, loading = false }) => {
  const navigation = useNavigation<NavigationProp>();
  const screenWidth = Dimensions.get('window').width;
  const heroHeight = (screenWidth * 9) / 16; // Perfect 16:9 aspect ratio

  if (loading || !item) {
    return (
      <View style={styles.wrapper}>
        <View style={[styles.container, { height: heroHeight }]}>
          <View style={styles.skeleton} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { height: heroHeight }]}>
        {item.backdrop_path && (
          <Image
            source={{
              uri: getBackdropUrl(item.backdrop_path),
              cache: 'force-cache',
            }}
            style={styles.image}
            resizeMode="cover"
            fadeDuration={300}
          />
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.95)']}
          style={styles.gradient}
        >
          <Text style={styles.title}>{getDisplayTitle(item)}</Text>
          <TouchableOpacity style={styles.button} onPress={() => item && navigation.navigate('Detail', { item })}>
            <Text style={styles.buttonText}>▶ Watch Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  container: {
    overflow: 'hidden',
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...SHADOWS.glow,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  skeleton: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
    ...SHADOWS.textGlow,
  },
  button: {
    backgroundColor: COLORS.buttonLight,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: COLORS.buttonDark,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
});