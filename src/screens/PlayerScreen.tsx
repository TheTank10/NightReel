import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Video from 'react-native-video';
import * as ScreenOrientation from 'expo-screen-orientation';

interface SubtitleOption {
  title: string;
  language: string;
  uri: string;
}

interface PlayerScreenProps {
  route: {
    params: {
      videoUrl: string;
      title: string;
      subtitle?: string;
      subtitles?: SubtitleOption[];
    };
  };
  navigation: any;
}

export const PlayerScreen: React.FC<PlayerScreenProps> = ({ route, navigation }) => {
  const { videoUrl } = route.params;
  // subtitle and subtitles params are available here if you want to use them later

  useEffect(() => {
    // Lock to landscape and hide status bar
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    StatusBar.setHidden(true);

    return () => {
      // Reset on exit
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      StatusBar.setHidden(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        controls={true}
        resizeMode="contain"
        ignoreSilentSwitch="ignore"
        playInBackground={false}
        playWhenInactive={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
});