'use client';

import { useState, useEffect } from 'react';
import { parseTempoString } from '@/app/utils/training-helpers';

interface TempoTimerProps {
  tempo: string;
  isActive: boolean;
  onPhaseChange?: (phase: 'ready' | 'eccentric' | 'pause1' | 'concentric' | 'pause2') => void;
}

export default function TempoTimer({ tempo, isActive, onPhaseChange }: TempoTimerProps) {
  const [currentPhase, setCurrentPhase] = useState<'ready' | 'eccentric' | 'pause1' | 'concentric' | 'pause2'>('ready');
  const [phaseTimer, setPhaseTimer] = useState(0);
  const [currentRep, setCurrentRep] = useState(0);
  
  const parsed = parseTempoString(tempo);
  
  const phaseNames = {
    ready: 'Bereit',
    eccentric: 'Ablassen',
    pause1: 'Halten unten',
    concentric: 'Drücken/Ziehen',
    pause2: 'Halten oben'
  };
  
  const phaseColors = {
    ready: 'bg-gray-200',
    eccentric: 'bg-red-500',
    pause1: 'bg-yellow-500',
    concentric: 'bg-green-500',
    pause2: 'bg-yellow-500'
  };
  
  const phaseDurations = {
    eccentric: parsed.eccentric === -1 ? 0 : parsed.eccentric,
    pause1: parsed.pause1 === -1 ? 0 : parsed.pause1,
    concentric: parsed.concentric === -1 ? 0 : parsed.concentric,
    pause2: parsed.pause2 === -1 ? 0 : parsed.pause2,
  };
  
  useEffect(() => {
    if (!isActive || currentPhase === 'ready') return;
    
    const interval = setInterval(() => {
      setPhaseTimer(prev => {
        if (prev <= 0) {
          // Transition to next phase
          switch (currentPhase) {
            case 'eccentric':
              setCurrentPhase('pause1');
              return phaseDurations.pause1;
            case 'pause1':
              setCurrentPhase('concentric');
              return phaseDurations.concentric;
            case 'concentric':
              setCurrentPhase('pause2');
              return phaseDurations.pause2;
            case 'pause2':
              setCurrentPhase('eccentric');
              setCurrentRep(r => r + 1);
              return phaseDurations.eccentric;
            default:
              return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isActive, currentPhase, phaseDurations]);
  
  useEffect(() => {
    if (onPhaseChange) {
      onPhaseChange(currentPhase);
    }
  }, [currentPhase, onPhaseChange]);
  
  const startTimer = () => {
    setCurrentPhase('eccentric');
    setPhaseTimer(phaseDurations.eccentric);
    setCurrentRep(1);
  };
  
  const resetTimer = () => {
    setCurrentPhase('ready');
    setPhaseTimer(0);
    setCurrentRep(0);
  };
  
  const hasHold = tempo.includes('H');
  
  if (!parsed) return null;
  
  return (
    <div className="mt-3 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm font-medium text-gray-900">Tempo: {tempo}</div>
          {hasHold && (
            <div className="text-xs text-amber-600 mt-1">H = So lange wie möglich halten</div>
          )}
        </div>
        {currentPhase !== 'ready' && (
          <div className="text-right">
            <div className="text-xs text-gray-500">Wiederholung</div>
            <div className="text-lg font-semibold">{currentRep}</div>
          </div>
        )}
      </div>
      
      {currentPhase === 'ready' ? (
        <button
          onClick={startTimer}
          className="w-full btn-primary"
        >
          Tempo-Timer starten
        </button>
      ) : (
        <>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{phaseNames[currentPhase]}</span>
              {phaseTimer > 0 && (
                <span className="font-mono">{phaseTimer}s</span>
              )}
            </div>
            <div className="flex space-x-1">
              <div className={`h-3 flex-1 rounded transition-all ${currentPhase === 'eccentric' ? phaseColors.eccentric : 'bg-gray-200'}`} />
              <div className={`h-3 flex-1 rounded transition-all ${currentPhase === 'pause1' ? phaseColors.pause1 : 'bg-gray-200'}`} />
              <div className={`h-3 flex-1 rounded transition-all ${currentPhase === 'concentric' ? phaseColors.concentric : 'bg-gray-200'}`} />
              <div className={`h-3 flex-1 rounded transition-all ${currentPhase === 'pause2' ? phaseColors.pause2 : 'bg-gray-200'}`} />
            </div>
          </div>
          
          <button
            onClick={resetTimer}
            className="w-full btn-secondary text-sm"
          >
            Timer stoppen
          </button>
        </>
      )}
    </div>
  );
}