'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestSupabase() {
  const [connectionStatus, setConnectionStatus] = useState<string>('Testing...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        // Supabase 연결 테스트
        const { data, error } = await supabase
          .from('roles')
          .select('*')
          .limit(1);
        
        if (error) {
          setError(`Supabase Error: ${error.message}`);
          setConnectionStatus('❌ Connection Failed');
        } else {
          setConnectionStatus('✅ Supabase Connected Successfully');
        }
      } catch (err) {
        setError(`Connection Error: ${err}`);
        setConnectionStatus('❌ Connection Failed');
      }
    }

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Connection Status:</h2>
            <p className="text-lg">{connectionStatus}</p>
          </div>
          
          {error && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-red-600">Error Details:</h2>
              <p className="text-red-600 bg-red-50 p-3 rounded">{error}</p>
            </div>
          )}
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Environment Variables:</h2>
            <div className="bg-gray-50 p-3 rounded">
              <p><strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'}</p>
              <p><strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
