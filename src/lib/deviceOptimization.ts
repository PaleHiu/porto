import { useState, useEffect } from 'react';
import type { PerformanceMode, DeviceStats } from '../types';

interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
}

/**
 * Mendeteksi apakah perangkat tergolong low-end
 */
export function detectIsLowEnd(): boolean {
  if (typeof window === 'undefined') return false;

  const extNav = navigator as ExtendedNavigator;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = extNav.deviceMemory || 8;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Jika RAM <= 3GB atau CPU cores <= 4 pada mobile, atau preferensi reduced motion aktif
  if (isReducedMotion) return true;
  if (isMobile && (cores <= 4 || memory <= 3)) return true;

  return false;
}

export function getInitialPerformanceMode(): PerformanceMode {
  if (typeof window === 'undefined') return 'ultra';
  
  const saved = localStorage.getItem('porto_perf_mode');
  if (saved === 'ultra' || saved === 'eco') return saved;

  return detectIsLowEnd() ? 'eco' : 'ultra';
}

/**
 * Hook untuk memonitor kapabilitas perangkat, FPS, dan mode performa
 */
export function useDeviceOptimization() {
  const [mode, setModeState] = useState<PerformanceMode>(getInitialPerformanceMode);
  const [stats, setStats] = useState<DeviceStats>({
    cores: typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4,
    memoryGb: typeof navigator !== 'undefined' ? (navigator as ExtendedNavigator).deviceMemory : undefined,
    fps: 60,
    isLowEnd: detectIsLowEnd(),
    mode: getInitialPerformanceMode()
  });

  const setMode = (newMode: PerformanceMode) => {
    setModeState(newMode);
    localStorage.setItem('porto_perf_mode', newMode);
    setStats(prev => ({ ...prev, mode: newMode }));
  };

  // FPS Meter dinamis
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const loop = (currentTime: number) => {
      frameCount++;
      if (currentTime - lastTime >= 1000) {
        const calculatedFps = Math.min(60, Math.round((frameCount * 1000) / (currentTime - lastTime)));
        setStats(prev => ({ ...prev, fps: calculatedFps }));

        // Auto-downgrade to eco if FPS drops below 30 consistently in ultra mode
        if (calculatedFps < 30 && mode === 'ultra') {
          // Hanya jika bukan initial load spike (setelah 5 detik)
          if (currentTime > 5000) {
            console.info('[Performance Engine] Frame rate under 30 FPS detected. Recommending Eco Mode.');
          }
        }

        frameCount = 0;
        lastTime = currentTime;
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [mode]);

  return { mode, setMode, stats };
}
