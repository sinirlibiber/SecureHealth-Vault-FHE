export interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  encryptedValue: string | null;
  timestamp: number;
  icon: string;
  color: string;
  normalRange: { min: number; max: number };
}

export interface EncryptedHealthData {
  weight: string | null;
  bloodPressureSystolic: string | null;
  bloodPressureDiastolic: string | null;
  glucose: string | null;
  heartRate: string | null;
}

export interface FHEInstance {
  encrypt32: (value: number) => Promise<Uint8Array>;
  decrypt32: (encryptedValue: Uint8Array) => Promise<number>;
  createProof32: (value: number, encrypted: Uint8Array) => Promise<string>;
}
