import React, { Activity, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native'
import { ActivityIndicator, Snackbar } from 'react-native-paper'
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const ForgeScreen = () => {
  const [startupName, setStartupName] = useState('')
  const [tagline, setTagline] = useState('')
  const [description, setDescription] = useState('')
  const [submitForgeText, setSubmitForgeText] = useState('Forge Your Idea')
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarError, setSnackbarError] = useState(false)

  const navigation = useNavigation();

  const handleForge = async() => {
    Keyboard.dismiss() 
    if (!startupName.trim()) {
      setSnackbarMessage('Please enter a startup name.')
      setSnackbarError(true)
      setSnackbarVisible(true)
      return
    }
    if (!tagline.trim()) {
      setSnackbarMessage('Please add a tagline.')
      setSnackbarError(true)
      setSnackbarVisible(true)
      return
    }
    if (!description.trim()) {
      setSnackbarMessage('Please describe your idea.')
      setSnackbarError(true)
      setSnackbarVisible(true)
      return
    }
    try {

      setSubmitForgeText('Evalauting Ai Score...')
      const MockAiScore = Math.floor(Math.random() * 51) + 50;

      setSubmitForgeText('Forging Your Idea...')
      const newIdea = {
        id: Date.now().toString(),
        startupName,
        tagline,
        description,
        votes: 0,
        aiscore: MockAiScore,
        createdAt: new Date().toISOString(),
      }

      const existingIdeas = await AsyncStorage.getItem('startupIdeas')

      const ideas = existingIdeas
        ? JSON.parse(existingIdeas)
        : []

      ideas.push(newIdea)

      console.log(ideas)

      await AsyncStorage.setItem(
        'startupIdeas',
        JSON.stringify(ideas)
      )

      setSnackbarMessage('Your idea has been forged successfully!')
      setSnackbarError(false)
      setSnackbarVisible(true)

      setStartupName('')
      setSubmitForgeText('Forge Your Idea')
      setTagline('')
      setDescription('')

      await new Promise(resolve => setTimeout(resolve, 2000))
      
      navigation.goBack();
    }catch (error) {
      console.log(error)
      setSnackbarMessage('Failed to save idea.')
      setSnackbarError(true)
      setSnackbarVisible(true)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create New Venture</Text>
          <Text style={styles.subtitle}>
            Turn your spark into a flame. Describe your startup idea and let the community help you refine it.
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          {/* Startup Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Startup Name</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="e.g. EcoSphere"
                placeholderTextColor="#aaa"
                value={startupName}
                onChangeText={setStartupName}
              />
              <Ionicons name="rocket-outline" size={20} color="#aaa" />
            </View>
          </View>

          {/* Tagline */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Tagline</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Briefly describe the core value..."
                placeholderTextColor="#aaa"
                value={tagline}
                onChangeText={(text) => text.length <= 60 && setTagline(text)}
                maxLength={60}
              />
              <MaterialIcons name="auto-awesome" size={20} color="#aaa" />
            </View>
            <Text style={styles.hint}>Maximum 60 characters for high impact.</Text>
          </View>

          {/* Description */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder={'What problem are you solving?\nHow does it work?'}
              placeholderTextColor="#aaa"
              value={description}
              onChangeText={(text) => text.length <= 500 && setDescription(text)}
              multiline
              maxLength={500}
              textAlignVertical="top"
            />
            <View style={styles.descFooter}>
              <Text style={styles.hint}>Be as detailed as possible to get better feedback.</Text>
              <Text style={styles.charCount}>{description.length} / 500</Text>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.forgeButton} onPress={handleForge} activeOpacity={0.85}>
            {submitForgeText === 'Forge Your Idea' ? (
              <Ionicons name="add-circle-outline" size={24} color="#fff" />
            ) : (
              <ActivityIndicator size="small" color="#fff"/>
            )}
            <Text style={styles.forgeButtonText}>{submitForgeText}</Text>
          </TouchableOpacity>

          {/* Quote */}
          <Text style={styles.quote}>
            "The best way to predict the future is to create it."
          </Text>
        </View>

        {/* Tips */}
        <View style={styles.tipCard}>
          <View style={[styles.tipIcon, { backgroundColor: '#1a7a5e' }]}>
            <Ionicons name="bulb-outline" size={22} color="#fff" />
          </View>
          <View style={styles.tipText}>
            <Text style={styles.tipTitle}>Keep it Simple</Text>
            <Text style={styles.tipDesc}>Focus on the core 'Why' before the 'How'.</Text>
          </View>
        </View>

        <View style={[styles.tipCard, { backgroundColor: '#fef6e4' }]}>
          <View style={[styles.tipIcon, { backgroundColor: '#b45309' }]}>
            <FontAwesome5 name="users" size={18} color="#fff" />
          </View>
          <View style={styles.tipText}>
            <Text style={[styles.tipTitle, { color: '#92400e' }]}>Community Ready</Text>
            <Text style={styles.tipDesc}>Open ideas get 3x more validation points.</Text>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={[
          styles.snackbar,
          { backgroundColor: snackbarError ? '#dc2626' : '#16a34a' },
        ]}
        action={{
          label: 'OK',
          labelStyle: { color: '#fff' },
          onPress: () => setSnackbarVisible(false),
        }}
      >
        <Text style={styles.snackbarText}>{snackbarMessage}</Text>
      </Snackbar>
    </KeyboardAvoidingView>
  )
}

export default ForgeScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Card
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  // Fields
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fafafa',
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: '#111827',
  },
  textArea: {
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#fafafa',
    minHeight: 120,
  },
  descFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    alignItems: 'flex-start',
  },
  hint: {
    fontSize: 12,
    color: '#9ca3af',
    flex: 1,
    marginTop: 5,
  },
  charCount: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 5,
  },

  // Forge Button
  forgeButton: {
    backgroundColor: '#2563eb',
    borderRadius: 14,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    gap: 8,
  },
  forgeButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },

  // Quote
  quote: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: 14,
  },

  // Tips
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    gap: 12,
  },
  tipIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#065f46',
    marginBottom: 2,
  },
  tipDesc: {
    fontSize: 13,
    color: '#6b7280',
  },

  // Snackbar
  snackbar: {
    marginBottom: 8,
    borderRadius: 10,
  },
  snackbarText: {
    color: '#fff',
    fontSize: 14,
  },
})