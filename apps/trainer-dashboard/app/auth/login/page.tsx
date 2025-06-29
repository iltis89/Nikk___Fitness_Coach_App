'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

const DEMO_CREDENTIALS = {
  email: 'demo@nv-coaching.de',
  password: 'demo123'
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Demo-Modus: Einfache Credential-Prüfung
    const isDemoMode = true;
    
    if (isDemoMode) {
      if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'trainer');
        
        document.cookie = 'isAuthenticated=true; path=/; max-age=86400';
        
        setTimeout(() => {
          router.push('/dashboard');
        }, 100);
      } else {
        setError('Ungültige Anmeldedaten. Nutzen Sie die Demo-Credentials.');
        setIsLoading(false);
      }
    }
  };

  const fillDemoCredentials = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo size="xl" className="mx-auto mb-6" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Trainer Dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Melden Sie sich an, um fortzufahren
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                E-Mail Adresse
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="E-Mail Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Passwort
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-error-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-error-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="text-center">
            <Button
              type="button"
              onClick={fillDemoCredentials}
              variant="outline"
              size="sm"
              className="text-primary-600 hover:text-primary-500 border-none bg-transparent"
            >
              Demo-Credentials verwenden
            </Button>
            <p className="mt-1 text-xs text-gray-500">
              E-Mail: {DEMO_CREDENTIALS.email} | Passwort: {DEMO_CREDENTIALS.password}
            </p>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              variant="primary"
              className="w-full"
            >
              {isLoading ? 'Anmeldung läuft...' : 'Anmelden'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}