import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function TrainingPlansScreen({ navigation }: any) {
  const currentPlan = {
    name: 'Muskelaufbau Programm',
    phase: 'Woche 4 von 12',
    progress: 33,
    nextWorkout: 'Workout B - Oberkörper Push',
  };

  const workouts = [
    {
      id: 'a',
      name: 'Workout A',
      subtitle: 'Unterkörper',
      exercises: 6,
      duration: '60 Min',
      lastCompleted: '20.01.2024',
      color: '#0EA5E9',
    },
    {
      id: 'b',
      name: 'Workout B',
      subtitle: 'Oberkörper Push',
      exercises: 7,
      duration: '55 Min',
      lastCompleted: '18.01.2024',
      color: '#10B981',
    },
    {
      id: 'c',
      name: 'Workout C',
      subtitle: 'Oberkörper Pull',
      exercises: 6,
      duration: '50 Min',
      lastCompleted: '16.01.2024',
      color: '#F59E0B',
    },
  ];

  const weekSchedule = [
    { day: 'Mo', workout: 'A', completed: true },
    { day: 'Di', workout: '-', completed: true },
    { day: 'Mi', workout: 'B', completed: true },
    { day: 'Do', workout: '-', completed: true },
    { day: 'Fr', workout: 'C', completed: false },
    { day: 'Sa', workout: '-', completed: false },
    { day: 'So', workout: '-', completed: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Current Plan Card */}
        <View style={styles.planCard}>
          <Text style={styles.planName}>{currentPlan.name}</Text>
          <Text style={styles.planPhase}>{currentPlan.phase}</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${currentPlan.progress}%` }]} 
              />
            </View>
            <Text style={styles.progressText}>{currentPlan.progress}%</Text>
          </View>

          <TouchableOpacity style={styles.nextWorkoutButton}>
            <View>
              <Text style={styles.nextWorkoutLabel}>Nächstes Training</Text>
              <Text style={styles.nextWorkoutName}>{currentPlan.nextWorkout}</Text>
            </View>
            <Ionicons name="play-circle" size={40} color="#0EA5E9" />
          </TouchableOpacity>
        </View>

        {/* Week Schedule */}
        <Text style={styles.sectionTitle}>Diese Woche</Text>
        <View style={styles.weekContainer}>
          {weekSchedule.map((day, index) => (
            <View key={index} style={styles.dayCard}>
              <Text style={styles.dayName}>{day.day}</Text>
              <View 
                style={[
                  styles.dayWorkout,
                  day.workout !== '-' && styles.dayWorkoutActive,
                  day.completed && styles.dayWorkoutCompleted,
                ]}
              >
                <Text 
                  style={[
                    styles.dayWorkoutText,
                    day.workout !== '-' && styles.dayWorkoutTextActive,
                  ]}
                >
                  {day.workout}
                </Text>
              </View>
              {day.completed && day.workout !== '-' && (
                <Ionicons 
                  name="checkmark-circle" 
                  size={16} 
                  color="#10B981" 
                  style={styles.completedIcon}
                />
              )}
            </View>
          ))}
        </View>

        {/* Workouts List */}
        <Text style={styles.sectionTitle}>Workouts</Text>
        {workouts.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            style={styles.workoutCard}
            onPress={() => navigation.navigate('Workout', { workoutId: workout.id })}
          >
            <View style={[styles.workoutIcon, { backgroundColor: workout.color }]}>
              <Text style={styles.workoutIconText}>{workout.name.split(' ')[1]}</Text>
            </View>
            <View style={styles.workoutContent}>
              <Text style={styles.workoutName}>{workout.name}</Text>
              <Text style={styles.workoutSubtitle}>{workout.subtitle}</Text>
              <View style={styles.workoutMeta}>
                <Text style={styles.workoutMetaText}>
                  {workout.exercises} Übungen • {workout.duration}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  planCard: {
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
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  planPhase: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0EA5E9',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  nextWorkoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
  },
  nextWorkoutLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  nextWorkoutName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  dayCard: {
    alignItems: 'center',
    position: 'relative',
  },
  dayName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  dayWorkout: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayWorkoutActive: {
    backgroundColor: '#DBEAFE',
  },
  dayWorkoutCompleted: {
    backgroundColor: '#D1FAE5',
  },
  dayWorkoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  dayWorkoutTextActive: {
    color: '#0EA5E9',
  },
  completedIcon: {
    position: 'absolute',
    bottom: -4,
    right: -4,
  },
  workoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
  },
  workoutIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  workoutIconText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  workoutContent: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  workoutSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  workoutMeta: {
    flexDirection: 'row',
    marginTop: 4,
  },
  workoutMetaText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});