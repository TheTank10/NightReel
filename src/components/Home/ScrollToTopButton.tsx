import React from 'react';
import { TouchableOpacity, Animated, StyleSheet, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS, SPACING } from '../../constants';

interface Props {
  visible: boolean;
  onPress: () => void;
}

export const ScrollToTopButton: React.FC<Props> = ({ visible, onPress }) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
        <BlurView intensity={80} tint="light" style={styles.blur}>
          <Text style={styles.arrow}>↑</Text>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1000,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  },
  blur: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});