import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const EMOJIS = [
  '💄', '💋', '💅', '👄', '🧴', 
  '👗', '👠', '✨',
  '👩🏻', '👩🏽', '👩🏿',
];
const NUMBER_OF_EMOJIS = 15;
const FIRST_TIME_KEY = 'HAS_LAUNCHED_BEFORE';

const getRandomPosition = () => ({
  x: Math.random() * width,
  y: Math.random() * (height * 0.8),
});

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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const buttonsFadeAnim = useRef(new Animated.Value(0)).current;
  const titleMoveAnim = useRef(new Animated.Value(-50)).current;
  const navigation = useNavigation();
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const fullSubtitle = 'Your Personal Beauty Assistant';

  const startFloatingAnimation = (emoji: FloatingEmoji) => {
    const animate = () => {
      const nextPosition = getRandomPosition();
      const duration = 8000 + Math.random() * 4000;

      Animated.parallel([
        Animated.timing(emoji.position, {
          toValue: nextPosition,
          duration,
          useNativeDriver: false,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
        Animated.timing(emoji.scale, {
          toValue: Math.random() * 0.3 + 1.1,
          duration: duration / 2,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(emoji.opacity, {
          toValue: Math.random() * 0.3 + 0.2,
          duration: duration / 2,
          useNativeDriver: false,
        }),
      ]).start(() => animate());
    };

    animate();
  };

  const startEntryAnimations = () => {
    Animated.sequence([
      Animated.timing(titleMoveAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.7)),
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(buttonsFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startTypingAnimation = () => {
    let index = 0;
    const typeSpeed = 50;

    const typeNextChar = () => {
      if (index <= fullSubtitle.length) {
        setSubtitleText(fullSubtitle.slice(0, index));
        index++;
        setTimeout(typeNextChar, typeSpeed);
      }
    };

    setTimeout(typeNextChar, 1500);
  };

  useEffect(() => {
    // Initialize animations
    const emojis: FloatingEmoji[] = Array.from({ length: NUMBER_OF_EMOJIS }, () => ({
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      position: new Animated.ValueXY(getRandomPosition()),
      scale: new Animated.Value(Math.random() * 0.3 + 1.2),
      rotation: new Animated.Value(0),
      opacity: new Animated.Value(0.3),
    }));

    setFloatingEmojis(emojis);
    
    // Start floating animations
    emojis.forEach((emoji, index) => {
      setTimeout(() => {
        startFloatingAnimation(emoji);
      }, index * 100);
    });

    // Start other animations
    startEntryAnimations();
    startTypingAnimation();

    // Setup cursor blink
    cursorIntervalRef.current = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Check first time launch
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem(FIRST_TIME_KEY);
        if (!hasLaunched) {
          await AsyncStorage.setItem(FIRST_TIME_KEY, 'true');
        }
      } catch (error) {
        console.warn('Error checking first launch:', error);
      }
    };
    checkFirstLaunch();

    // Cleanup function
    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
      floatingEmojis.forEach(emoji => {
        emoji.position.stopAnimation();
        emoji.scale.stopAnimation();
        emoji.opacity.stopAnimation();
      });
    };
  }, []); // Empty dependency array

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  // Rest of the component remains the same...
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
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
              ],
              opacity: emoji.opacity,
            },
          ]}
        >
          {emoji.emoji}
        </Animated.Text>
      ))}

      <Animated.View 
        style={[
          styles.content,
          {
            transform: [
              { translateY: titleMoveAnim },
            ],
          }
        ]}
      >
        <View style={styles.titleContainer}>
          <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
            VanityAI
          </Animated.Text>
          <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
            {subtitleText}
            <Text style={styles.cursor}>{showCursor ? '|' : ' '}</Text>
          </Animated.Text>
        </View>

        <Animated.View 
          style={[
            styles.buttonContainer,
            {
              opacity: buttonsFadeAnim,
              transform: [{ translateY: buttonsFadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              })}],
            }
          ]}
        >
          <TouchableOpacity 
            style={[styles.button, styles.signupButton]}
            onPress={handleSignup}
            activeOpacity={0.8}
          >
            <Text style={styles.signupButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.loginButton]}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
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
    fontSize: 32,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 120 : 100,
    paddingBottom: 50,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#f49cbb',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(244, 156, 187, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    letterSpacing: 2,
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: 22,
    color: '#fdf0d5',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
    letterSpacing: 1,
  },
  cursor: {
    color: '#fdf0d5',
    opacity: 0.9,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loginButtonText: {
    color: '#f49cbb',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});