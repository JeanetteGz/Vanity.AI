import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface QuestionOption {
  id: string;
  label: string;
}

interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

const questions: Question[] = [
  {
    id: 'skinType',
    question: 'What's your skin type?',
    options: [
      { id: 'oily', label: 'Oily' },
      { id: 'dry', label: 'Dry' },
      { id: 'combination', label: 'Combination' },
      { id: 'normal', label: 'Normal' },
      { id: 'sensitive', label: 'Sensitive' },
    ],
  },
  {
    id: 'concerns',
    question: 'What are your main skin concerns?',
    options: [
      { id: 'acne', label: 'Acne' },
      { id: 'aging', label: 'Aging' },
      { id: 'darkSpots', label: 'Dark Spots' },
      { id: 'dullness', label: 'Dullness' },
      { id: 'pores', label: 'Large Pores' },
      { id: 'redness', label: 'Redness' },
    ],
  },
  {
    id: 'routine',
    question: 'How would you describe your current skincare routine?',
    options: [
      { id: 'minimal', label: 'Minimal (1-2 products)' },
      { id: 'moderate', label: 'Moderate (3-5 products)' },
      { id: 'extensive', label: 'Extensive (6+ products)' },
      { id: 'none', label: 'No routine yet' },
    ],
  },
  {
    id: 'goals',
    question: 'What are your skincare goals?',
    options: [
      { id: 'clear', label: 'Clear skin' },
      { id: 'glow', label: 'Healthy glow' },
      { id: 'younger', label: 'Anti-aging' },
      { id: 'even', label: 'Even skin tone' },
      { id: 'hydrated', label: 'Hydration' },
    ],
  },
];

export default function SkinQuestionsScreen() {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const navigation = useNavigation();

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      // Toggle selection
      const newAnswers = currentAnswers.includes(optionId)
        ? currentAnswers.filter(id => id !== optionId)
        : [...currentAnswers, optionId];
      
      return {
        ...prev,
        [questionId]: newAnswers
      };
    });
  };

  const isOptionSelected = (questionId: string, optionId: string) => {
    return answers[questionId]?.includes(optionId) || false;
  };

  const handleContinue = () => {
    // Here you would normally save the answers
    console.log('Answers:', answers);
    // Navigate to the next screen
    navigation.navigate('Home'); // Replace with your next screen
  };

  const allQuestionsAnswered = () => {
    return questions.every(q => answers[q.id]?.length > 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1a1733', '#231f45', '#2a2552', '#231f45', '#1a1733']}
        style={styles.gradient}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Tell Me More About You!</Text>
          <Text style={styles.subtitle}>
            Let's personalize your skincare experience
          </Text>

          {questions.map((question) => (
            <View key={question.id} style={styles.questionContainer}>
              <Text style={styles.question}>{question.question}</Text>
              <View style={styles.optionsContainer}>
                {question.options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      isOptionSelected(question.id, option.id) && styles.selectedOption,
                    ]}
                    onPress={() => handleSelect(question.id, option.id)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isOptionSelected(question.id, option.id) && styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !allQuestionsAnswered() && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!allQuestionsAnswered()}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f49cbb',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: Platform.OS === 'android' ? 40 : 0,
  },
  subtitle: {
    fontSize: 16,
    color: '#fdf0d5',
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 40,
  },
  questionContainer: {
    marginBottom: 30,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fdf0d5',
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  optionButton: {
    backgroundColor: 'rgba(253, 240, 213, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    margin: 5,
    borderWidth: 1,
    borderColor: 'rgba(244, 156, 187, 0.3)',
  },
  selectedOption: {
    backgroundColor: '#f49cbb',
    borderColor: '#f49cbb',
  },
  optionText: {
    color: '#fdf0d5',
    fontSize: 14,
  },
  selectedOptionText: {
    color: '#0d0c1d',
    fontWeight: '600',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(13, 12, 29, 0.95)',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  continueButton: {
    backgroundColor: '#2892d7',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: '#fdf0d5',
    fontSize: 16,
    fontWeight: 'bold',
  },
});