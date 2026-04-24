import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { TrialConfig } from '@/shared/types';
import { defaultTrialConfig } from '@/data/trial';

interface TrialConfigContextValue {
  config: TrialConfig;
  setConfig: (config: TrialConfig) => void;
  updateConfig: <K extends keyof TrialConfig>(key: K, value: TrialConfig[K]) => void;
}

const TrialConfigContext = createContext<TrialConfigContextValue>({
  config: defaultTrialConfig,
  setConfig: () => {},
  updateConfig: () => {},
});

export function TrialConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<TrialConfig>(defaultTrialConfig);

  const updateConfig = useCallback(<K extends keyof TrialConfig>(key: K, value: TrialConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <TrialConfigContext.Provider value={{ config, setConfig, updateConfig }}>
      {children}
    </TrialConfigContext.Provider>
  );
}

export function useTrialConfig() {
  return useContext(TrialConfigContext);
}
