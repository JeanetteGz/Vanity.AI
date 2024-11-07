import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>VanityAI</Text>
      <Link href="/auth/signup" style={styles.link}>
        Get Started
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0c1d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fdf0d5',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    color: '#f49cbb',
    fontSize: 18,
  },
});