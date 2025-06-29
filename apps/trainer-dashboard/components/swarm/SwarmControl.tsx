'use client';

import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import {
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
  ChartBarIcon,
  CpuChipIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface SwarmStatus {
  agents: Array<{ id: string; role: string; status: string }>;
  tasks: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    failed: number;
  };
  queue: {
    size: number;
    pending: number;
  };
  metrics: {
    emergenceScore: number;
    totalTokens: number;
    averageTaskTime: number;
    agentUtilization: Record<string, number>;
  };
}

interface TaskEvent {
  task: {
    id: string;
    title: string;
    status: string;
  };
  duration?: number;
  error?: { message: string };
}

export default function SwarmControl() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState<SwarmStatus | null>(null);
  const [executing, setExecuting] = useState(false);
  const [userStory, setUserStory] = useState('');
  const [logs, setLogs] = useState<Array<{ time: Date; type: string; message: string }>>([]);

  useEffect(() => {
    const newSocket = io('http://localhost:3456');
    
    newSocket.on('connect', () => {
      setConnected(true);
      addLog('info', 'Connected to Swarm System');
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
      addLog('error', 'Disconnected from Swarm System');
    });

    // Status updates
    newSocket.on('status:update', (data: SwarmStatus) => {
      setStatus(data);
    });

    // Task events
    newSocket.on('planning:start', (data: any) => {
      setExecuting(true);
      addLog('info', `Planning tasks for: ${data.userStory}`);
    });

    newSocket.on('planning:complete', (data: any) => {
      addLog('success', `Planning complete: ${data.taskCount} tasks`);
    });

    newSocket.on('task:start', (data: TaskEvent) => {
      addLog('info', `Starting: ${data.task.title}`);
    });

    newSocket.on('task:complete', (data: TaskEvent) => {
      addLog('success', `Completed: ${data.task.title} (${data.duration}ms)`);
    });

    newSocket.on('task:failed', (data: TaskEvent) => {
      addLog('error', `Failed: ${data.task.title} - ${data.error?.message}`);
    });

    newSocket.on('swarm:complete', (data: any) => {
      setExecuting(false);
      addLog('success', 'Swarm execution complete!');
    });

    newSocket.on('error', (data: any) => {
      addLog('error', `Error: ${data.message}`);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const addLog = (type: string, message: string) => {
    setLogs(prev => [...prev, { time: new Date(), type, message }].slice(-50));
  };

  const executeStory = () => {
    if (!socket || !userStory.trim()) return;
    
    socket.emit('execute', { story: userStory, context: {} });
    setUserStory('');
  };

  const refreshStatus = () => {
    if (!socket) return;
    socket.emit('get-status');
    socket.emit('get-metrics');
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />;
      default:
        return <ChatBubbleLeftRightIcon className="h-4 w-4 text-blue-500" />;
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-700 bg-green-50';
      case 'error':
        return 'text-red-700 bg-red-50';
      default:
        return 'text-blue-700 bg-blue-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Swarm Control Center</h2>
          <p className="text-sm text-gray-600 mt-1">
            Intelligentes Multi-Agent System für automatisierte Entwicklung
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            connected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <div className={`h-2 w-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            {connected ? 'Verbunden' : 'Getrennt'}
          </div>
          <button
            onClick={refreshStatus}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Story ausführen</h3>
        <div className="flex gap-4">
          <textarea
            value={userStory}
            onChange={(e) => setUserStory(e.target.value)}
            placeholder="Beschreibe die gewünschte Funktionalität..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
            rows={3}
          />
          <button
            onClick={executeStory}
            disabled={!connected || executing || !userStory.trim()}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {executing ? (
              <>
                <PauseIcon className="h-5 w-5" />
                Läuft...
              </>
            ) : (
              <>
                <PlayIcon className="h-5 w-5" />
                Ausführen
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Grid */}
      {status && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Agents */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CpuChipIcon className="h-5 w-5 text-gray-600" />
              Agents
            </h3>
            <div className="space-y-2">
              {status.agents.map(agent => (
                <div key={agent.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{agent.id}</p>
                    <p className="text-xs text-gray-500">{agent.role}</p>
                  </div>
                  <div className={`h-2 w-2 rounded-full ${
                    agent.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tasks</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Gesamt</span>
                <span className="text-sm font-medium text-gray-900">{status.tasks.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">In Bearbeitung</span>
                <span className="text-sm font-medium text-yellow-600">{status.tasks.inProgress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Abgeschlossen</span>
                <span className="text-sm font-medium text-green-600">{status.tasks.completed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Fehlgeschlagen</span>
                <span className="text-sm font-medium text-red-600">{status.tasks.failed}</span>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5 text-gray-600" />
              Metriken
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Emergence Score</span>
                  <span className="text-sm font-medium text-gray-900">{status.metrics.emergenceScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${status.metrics.emergenceScore}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tokens</span>
                <span className="text-sm font-medium text-gray-900">
                  {status.metrics.totalTokens.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Ø Task Zeit</span>
                <span className="text-sm font-medium text-gray-900">
                  {Math.round(status.metrics.averageTaskTime)}ms
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitätsprotokoll</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {logs.map((log, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg ${getLogColor(log.type)}`}
            >
              {getLogIcon(log.type)}
              <div className="flex-1">
                <p className="text-sm">{log.message}</p>
                <p className="text-xs opacity-60 mt-0.5">
                  {new Intl.DateTimeFormat('de-DE', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  }).format(log.time)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}