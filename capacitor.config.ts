import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gst.app',
  appName: 'GST',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
    // Allow navigation to all URLs
    allowNavigation: ['*']
  },
  android: {
    // Remove buildOptions that reference non-existent keystore
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#D32F2F',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;