import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function DashboardScreen({ navigation }: any) {
  const stats = {
    trainingsWoche: 3,
    trainingsTotal: 48,
    nextTraining: 'Heute, 18:00',
    fortschritt: 75,
  };

  const quickActions = [
    { id: 1, title: 'Training starten', icon: 'play-circle', color: '#0EA5E9' },
    { id: 2, title: 'Fortschritt', icon: 'trending-up', color: '#10B981' },
    { id: 3, title: 'Ernährung', icon: 'nutrition', color: '#F59E0B' },
    { id: 4, title: 'Messungen', icon: 'analytics', color: '#8B5CF6' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hallo Max! 👋</Text>
            <Text style={styles.subGreeting}>Bereit für dein Training?</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>MM</Text>
          </View>
        </View>

        {/* Nächstes Training Card */}
        <TouchableOpacity 
          style={styles.nextTrainingCard}
          onPress={() => navigation.navigate('Training')}
        >
          <View style={styles.nextTrainingHeader}>
            <Ionicons name="calendar" size={24} color="#0EA5E9" />
            <Text style={styles.nextTrainingTitle}>Nächstes Training</Text>
          </View>
          <Text style={styles.nextTrainingTime}>{stats.nextTraining}</Text>
          <Text style={styles.nextTrainingWorkout}>Oberkörper Push - Workout B</Text>
          <View style={styles.startButton}>
            <Text style={styles.startButtonText}>Jetzt starten</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.trainingsWoche}</Text>
            <Text style={styles.statLabel}>Diese Woche</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.trainingsTotal}</Text>
            <Text style={styles.statLabel}>Gesamt</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.fortschritt}%</Text>
            <Text style={styles.statLabel}>Fortschritt</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Schnellzugriff</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.quickActionCard}>
              <Ionicons name={action.icon as any} size={32} color={action.color} />
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activities */}
        <Text style={styles.sectionTitle}>Letzte Aktivitäten</Text>
        <View style={styles.activitiesContainer}>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Training abgeschlossen</Text>
              <Text style={styles.activityDate}>Gestern - Beine & Gesäß</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="trophy" size={24} color="#F59E0B" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Neuer Rekord!</Text>
              <Text style={styles.activityDate}>Kniebeugen: 120kg x 8</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subGreeting: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0EA5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextTrainingCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextTrainingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nextTrainingTitle: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
  },
  nextTrainingTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  nextTrainingWorkout: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#0EA5E9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    width: (width - 48) / 2,
    padding: 20,
    margin: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 14,
    color: '#111827',
    marginTop: 8,
    textAlign: 'center',
  },
  activitiesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  activityIcon: {
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  activityDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});