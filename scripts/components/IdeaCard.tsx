import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// ── Helpers ──────────────────────────────────────────────────────────────────

const getInitial = (name: string) => name?.charAt(0)?.toUpperCase() ?? '?'

const avatarColors: Record<string, string> = {}
const palette = ['#4A90E2', '#E8A838', '#7DC87D', '#E27B7B', '#9B7DE8', '#4ABFBF']
const getAvatarColor = (name: string) => {
  if (!avatarColors[name]) {
    const index = name.charCodeAt(0) % palette.length
    avatarColors[name] = palette[index]
  }
  return avatarColors[name]
}

const formatVotes = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n)


interface Idea {
  id: string
  startupName: string
  tagline: string
  description: string
  votes: number
  aiscore: number
  createdAt: string
}

// ── IdeaCard ─────────────────────────────────────────────────────────────────

interface IdeaCardProps {
  idea: Idea
  voted: boolean
  onVote: (id: string, currentVotes: number, voted: boolean) => void
}

export const IdeaCard = ({ idea, voted, onVote }: IdeaCardProps) => {
  const [expanded, setExpanded] = useState(false)

  const scoreColor = idea.aiscore >= 90 ? '#2563EB' : '#6B7280'

  return (
    <View style={[styles.card, voted && styles.cardVoted]}>
      {/* Header row */}
      <View style={styles.cardHeader}>
        <View style={[styles.avatar, { backgroundColor: getAvatarColor(idea.startupName) }]}>
          <Text style={styles.avatarText}>{getInitial(idea.startupName)}</Text>
        </View>

        <View style={styles.headerRight}>
          {/* "Voted" badge shown when user has voted */}
          {voted && (
            <View style={styles.votedBadge}>
              <Text style={styles.votedBadgeText}>✓ Voted</Text>
            </View>
          )}
          <View style={[styles.scoreBadge, { backgroundColor: scoreColor }]}>
            <Text style={styles.scoreText}>{idea.aiscore} AI Score</Text>
          </View>
        </View>
      </View>

      {/* Name & tagline */}
      <Text style={styles.cardTitle}>{idea.startupName}</Text>
      <Text style={styles.cardTagline}>{idea.tagline.toUpperCase()}</Text>

      {/* Description with Read more / Show less */}
      <Text
        style={styles.cardDescription}
        numberOfLines={expanded ? undefined : 3}
      >
        {idea.description}
      </Text>
      <TouchableOpacity onPress={() => setExpanded(prev => !prev)}>
        <Text style={styles.readMore}>{expanded ? 'Show less' : 'Read more'}</Text>
      </TouchableOpacity>

      {/* Footer: votes + upvote button */}
      <View style={styles.cardFooter}>
        <Text style={styles.votesLabel}>{formatVotes(idea.votes)} votes</Text>

        <TouchableOpacity
          style={[styles.upvoteBtn, voted && styles.upvoteBtnActive]}
          onPress={() => onVote(idea.id, idea.votes, voted)}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-up" style={[styles.upvoteArrow, voted && styles.upvoteArrowActive]}/>
          <Text style={[styles.upvoteCount, voted && styles.upvoteCountActive]}>
            {formatVotes(idea.votes)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// ── Empty State ───────────────────────────────────────────────────────────────

export const EmptyState = ({ onPress }: { onPress: () => void }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyIcon}>💡</Text>
    <Text style={styles.emptyTitle}>No ideas yet!</Text>
    <Text style={styles.emptySubtitle}>
      Your next big thing is waiting to be forged. Be the first to spark an idea.
    </Text>
    <TouchableOpacity style={styles.emptyButton} onPress={onPress}>
      <Text style={styles.emptyButtonText}>Forge Your First Idea</Text>
    </TouchableOpacity>
  </View>
)

export default IdeaCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  cardVoted: {
    borderColor: '#2563EB',
    backgroundColor: '#F0F6FF',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  scoreBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  votedBadge: {
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  votedBadgeText: {
    color: '#1D4ED8',
    fontSize: 11,
    fontWeight: '700',
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 3,
  },
  cardTagline: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 13.5,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 4,
  },
  readMore: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '500',
    marginBottom: 12,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  votesLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  upvoteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    gap: 4,
    backgroundColor: '#FFFFFF',
  },
  upvoteBtnActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  upvoteArrow: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  upvoteArrowActive: {
    color: '#FFFFFF',
  },
  upvoteCount: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
  },
  upvoteCountActive: {
    color: '#FFFFFF',
  },

  // ── Empty state
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 21,
  },
  emptyButton: {
    marginTop: 8,
    backgroundColor: '#2563EB',
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 13,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
})