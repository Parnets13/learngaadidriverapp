// Suppress warnings BEFORE importing anything else
import { LogBox } from 'react-native';

// Ignore ViewPropTypes warning
LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native',
  'Invalid props.style key',
]);

const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('ViewPropTypes will be removed from React Native') ||
     args[0].includes('Invalid props.style key'))
  ) {
    return;
  }
  originalConsoleWarn(...args);
};

const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('ViewPropTypes') ||
     args[0].includes('Invalid props.style key'))
  ) {
    return;
  }
  originalConsoleError(...args);
};

// Now import deprecated prop types
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

// Export ViewPropTypes for packages that need it
export { ViewPropTypes };
