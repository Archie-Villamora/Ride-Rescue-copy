// Simple shim for Metro async-require on web.
// Avoids hard failures when a library expects @expo/metro-config/build/async-require.
export function asyncRequire(moduleId) {
  // On web, just use dynamic import if possible.
  if (typeof moduleId === 'string') {
    return import(/* @vite-ignore */ moduleId);
  }
  // Fallback: resolve to null to avoid hard crash.
  return Promise.resolve(null);
}