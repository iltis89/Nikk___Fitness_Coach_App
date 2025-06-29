import React from 'react';

export default function ProgressChart() {
  const data = [
    { day: 'Mo', value: 65, label: 'Montag' },
    { day: 'Di', value: 72, label: 'Dienstag' },
    { day: 'Mi', value: 68, label: 'Mittwoch' },
    { day: 'Do', value: 78, label: 'Donnerstag' },
    { day: 'Fr', value: 82, label: 'Freitag' },
    { day: 'Sa', value: 85, label: 'Samstag' },
    { day: 'So', value: 88, label: 'Sonntag' },
  ];

  const maxValue = Math.max(...data.map(d => d.value));
  const average = Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length);

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Wochenfortschritt</h3>
          <p className="text-sm text-gray-500 mt-1">Durchschnitt: {average}%</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary-500 rounded" />
            <span className="text-xs text-gray-600">Leistung</span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-end justify-between gap-2 sm:gap-3">
        {data.map((item, index) => (
          <div key={item.day} className="flex-1 flex flex-col items-center group">
            <div className="w-full relative flex-1 flex items-end">
              <div className="w-full bg-gray-100 rounded-t-lg relative">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all duration-700 ease-out hover:from-primary-700 hover:to-primary-500"
                  style={{ 
                    height: `${(item.value / maxValue) * 100}%`,
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded shadow-sm">
                    {item.value}%
                  </span>
                </div>
                {item.value >= average && (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-xs font-semibold text-gray-700 block">{item.day}</span>
              <span className="text-xs text-gray-500 hidden sm:block">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}