'use client';

import React from 'react';

interface BodyCompositionChartProps {
  bodyFat: number;
  muscleMass: number;
  weight: number;
}

export function BodyCompositionChart({ bodyFat, muscleMass, weight }: BodyCompositionChartProps) {
  // Calculate body composition percentages
  const bodyFatKg = (weight * bodyFat) / 100;
  const otherMass = weight - muscleMass - bodyFatKg;
  
  const muscleMassPercent = (muscleMass / weight) * 100;
  const otherMassPercent = (otherMass / weight) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-900">Körperzusammensetzung</span>
        <span className="text-gray-500">{weight} kg Gesamtgewicht</span>
      </div>
      
      {/* Stacked bar chart */}
      <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden flex">
        <div
          className="bg-red-500 h-full flex items-center justify-center text-xs font-medium text-white transition-all"
          style={{ width: `${bodyFat}%` }}
          title={`Körperfett: ${bodyFatKg.toFixed(1)} kg`}
        >
          {bodyFat > 10 && `${bodyFat}%`}
        </div>
        <div
          className="bg-green-500 h-full flex items-center justify-center text-xs font-medium text-white transition-all"
          style={{ width: `${muscleMassPercent.toFixed(1)}%` }}
          title={`Muskelmasse: ${muscleMass} kg`}
        >
          {muscleMassPercent > 10 && `${muscleMassPercent.toFixed(0)}%`}
        </div>
        <div
          className="bg-gray-400 h-full flex items-center justify-center text-xs font-medium text-white transition-all"
          style={{ width: `${otherMassPercent.toFixed(1)}%` }}
          title={`Andere Masse: ${otherMass.toFixed(1)} kg`}
        >
          {otherMassPercent > 10 && `${otherMassPercent.toFixed(0)}%`}
        </div>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-3 gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
          <div>
            <p className="text-gray-600">Körperfett</p>
            <p className="font-medium text-gray-900">{bodyFatKg.toFixed(1)} kg ({bodyFat}%)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <div>
            <p className="text-gray-600">Muskelmasse</p>
            <p className="font-medium text-gray-900">{muscleMass} kg ({muscleMassPercent.toFixed(1)}%)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
          <div>
            <p className="text-gray-600">Andere</p>
            <p className="font-medium text-gray-900">{otherMass.toFixed(1)} kg ({otherMassPercent.toFixed(1)}%)</p>
          </div>
        </div>
      </div>
    </div>
  );
}