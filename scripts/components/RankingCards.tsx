import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface Idea {
  id: string;
  startupName: string;
  tagline: string;
  description: string;
  votes: number;
  aiscore: number;
  createdAt: string;
}

const RANK_THEME = [
  {
    cardBg: "#FFFBEB",
    borderColor: "#FCD34D",
    borderWidth: 2,
    badgeBg: "#F59E0B",
    badgeText: "#fff",
    label: "🥇 Gold",
    labelBg: "#FEF3C7",
    labelColor: "#92400E",
  },
  {
    cardBg: "#F8FAFC",
    borderColor: "#CBD5E1",
    borderWidth: 2,
    badgeBg: "#94A3B8",
    badgeText: "#fff",
    label: "🥈 Silver",
    labelBg: "#F1F5F9",
    labelColor: "#475569",
  },
  {
    cardBg: "#FFF7ED",
    borderColor: "#FDBA74",
    borderWidth: 2,
    badgeBg: "#EA580C",
    badgeText: "#fff",
    label: "🥉 Bronze",
    labelBg: "#FFF7ED",
    labelColor: "#9A3412",
  },
  {
    cardBg: "#F9FAFB",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    badgeBg: "#6B7280",
    badgeText: "#fff",
    label: "",
    labelBg: "",
    labelColor: "",
  },
  {
    cardBg: "#F9FAFB",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    badgeBg: "#6B7280",
    badgeText: "#fff",
    label: "",
    labelBg: "",
    labelColor: "",
  },
];

const MY_THEME = [
  {
    cardBg: "#EFF6FF",
    borderColor: "#93C5FD",
    pillBg: "#2563EB",
    voteColor: "#2563EB",
  },
  {
    cardBg: "#F0FDF4",
    borderColor: "#86EFAC",
    pillBg: "#16A34A",
    voteColor: "#16A34A",
  },
  {
    cardBg: "#FDF4FF",
    borderColor: "#E879F9",
    pillBg: "#A21CAF",
    voteColor: "#A21CAF",
  },
];

// ─── Global card ──────────────────────────────────────────────────────────────

export const GlobalCard = ({ idea, rank }: { idea: Idea; rank: number }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = RANK_THEME[rank - 1] ?? RANK_THEME[3];
  const isMedal = rank <= 3;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((v) => !v);
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBg,
          borderColor: theme.borderColor,
          borderWidth: theme.borderWidth,
        },
      ]}
    >
      {/* Top accent strip for medal cards */}
      {isMedal && (
        <View
          style={[styles.accentStrip, { backgroundColor: theme.badgeBg }]}
        />
      )}

      <View style={styles.cardInner}>
        {/* Header row */}
        <View style={styles.cardHeader}>
          <View style={[styles.rankBadge, { backgroundColor: theme.badgeBg }]}>
            {isMedal ? (
              <MaterialCommunityIcons name="trophy" size={15} color="#fff" />
            ) : (
              <Text style={styles.rankBadgeText}>{rank}</Text>
            )}
          </View>

          <View style={styles.cardHeaderText}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {idea.startupName}
            </Text>
            <Text style={styles.cardTagline} numberOfLines={1}>
              {idea.tagline}
            </Text>
          </View>

          {isMedal && (
            <View
              style={[styles.medalPill, { backgroundColor: theme.labelBg }]}
            >
              <Text style={[styles.medalPillText, { color: theme.labelColor }]}>
                {theme.label}
              </Text>
            </View>
          )}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Description */}
        <Text style={styles.cardDesc} numberOfLines={expanded ? undefined : 3}>
          {idea.description}
        </Text>

        <TouchableOpacity
          onPress={toggle}
          style={styles.readMoreBtn}
          activeOpacity={0.6}
        >
          <Text style={[styles.readMoreText, { color: theme.badgeBg }]}>
            {expanded ? "Show less" : "Read more"}
          </Text>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={13}
            color={theme.badgeBg}
          />
        </TouchableOpacity>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="heart" size={14} color="#EF4444" />
            <Text style={styles.statValue}>{idea.votes.toLocaleString()}</Text>
            <Text style={styles.statLabel}>votes</Text>
          </View>
          <View style={styles.statDot} />
          <View style={styles.statItem}>
            <Ionicons name="sparkles" size={14} color="#8B5CF6" />
            <Text style={styles.statValue}>{idea.aiscore}</Text>
            <Text style={styles.statLabel}>AI score</Text>
          </View>
          <View style={{ flex: 1 }} />
          {/* Rank score bar */}
          <View style={styles.scoreBarWrap}>
            <View
              style={[
                styles.scoreBar,
                {
                  width: `${idea.aiscore}%` as any,
                  backgroundColor: theme.badgeBg,
                },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

// ─── My card ──────────────────────────────────────────────────────────────────

export const MyCard = ({ idea, rank }: { idea: Idea; rank: number }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = MY_THEME[rank - 1] ?? MY_THEME[0];

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((v) => !v);
  };

  return (
    <View
      style={[
        styles.myCard,
        { backgroundColor: theme.cardBg, borderColor: theme.borderColor },
      ]}
    >
      <View style={styles.myCardTop}>
        <View style={[styles.myRankPill, { backgroundColor: theme.pillBg }]}>
          <Text style={styles.myRankText}>#{rank}</Text>
        </View>
        <View style={styles.myCardMeta}>
          <Text style={styles.myCardTitle} numberOfLines={1}>
            {idea.startupName}
          </Text>
          <Text style={styles.myCardTagline} numberOfLines={1}>
            {idea.tagline}
          </Text>
        </View>
        <View style={styles.myCardVotes}>
          <Ionicons name="heart" size={13} color="#EF4444" />
          <Text style={[styles.myVoteCount, { color: theme.pillBg }]}>
            {idea.votes}
          </Text>
        </View>
      </View>

      <Text style={styles.myCardDesc} numberOfLines={expanded ? undefined : 3}>
        {idea.description}
      </Text>

      <TouchableOpacity
        onPress={toggle}
        style={styles.readMoreBtn}
        activeOpacity={0.6}
      >
        <Text style={[styles.readMoreText, { color: theme.pillBg }]}>
          {expanded ? "Show less" : "Read more"}
        </Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={13}
          color={theme.pillBg}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GlobalCard;

const styles = StyleSheet.create({
    card: {
    borderRadius: 18,
    marginBottom: 14,
    overflow: "hidden",
    },
    accentStrip: {
        height: 4,
        width: "100%",
    },
    cardInner: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
    },
    rankBadge: {
        width: 36,
        height: 36,
        borderRadius: 11,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    rankBadgeText: { 
        fontSize: 16, 
        fontWeight: "700", 
        color: "#fff" 
    },
    cardHeaderText: { 
        flex: 1, 
        minWidth: 0 
    },
    cardTitle: { 
        fontSize: 15, 
        fontWeight: "700", 
        color: "#111827" 
    },
    cardTagline: { 
        fontSize: 12, 
        color: "#6B7280", 
        marginTop: 1 
    },
    medalPill: {
        paddingHorizontal: 9,
        paddingVertical: 4,
        borderRadius: 20,
        flexShrink: 0,
    },
    medalPillText: { 
        fontSize: 11, 
        fontWeight: "700" 
    },
    divider: { 
        height: 1, 
        backgroundColor: "#F3F4F6", 
        marginBottom: 12 
    },
    cardDesc: { 
        fontSize: 13, 
        color: "#374151", 
        lineHeight: 20, 
        marginBottom: 8 
    },
    readMoreBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 14,
        alignSelf: "flex-start",
    },
    readMoreText: { 
        fontSize: 13, 
        fontWeight: "600" 
    },

    statsRow: { 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 8 
    },
    statItem: { 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 4 
    },
    statValue: { 
        fontSize: 13, 
        fontWeight: "700", 
        color: "#111827" 
    },
    statLabel: { 
        fontSize: 12,
        color: "#9CA3AF" 
    },
    statDot: {
        width: 3,
        height: 3,
        borderRadius: 2,
        backgroundColor: "#D1D5DB",
    },
    scoreBarWrap: {
        width: 60,
        height: 5,
        borderRadius: 3,
        backgroundColor: "#E5E7EB",
        overflow: "hidden",
    },
    scoreBar: { 
        height: 5, 
        borderRadius: 3 
    },

    myCard: {
        borderRadius: 16,
        borderWidth: 1.5,
        padding: 14,
        marginBottom: 12,
    },
    myCardTop: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
    },
    myRankPill: {
        width: 32,
        height: 32,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    myRankText: { 
        fontSize: 14, 
        fontWeight: "700", 
        color: "#fff" 
    },
    myCardMeta: { 
        flex: 1, 
        minWidth: 0 
    },
    myCardTitle: { 
        fontSize: 14, 
        fontWeight: "700", 
        color: "#111827" 
    },
    myCardTagline: { 
        fontSize: 12, 
        color: "#6B7280", 
        marginTop: 1 
    },
    myCardVotes: { 
        alignItems: "center", 
        gap: 2, 
        flexShrink: 0 
    },
    myVoteCount: { 
        fontSize: 14, 
        fontWeight: "700" 
    },
    myCardDesc: {
        fontSize: 13,
        color: "#374151",
        lineHeight: 19,
        marginBottom: 8,
    },
});
