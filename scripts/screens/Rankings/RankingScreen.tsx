import React, { useState, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { GLOBAL_TOP5 } from '../../utils/constants'
import GlobalCard, { MyCard } from '../../components/RankingCards'


// ─── Types ────────────────────────────────────────────────────────────────────
interface Idea {
  id: string
  startupName: string
  tagline: string
  description: string
  votes: number
  aiscore: number
  createdAt: string
}

// ─── Screen ───────────────────────────────────────────────────────────────────

const RankingScreen = () => {
  const [myIdeas, setMyIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadMyIdeas = async () => {
    try {
      const stored = await AsyncStorage.getItem('startupIdeas')
      if (stored) {
        const all: Idea[] = JSON.parse(stored)
        const top3 = [...all].sort((a, b) => b.votes - a.votes).slice(0, 3)
        setMyIdeas(top3)
      }
    } catch (e) {
      console.log('Failed to load my ideas:', e)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      loadMyIdeas()
    }, [])
  )

  const onRefresh = () => {
    setRefreshing(true)
    loadMyIdeas()
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <MaterialCommunityIcons name="trophy" size={22} color="#F59E0B" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Rankings</Text>
          <Text style={styles.headerSub}>Global leaderboard · Top ideas</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="globe-outline" size={15} color="#6B7280" />
            <Text style={styles.sectionTitle}>Global top 5</Text>
          </View>

          {GLOBAL_TOP5.map((idea, idx) => (
            <GlobalCard key={idea.id} idea={idea} rank={idx + 1} />
          ))}

          <View style={[styles.sectionHeader, { marginTop: 32 }]}>
            <Ionicons name="person-circle-outline" size={15} color="#6B7280" />
            <Text style={styles.sectionTitle}>Your top 3 ideas</Text>
          </View>

          {myIdeas.length === 0 ? (
            <View style={styles.emptyBox}>
              <Ionicons name="bulb-outline" size={32} color="#D1D5DB" />
              <Text style={styles.emptyText}>No ideas yet</Text>
              <Text style={styles.emptyHint}>Head to Forge to create your first idea.</Text>
            </View>
          ) : (
            myIdeas.map((idea, idx) => (
              <MyCard key={idea.id} idea={idea} rank={idx + 1} />
            ))
          )}

          <View style={{ height: 100 }} />
        </ScrollView>
      )}
    </View>
  )
}

export default RankingScreen;


const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: '#F3F4F6' 
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 44, 
    height: 44, 
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#111827' 
  },
  headerSub: { 
    fontSize: 13, 
    color: '#6B7280', 
    marginTop: 1 
  },

  scroll: { 
    paddingHorizontal: 16, 
    paddingTop: 20 
  },

  sectionHeader: {
    flexDirection: 'row', 
    alignItems: 'center', gap: 6, 
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11, 
    fontWeight: '700', 
    color: '#6B7280',
    textTransform: 'uppercase', 
    letterSpacing: 1,
  },
  //Empty
  emptyBox: {
    alignItems: 'center', 
    paddingVertical: 36,
    backgroundColor: '#fff', 
    borderRadius: 18,
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    gap: 6,
  },
  emptyText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#9CA3AF', 
    marginTop: 4 
  },
  emptyHint: { 
    fontSize: 13, 
    color: '#D1D5DB' 
  },

  centered: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
})