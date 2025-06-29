'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  CheckIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const conversations = [
  {
    id: 1,
    client: 'Max Mustermann',
    lastMessage: 'Danke für den neuen Trainingsplan!',
    timestamp: 'vor 2 Stunden',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    client: 'Anna Schmidt',
    lastMessage: 'Kann ich morgen früher kommen?',
    timestamp: 'vor 4 Stunden',
    unread: 1,
    online: false,
  },
  {
    id: 3,
    client: 'Tom Weber',
    lastMessage: 'Alles klar, bis Donnerstag!',
    timestamp: 'gestern',
    unread: 0,
    online: false,
  },
  {
    id: 4,
    client: 'Lisa Müller',
    lastMessage: 'Die Übung war super 💪',
    timestamp: 'gestern',
    unread: 0,
    online: true,
  },
];

const messages = [
  {
    id: 1,
    sender: 'Max Mustermann',
    content: 'Hi Nikk, ich habe mir den neuen Trainingsplan angeschaut.',
    timestamp: '14:30',
    isTrainer: false,
  },
  {
    id: 2,
    sender: 'Nikk',
    content: 'Super! Hast du noch Fragen dazu?',
    timestamp: '14:32',
    isTrainer: true,
    read: true,
  },
  {
    id: 3,
    sender: 'Max Mustermann',
    content: 'Die Übungen sind klar, aber wie viel Pause zwischen den Sätzen?',
    timestamp: '14:35',
    isTrainer: false,
  },
  {
    id: 4,
    sender: 'Nikk',
    content: 'Bei den Grundübungen 2-3 Minuten, bei Isolationsübungen 60-90 Sekunden.',
    timestamp: '14:37',
    isTrainer: true,
    read: true,
  },
  {
    id: 5,
    sender: 'Max Mustermann',
    content: 'Danke für den neuen Trainingsplan!',
    timestamp: '14:40',
    isTrainer: false,
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex h-full gap-6">
        <div className="w-1/3 flex flex-col">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Nachrichten</h1>
            <p className="mt-1 text-sm text-gray-500">
              Kommuniziere mit deinen Kunden
            </p>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Nachrichten durchsuchen..."
              className="input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="card flex-1 overflow-hidden">
            <div className="card-body p-0">
              <div className="divide-y divide-gray-200 overflow-y-auto h-full">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedConversation.id === conversation.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
                            {conversation.client.split(' ').map(n => n[0]).join('')}
                          </div>
                          {conversation.online && (
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{conversation.client}</p>
                          <p className="text-sm text-gray-500 truncate max-w-[200px]">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                        {conversation.unread > 0 && (
                          <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-medium text-white">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 card flex flex-col overflow-hidden">
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
                    {selectedConversation.client.split(' ').map(n => n[0]).join('')}
                  </div>
                  {selectedConversation.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{selectedConversation.client}</p>
                  <p className="text-xs text-gray-500">
                    {selectedConversation.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-primary-600 border-primary-600 hover:text-primary-700">
                Profil anzeigen
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isTrainer ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${message.isTrainer ? 'order-2' : ''}`}>
                    <div className={`rounded-lg px-4 py-2 ${
                      message.isTrainer
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className={`mt-1 flex items-center space-x-1 text-xs text-gray-500 ${
                      message.isTrainer ? 'justify-end' : ''
                    }`}>
                      <span>{message.timestamp}</span>
                      {message.isTrainer && message.read && (
                        <CheckCircleIcon className="h-4 w-4 text-primary-600" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
            <div className="flex items-end space-x-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <PaperClipIcon className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <textarea
                  rows={1}
                  className="input resize-none"
                  placeholder="Nachricht schreiben..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
              </div>
              <Button
                type="submit"
                disabled={!messageInput.trim()}
                variant="primary"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}