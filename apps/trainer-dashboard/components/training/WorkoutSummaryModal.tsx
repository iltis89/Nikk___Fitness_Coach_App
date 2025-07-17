'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import Image from 'next/image';
import { 
  TrophyIcon,
  FireIcon,
  ChartBarIcon,
  SparklesIcon,
  RocketLaunchIcon,
  BoltIcon,
  ScaleIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
// Confetti animation removed - no external dependency needed

interface WorkoutStats {
  totalWeight: number;
  totalReps: number;
  totalSets: number;
  duration: number;
  exercises: number;
  personalRecords: number;
  completionRate: number;
}

interface WorkoutSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: WorkoutStats;
  clientName: string;
}

// Lustige Vergleiche für das Gesamtgewicht
const getWeightComparison = (totalWeight: number): { item: string; icon: React.ReactNode } => {
  const comparisons = [
    { weight: 50, item: "einem kleinen Reh", icon: <span>🦌</span> },
    { weight: 100, item: "einem ausgewachsenen Schäferhund", icon: <span>🐕</span> },
    { weight: 200, item: "einem Motorrad", icon: <span>🏍️</span> },
    { weight: 500, item: "einem Klavier", icon: <span>🎹</span> },
    { weight: 1000, item: "einem kleinen Auto", icon: <span>🚗</span> },
    { weight: 2000, item: "einem Nashorn", icon: <span>🦏</span> },
    { weight: 3000, item: "einem Elefantenbaby", icon: <span>🐘</span> },
    { weight: 5000, item: "einem ausgewachsenen Elefanten", icon: <span>🐘</span> },
    { weight: 10000, item: "einem T-Rex", icon: <span>🦖</span> },
    { weight: 20000, item: "einem Stadtbus", icon: <span>🚌</span> },
  ];

  const comparison = comparisons.reduce((prev, curr) => 
    Math.abs(curr.weight - totalWeight) < Math.abs(prev.weight - totalWeight) ? curr : prev
  );

  return comparison;
};

// Motivierende Nachrichten basierend auf der Leistung
const getMotivationalMessage = (stats: WorkoutStats): string => {
  if (stats.completionRate === 100) {
    return "Perfekte Leistung! Du hast alles gegeben! 💪";
  } else if (stats.completionRate >= 90) {
    return "Hervorragende Arbeit! Fast perfekt! 🌟";
  } else if (stats.completionRate >= 80) {
    return "Sehr gut! Weiter so! 🔥";
  } else if (stats.completionRate >= 70) {
    return "Gute Leistung! Nächstes Mal noch besser! 💯";
  } else {
    return "Gut gemacht! Jeder Schritt zählt! 🎯";
  }
};

export function WorkoutSummaryModal({ isOpen, onClose, stats, clientName }: WorkoutSummaryModalProps) {
  const [animatedWeight, setAnimatedWeight] = useState(0);
  const [animatedReps, setAnimatedReps] = useState(0);
  const weightComparison = getWeightComparison(stats.totalWeight);
  const motivationalMessage = getMotivationalMessage(stats);

  useEffect(() => {
    if (isOpen) {
      // Zahlen-Animation
      const weightIncrement = stats.totalWeight / 50;
      const repsIncrement = stats.totalReps / 30;
      
      const weightInterval = setInterval(() => {
        setAnimatedWeight(prev => {
          const next = prev + weightIncrement;
          return next >= stats.totalWeight ? stats.totalWeight : next;
        });
      }, 30);

      const repsInterval = setInterval(() => {
        setAnimatedReps(prev => {
          const next = prev + repsIncrement;
          return next >= stats.totalReps ? stats.totalReps : next;
        });
      }, 30);

      return () => {
        clearInterval(weightInterval);
        clearInterval(repsInterval);
      };
    } else {
      setAnimatedWeight(0);
      setAnimatedReps(0);
    }
  }, [isOpen, stats.totalWeight, stats.totalReps]);

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes} Minuten`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="text-center space-y-6 max-h-[80vh] overflow-y-auto">
        {/* Header mit Markus Rühl */}
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <Image 
              src="/image.png" 
              alt="Markus Rühl" 
              width={150} 
              height={150}
              className="rounded-full"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Glückwunsch, {clientName}!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            {motivationalMessage}
          </p>
        </div>

        {/* Hauptstatistik - Gesamtgewicht */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ScaleIcon className="h-6 w-6" />
            <h3 className="text-lg font-semibold">Heute bewegt:</h3>
          </div>
          <div className="text-4xl font-bold mb-3 tabular-nums">
            {Math.round(animatedWeight).toLocaleString('de-DE')} kg
          </div>
          <div className="flex items-center justify-center flex-wrap gap-2 text-base">
            <span>Das entspricht etwa</span>
            <span className="text-xl">{weightComparison.icon}</span>
            <span className="font-semibold">{weightComparison.item}</span>
          </div>
        </div>

        {/* Weitere Statistiken */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1">
              <FireIcon className="h-5 w-5" />
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {Math.round(animatedReps)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Wiederholungen
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div className="flex items-center justify-center text-green-600 dark:text-green-400 mb-1">
              <CheckCircleIcon className="h-5 w-5" />
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {stats.totalSets}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Sätze
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div className="flex items-center justify-center text-purple-600 dark:text-purple-400 mb-1">
              <ClockIcon className="h-5 w-5" />
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {formatDuration(stats.duration)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Trainingszeit
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div className="flex items-center justify-center text-orange-600 dark:text-orange-400 mb-1">
              <ChartBarIcon className="h-5 w-5" />
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {stats.completionRate}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Abgeschlossen
            </div>
          </div>
        </div>

        {/* Achievements */}
        {stats.personalRecords > 0 && (
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <RocketLaunchIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Neue Bestleistung!
              </h4>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Du hast heute {stats.personalRecords} persönliche{' '}
              {stats.personalRecords === 1 ? 'Rekord' : 'Rekorde'} aufgestellt!
            </p>
          </div>
        )}

        {/* Fun Facts */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <SparklesIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Wusstest du?
            </h4>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Mit {Math.round(stats.totalWeight / 15)} Wiederholungen hättest du einen{' '}
            <span className="font-semibold">Kleinwagen</span> anheben können! 🚗
          </p>
        </div>

        {/* Motivational Quote */}
        <div className="border-l-4 border-primary-500 pl-4 py-2">
          <p className="text-base italic text-gray-700 dark:text-gray-300">
            "Der Schmerz, den du heute fühlst, ist die Stärke, die du morgen spürst."
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={onClose}
            className="btn-primary"
          >
            <BoltIcon className="mr-2 h-5 w-5" />
            Abschließen
          </button>
        </div>
      </div>
    </Modal>
  );
}