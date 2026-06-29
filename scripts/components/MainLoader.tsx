import React, { useEffect, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native'
import LottieView from 'lottie-react-native'

const MainLoader = ({ onFinish }: { onFinish: () => void }) => {
  // Animation values
  const lottieOpacity   = useRef(new Animated.Value(0)).current
  const lottieScale     = useRef(new Animated.Value(0.6)).current
  const titleOpacity    = useRef(new Animated.Value(0)).current
  const titleTranslateY = useRef(new Animated.Value(18)).current
  const taglineOpacity  = useRef(new Animated.Value(0)).current
  const taglineTranslateY = useRef(new Animated.Value(10)).current
  const dividerWidth    = useRef(new Animated.Value(0)).current
  const containerOpacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    // ── Phase 1: Lottie fades + scales in ──
    Animated.parallel([
      Animated.timing(lottieOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(lottieScale, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start(() => {

      // ── Phase 2: Divider line draws in ──
      Animated.timing(dividerWidth, {
        toValue: 1,          // used as scaleX on a fixed-width view
        duration: 400,
        useNativeDriver: true,
      }).start(() => {

        // ── Phase 3: Title slides up ──
        Animated.parallel([
          Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 450,
            useNativeDriver: true,
          }),
          Animated.spring(titleTranslateY, {
            toValue: 0,
            friction: 7,
            tension: 80,
            useNativeDriver: true,
          }),
        ]).start(() => {

          // ── Phase 4: Tagline fades in ──
          Animated.parallel([
            Animated.timing(taglineOpacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.spring(taglineTranslateY, {
              toValue: 0,
              friction: 7,
              tension: 80,
              useNativeDriver: true,
            }),
          ]).start(() => {

            // ── Hold for a beat, then fade the whole screen out ──
            setTimeout(() => {
              Animated.timing(containerOpacity, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
              }).start(() => onFinish?.())
            }, 900)
          })
        })
      })
    })
  }, [])

  return (
    <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A14" />

      {/* ── Lottie logo ── */}
      <Animated.View
        style={[
          styles.lottieWrapper,
          { opacity: lottieOpacity, transform: [{ scale: lottieScale }] },
        ]}
      >
        <LottieView
          source={require('../../assets/IdeaForge-animation.json')}
          autoPlay
          loop={false}
          speed={0.7}
          style={styles.lottie}
        />
      </Animated.View>

      {/* ── Animated divider ── */}
      <Animated.View
        style={[
          styles.divider,
          { transform: [{ scaleX: dividerWidth }] },
        ]}
      />

      {/* ── App name ── */}
      <Animated.Text
        style={[
          styles.appName,
          {
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }],
          },
        ]}
      >
        IdeaForge
      </Animated.Text>

      {/* ── Tagline ── */}
      <Animated.Text
        style={[
          styles.tagline,
          {
            opacity: taglineOpacity,
            transform: [{ translateY: taglineTranslateY }],
          },
        ]}
      >
        Where sparks become blueprints.
      </Animated.Text>
    </Animated.View>
  )
}

export default MainLoader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4FE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  // Lottie
  lottieWrapper: {
    marginBottom: 24,
  },
  lottie: {
    width: 300,
    height: 300,
  },

  // Divider
  divider: {
    width: 48,
    height: 1.5,
    backgroundColor: '#6C63FF',
    borderRadius: 2,
    marginBottom: 18,
    // scaleX animates from 0 → 1, origin is center
    transformOrigin: 'center',
  },

  // App name
  appName: {
    fontSize: 38,
    fontWeight: '700',
    letterSpacing: 2.5,
    color: '#0058be',
    textAlign: 'center',
    marginBottom: 10,
  },

  // Tagline
  tagline: {
    fontSize: 13.5,
    fontWeight: '400',
    letterSpacing: 1.8,
    color: '#9E9BB5',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
})