'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { HealthMetric } from '@/types/health';
import { Lock, Unlock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useState } from 'react';

interface EncryptedMetricCardProps {
  metric: HealthMetric;
  onEncrypt: (id: string, value: number) => Promise<void>;
  onDecrypt: (id: string) => Promise<void>;
  isProcessing: boolean;
}

export function EncryptedMetricCard({ 
  metric, 
  onEncrypt, 
  onDecrypt, 
  isProcessing 
}: EncryptedMetricCardProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [showDecrypted, setShowDecrypted] = useState<boolean>(false);

  const handleEncrypt = async (): Promise<void> => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;
    
    await onEncrypt(metric.id, value);
    setInputValue('');
  };

  const handleDecrypt = async (): Promise<void> => {
    await onDecrypt(metric.id);
    setShowDecrypted(true);
    setTimeout(() => setShowDecrypted(false), 3000);
  };

  const getStatusBadge = (): JSX.Element | null => {
    if (!metric.value) return null;

    const isNormal = 
      metric.value >= metric.normalRange.min && 
      metric.value <= metric.normalRange.max;

    if (isNormal) {
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
          <Minus className="w-3 h-3 mr-1" />
          Normal
        </Badge>
      );
    }

    if (metric.value < metric.normalRange.min) {
      return (
        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
          <TrendingDown className="w-3 h-3 mr-1" />
          Low
        </Badge>
      );
    }

    return (
      <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30">
        <TrendingUp className="w-3 h-3 mr-1" />
        High
      </Badge>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl"
              style={{ background: metric.color }}
            >
              {metric.icon}
            </div>
            <CardTitle className="text-white text-lg">{metric.name}</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Encrypted Value Display */}
        {metric.encryptedValue && (
          <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-medium text-purple-400">
                Encrypted Data
              </span>
            </div>
            <div className="font-mono text-xs text-gray-400 break-all">
              {metric.encryptedValue.substring(0, 48)}...
            </div>
          </div>
        )}

        {/* Decrypted Value Display */}
        {showDecrypted && metric.value > 0 && (
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Unlock className="w-4 h-4 text-green-400" />
              <span className="text-xs font-medium text-green-400">
                Decrypted Value
              </span>
            </div>
            <div className="text-2xl font-bold text-white">
              {metric.value} {metric.unit}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Normal range: {metric.normalRange.min}-{metric.normalRange.max} {metric.unit}
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder={`Enter ${metric.name.toLowerCase()}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
          />
          <Button
            onClick={handleEncrypt}
            disabled={isProcessing || !inputValue}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Lock className="w-4 h-4" />
          </Button>
        </div>

        {/* Decrypt Button */}
        {metric.encryptedValue && (
          <Button
            onClick={handleDecrypt}
            disabled={isProcessing}
            variant="outline"
            className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
          >
            <Unlock className="w-4 h-4 mr-2" />
            Decrypt & View
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
