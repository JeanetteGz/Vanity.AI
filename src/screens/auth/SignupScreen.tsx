import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSignUp = async () => {
    // We'll implement this later with Firebase
    console.log('Sign up:', { email, password, username });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join VanityAI to discover your perfect beauty matches</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>USERNAME</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor="#6B7280"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#6B7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor="#6B7280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              style={styles.button}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <Link href="/auth/login" asChild>
              <TouchableOpacity style={styles.linkButton}>
                <Text style={styles.linkText}>
                  Already have an account? <Text style={styles.linkTextBold}>Log in</Text>
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0c1d', // Rich black
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fdf0d5', // Papaya whip
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#cbeef3', // Light cyan
    textAlign: 'center',
    opacity: 0.8,
  },
  form: {
    backgroundColor: 'rgba(203, 238, 243, 0.05)', // Light cyan with opacity
    borderRadius: 20,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#f49cbb', // Amaranth pink
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: 'rgba(253, 240, 213, 0.1)', // Papaya whip with opacity
    borderRadius: 12,
    padding: 15,
    color: '#fdf0d5', // Papaya whip
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2892d7', // Celestial blue
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fdf0d5', // Papaya whip
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(203, 238, 243, 0.2)', // Light cyan with opacity
  },
  dividerText: {
    color: '#cbeef3', // Light cyan
    paddingHorizontal: 10,
    fontSize: 14,
  },
  linkButton: {
    alignItems: 'center',
  },
  linkText: {
    color: '#cbeef3', // Light cyan
    fontSize: 14,
  },
  linkTextBold: {
    color: '#f49cbb', // Amaranth pink
    fontWeight: 'bold',
  },
});