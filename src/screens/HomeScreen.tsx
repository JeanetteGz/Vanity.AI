// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const EMOJIS = ['💄', '💋', '💅', '👄', '🧴', '🎭', '💆‍♀️', '💇‍♀️', '👗', '👠', '✨'];
const NUMBER_OF_EMOJIS = 10; // Reduced number of emojis for cleaner look

interface FloatingEmoji {
  emoji: string;
  position: Animated.ValueXY;
  scale: Animated.Value;
  rotation: Animated.Value;
  opacity: Animated.Value;
}

export default function HomeScreen() {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [subtitleText, setSubtitleText] = useState('');
  const fullSubtitle = 'Your Personal Beauty Assistant';
  const navigation = useNavigation(); // Use navigation only once inside the component

  useEffect(() => {
    const emojis: FloatingEmoji[] = [];
    for (let i = 0; i < NUMBER_OF_EMOJIS; i++) {
      emojis.push({
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        position: new Animated.ValueXY({
          x: Math.random() * width,
          y: Math.random() * height,
        }),
        scale: new Animated.Value(Math.random() * 0.3 + 1.2),
        rotation: new Animated.Value(0),
        opacity: new Animated.Value(0.4),
      });
    }
    setFloatingEmojis(emojis);

    emojis.forEach((emoji) => startAnimation(emoji));

    startTypingAnimation();

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const startTypingAnimation = () => {
    setSubtitleText('');
    let index = 0;
    let currentText = '';

    const typeSubtitle = () => {
      if (index < fullSubtitle.length) {
        currentText += fullSubtitle[index];
        setSubtitleText(currentText);
        index++;
        setTimeout(typeSubtitle, 100);
      }
    };

    typeSubtitle();
  };

  const startAnimation = (emoji: FloatingEmoji) => {
    const duration = 8000 + Math.random() * 4000;

    Animated.parallel([
      Animated.timing(emoji.position, {
        toValue: {
          x: Math.random() * width,
          y: Math.random() * height,
        },
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(emoji.rotation, {
        toValue: 360,
        duration: duration * 1.5,
        useNativeDriver: false,
      }),
    ]).start(() => {
      emoji.rotation.setValue(0);
      startAnimation(emoji);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1733', '#231f45', '#2a2552', '#231f45', '#1a1733']}
        style={styles.gradient}
        locations={[0, 0.3, 0.5, 0.7, 1]}
      />

      {floatingEmojis.map((emoji, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.floatingEmoji,
            {
              transform: [
                { translateX: emoji.position.x },
                { translateY: emoji.position.y },
                { scale: emoji.scale },
                {
                  rotate: emoji.rotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
              opacity: emoji.opacity,
            },
          ]}
        >
          {emoji.emoji}
        </Animated.Text>
      ))}

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>VanityAI</Text>
          <Text style={styles.subtitle}>
            {subtitleText}
            <Text>{showCursor ? '|' : ' '}</Text>
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.signupButton]}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.loginButton]}
            onPress={() => console.log('Login pressed')}
          >
            <Text style={styles.loginButtonText}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0c1d',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  floatingEmoji: {
    position: 'absolute',
    fontSize: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 100,
    paddingBottom: 50,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#f49cbb',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(244, 156, 187, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 20,
    color: '#fdf0d5',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
    letterSpacing: 1,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  signupButton: {
    backgroundColor: '#2892d7',
    shadowColor: '#2892d7',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 5,
  },
  loginButton: {
    backgroundColor: 'rgba(244, 156, 187, 0.1)',
    borderWidth: 1.5,
    borderColor: '#f49cbb',
  },
  signupButtonText: {
    color: '#fdf0d5',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loginButtonText: {
    color: '#f49cbb',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
