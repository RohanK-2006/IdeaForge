import React, { useState, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import IdeaCard, { EmptyState } from '../../components/IdeaCard'

interface Idea {
  id: string
  startupName: string
  tagline: string
  description: string
  votes: number
  aiscore: number
  createdAt: string
}

// Key that stores a Set of idea IDs the user has voted on
const VOTED_KEY = 'votedIdeaIds'

const getVotedIds = async (): Promise<Set<string>> => {
  const stored = await AsyncStorage.getItem(VOTED_KEY)
  return stored ? new Set(JSON.parse(stored)) : new Set()
}

const saveVotedIds = async (ids: Set<string>) => {
  await AsyncStorage.setItem(VOTED_KEY, JSON.stringify([...ids]))
}

const updateIdeaVotes = async (ideaId: string, newVotes: number) => {
  const stored = await AsyncStorage.getItem('startupIdeas')
  if (!stored) return
  const ideas: Idea[] = JSON.parse(stored)
  const updated = ideas.map(i => (i.id === ideaId ? { ...i, votes: newVotes } : i))
  await AsyncStorage.setItem('startupIdeas', JSON.stringify(updated))
}



//HomeScreen

const HomeScreen = () => {
  const navigation = useNavigation<any>()
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState<'topRated' | 'mostVoted'>('topRated')

  const loadData = async () => {
    try {
      const [stored, voted] = await Promise.all([
        AsyncStorage.getItem('startupIdeas'),
        getVotedIds(),
      ])
      setIdeas(stored ? JSON.parse(stored) : [])
      setVotedIds(voted)
    } catch (e) {
      console.log('Failed to load data:', e)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      loadData()
    }, [])
  )

  const onRefresh = () => {
    setRefreshing(true)
    loadData()
  }

  const handleVote = async (ideaId: string, currentVotes: number, alreadyVoted: boolean) => {
    const newVotes = alreadyVoted ? currentVotes - 1 : currentVotes + 1

    // 1. Update local state immediately (optimistic UI)
    setIdeas(prev =>
      prev.map(i => (i.id === ideaId ? { ...i, votes: newVotes } : i))
    )

    const newVotedIds = new Set(votedIds)
    if (alreadyVoted) {
      newVotedIds.delete(ideaId)
    } else {
      newVotedIds.add(ideaId)
    }
    setVotedIds(newVotedIds)

    try {
      await Promise.all([
        updateIdeaVotes(ideaId, newVotes),
        saveVotedIds(newVotedIds),
      ])
    } catch (e) {
      console.log('Failed to save vote:', e)
      // Rollback on failure
      setIdeas(prev =>
        prev.map(i => (i.id === ideaId ? { ...i, votes: currentVotes } : i))
      )
      setVotedIds(votedIds)
    }
  }

  const sortedIdeas = [...ideas].sort((a, b) =>
    activeTab === 'topRated' ? b.aiscore - a.aiscore : b.votes - a.votes
  )

  return (
    <View style={styles.screen}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Your Ideas</Text>
        <Text style={styles.pageSubtitle}>Your latest brilliance, forged and ready.</Text>

        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'topRated' && styles.tabActive]}
            onPress={() => setActiveTab('topRated')}
          >
            <Text style={[styles.tabText, activeTab === 'topRated' && styles.tabTextActive]}>
              Top Rated
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'mostVoted' && styles.tabActive]}
            onPress={() => setActiveTab('mostVoted')}
          >
            <Text style={[styles.tabText, activeTab === 'mostVoted' && styles.tabTextActive]}>
              Most Voted
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : ideas.length === 0 ? (
        <EmptyState onPress={() => navigation.navigate('Forge')} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {sortedIdeas.map(idea => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              voted={votedIds.has(idea.id)}
              onVote={handleVote}
            />
          ))}
          <View style={{ height: 100 }} />
        </ScrollView>
      )}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  // ── Header
  pageHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 14,
  },

  // ── Tabs
  tabRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  tabActive: {
    backgroundColor: '#2563EB',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },

  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 14,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})