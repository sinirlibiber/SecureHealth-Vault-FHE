'use client';

import { useState, useEffect } from 'react';
import { useFHE } from '@/hooks/use-fhe';
import { EncryptedMetricCard } from '@/components/encrypted-metric-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { HealthMetric } from '@/types/health';
import { 
  Shield, 
  Activity, 
  Database, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  Calculator,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

export function HealthVault() {
  const { isInitialized, isInitializing, error, encryptValue, decryptValue, computeAverage } = useFHE();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<HealthMetric[]>([
    {
      id: 'weight',
      name: 'Weight',
      value: 0,
      unit: 'kg',
      encryptedValue: null,
      timestamp: Date.now(),
      icon: '⚖️',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      normalRange: { min: 50, max: 90 },
    },
    {
      id: 'bloodPressureSys',
      name: 'Blood Pressure (Systolic)',
      value: 0,
      unit: 'mmHg',
      encryptedValue: null,
      timestamp: Date.now(),
      icon: '❤️',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      normalRange: { min: 90, max: 120 },
    },
    {
      id: 'glucose',
      name: 'Blood Glucose',
      value: 0,
      unit: 'mg/dL',
      encryptedValue: null,
      timestamp: Date.now(),
      icon: '🩸',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      normalRange: { min: 70, max: 140 },
    },
    {
      id: 'heartRate',
      name: 'Heart Rate',
      value: 0,
      unit: 'bpm',
      encryptedValue: null,
      timestamp: Date.now(),
      icon: '💓',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      normalRange: { min: 60, max: 100 },
    },
  ]);

  const [stats, setStats] = useState<{
    totalEncrypted: number;
    averageCalculated: boolean;
    lastUpdate: number;
  }>({
    totalEncrypted: 0,
    averageCalculated: false,
    lastUpdate: Date.now(),
  });

  useEffect(() => {
    const encrypted = metrics.filter(m => m.encryptedValue !== null).length;
    setStats(prev => ({ ...prev, totalEncrypted: encrypted }));
  }, [metrics]);

  const handleEncrypt = async (id: string, value: number): Promise<void> => {
    setIsProcessing(true);
    try {
      const encrypted = await encryptValue(value);
      
      setMetrics(prev =>
        prev.map(m =>
          m.id === id
            ? { ...m, value, encryptedValue: encrypted, timestamp: Date.now() }
            : m
        )
      );

      toast.success('Data encrypted successfully! 🔒');
    } catch (err) {
      console.error('Encryption error:', err);
      toast.error('Failed to encrypt data');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecrypt = async (id: string): Promise<void> => {
    setIsProcessing(true);
    try {
      const metric = metrics.find(m => m.id === id);
      if (!metric || !metric.encryptedValue) return;

      const decrypted = await decryptValue(metric.encryptedValue);
      
      setMetrics(prev =>
        prev.map(m => (m.id === id ? { ...m, value: decrypted } : m))
      );

      toast.success('Data decrypted successfully! 🔓');
    } catch (err) {
      console.error('Decryption error:', err);
      toast.error('Failed to decrypt data');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleComputeAverage = async (): Promise<void> => {
    const encryptedValues = metrics
      .filter(m => m.encryptedValue !== null)
      .map(m => m.encryptedValue as string);

    if (encryptedValues.length < 2) {
      toast.error('Please encrypt at least 2 metrics to compute average');
      return;
    }

    setIsProcessing(true);
    try {
      const encryptedAvg = await computeAverage(encryptedValues);
      const avgValue = await decryptValue(encryptedAvg);

      toast.success(
        `Average computed on encrypted data: ${avgValue.toFixed(1)}`,
        { duration: 5000 }
      );

      setStats(prev => ({ ...prev, averageCalculated: true, lastUpdate: Date.now() }));
    } catch (err) {
      console.error('Average computation error:', err);
      toast.error('Failed to compute average');
    } finally {
      setIsProcessing(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="max-w-md bg-red-900/20 border-red-500/50">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              FHE Initialization Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/20 text-white pt-12 sm:pt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-purple-400" />
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              SecureHealth Vault
            </h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto">
            Store and compute on your health data with <span className="text-purple-400 font-semibold">Fully Homomorphic Encryption</span>. 
            Your data stays encrypted even during calculations.
          </p>
          
          {/* Status Badge */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {isInitializing && (
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                <Activity className="w-3 h-3 mr-2 animate-pulse" />
                Initializing FHE...
              </Badge>
            )}
            {isInitialized && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle2 className="w-3 h-3 mr-2" />
                FHE Ready
              </Badge>
            )}
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              <Database className="w-3 h-3 mr-2" />
              {stats.totalEncrypted} Encrypted
            </Badge>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Lock className="w-8 h-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{stats.totalEncrypted}</div>
                  <div className="text-sm text-gray-400">Encrypted Metrics</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-900/30 to-pink-800/20 border-pink-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Calculator className="w-8 h-8 text-pink-400" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    {stats.averageCalculated ? '✓' : '—'}
                  </div>
                  <div className="text-sm text-gray-400">Encrypted Computation</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">Private</div>
                  <div className="text-sm text-gray-400">100% Encrypted</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button
            onClick={handleComputeAverage}
            disabled={!isInitialized || isProcessing || stats.totalEncrypted < 2}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Compute Average on Encrypted Data
          </Button>
        </div>

        {/* Health Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map(metric => (
            <EncryptedMetricCard
              key={metric.id}
              metric={metric}
              onEncrypt={handleEncrypt}
              onDecrypt={handleDecrypt}
              isProcessing={isProcessing}
            />
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            How FHE Protects Your Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
            <div>
              <span className="text-purple-400 font-semibold">🔒 Always Encrypted:</span> Your health data is encrypted before storage and never exposed in plaintext.
            </div>
            <div>
              <span className="text-pink-400 font-semibold">🧮 Compute on Encrypted:</span> Calculations happen on encrypted data without decryption.
            </div>
            <div>
              <span className="text-blue-400 font-semibold">🛡️ Zero Knowledge:</span> Even the server never sees your actual health values.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
