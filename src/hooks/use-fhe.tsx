'use client';

import { useState, useEffect } from 'react';
import { FHEClient } from '@/lib/fhe-client';

export function useFHE() {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fheClient] = useState<FHEClient>(() => FHEClient.getInstance());

  useEffect(() => {
    const initFHE = async (): Promise<void> => {
      if (isInitialized || isInitializing) return;

      setIsInitializing(true);
      setError(null);

      try {
        await fheClient.initialize();
        setIsInitialized(true);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize FHE';
        setError(errorMessage);
        console.error('FHE initialization error:', err);
      } finally {
        setIsInitializing(false);
      }
    };

    initFHE();
  }, [fheClient, isInitialized, isInitializing]);

  const encryptValue = async (value: number): Promise<string> => {
    if (!isInitialized) {
      throw new Error('FHE client not initialized');
    }
    return await fheClient.encryptValue(value);
  };

  const decryptValue = async (encryptedValue: string): Promise<number> => {
    if (!isInitialized) {
      throw new Error('FHE client not initialized');
    }
    return await fheClient.decryptValue(encryptedValue);
  };

  const computeAverage = async (encryptedValues: string[]): Promise<string> => {
    if (!isInitialized) {
      throw new Error('FHE client not initialized');
    }
    return await fheClient.computeAverage(encryptedValues);
  };

  const compare = async (encryptedA: string, encryptedB: string): Promise<number> => {
    if (!isInitialized) {
      throw new Error('FHE client not initialized');
    }
    return await fheClient.compare(encryptedA, encryptedB);
  };

  return {
    isInitialized,
    isInitializing,
    error,
    encryptValue,
    decryptValue,
    computeAverage,
    compare,
  };
}
