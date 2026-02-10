import { requireNativeModule } from 'expo-modules-core';

interface HomeIndicatorControllerModule {
  setAutoHidden(autoHidden: boolean): void;
}

const NativeModule = requireNativeModule<HomeIndicatorControllerModule>('HomeIndicatorController');

export function setAutoHidden(autoHidden: boolean): void {
  NativeModule.setAutoHidden(autoHidden);
}