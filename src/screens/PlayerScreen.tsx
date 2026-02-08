// screens/PlayerScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text, ScrollView } from 'react-native';
import VideoPlayer from 'react-native-media-console';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

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
  const { videoUrl, title, subtitle, subtitles = [] } = route.params;
  
  const [showSubtitleMenu, setShowSubtitleMenu] = useState(false);
  const [selectedSubtitleTitle, setSelectedSubtitleTitle] = useState<string | null>(null);

  const textTracks = subtitles.map(sub => ({
    title: sub.title,
    language: sub.language as any,
    type: sub.uri.endsWith('.vtt') ? ('text/vtt' as any) : ('application/x-subrip' as any),
    uri: sub.uri,
  }));

  const handleSubtitleSelect = (subTitle: string) => {
    setSelectedSubtitleTitle(subTitle);
    setShowSubtitleMenu(false);
  };

  const handleSubtitleOff = () => {
    setSelectedSubtitleTitle(null);
    setShowSubtitleMenu(false);
  };

  return (
    <View style={styles.container}>
      <VideoPlayer
        source={{ uri: videoUrl }}
        navigator={navigation}
        onBack={() => navigation.goBack()}
        title={title}
        textTracks={textTracks}
        selectedTextTrack={
          selectedSubtitleTitle
            ? ({ type: 'title', value: selectedSubtitleTitle } as any)
            : ({ type: 'disabled' } as any)
        }
      />

      {subtitles.length > 0 && (
        <TouchableOpacity
          style={styles.subtitleButton}
          onPress={() => setShowSubtitleMenu(true)}
        >
          <Ionicons name="chatbox-outline" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      <Modal
        visible={showSubtitleMenu}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSubtitleMenu(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSubtitleMenu(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.subtitlePanel}>
            <SafeAreaView edges={['bottom']}>
              <Text style={styles.panelTitle}>Subtitles</Text>
              
              <ScrollView>
                <TouchableOpacity
                  style={styles.subtitleOption}
                  onPress={handleSubtitleOff}
                >
                  <Text style={styles.subtitleText}>Off</Text>
                  {!selectedSubtitleTitle && (
                    <Ionicons name="checkmark" size={24} color="#fff" />
                  )}
                </TouchableOpacity>

                {subtitles.map((sub, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.subtitleOption}
                    onPress={() => handleSubtitleSelect(sub.title)}
                  >
                    <Text style={styles.subtitleText}>{sub.title}</Text>
                    {selectedSubtitleTitle === sub.title && (
                      <Ionicons name="checkmark" size={24} color="#fff" />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </SafeAreaView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  subtitleButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  subtitlePanel: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '60%',
    paddingTop: 20,
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  subtitleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  subtitleText: {
    fontSize: 16,
    color: '#fff',
  },
});