import 'react-native-gesture-handler';
import {LogBox} from 'react-native';
import Navigation from './Screen/Navigation';

// Ignore specific warnings
LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native',
  'Invalid props.style key `fontWeight` supplied to `View`',
]);

function App() {
  return (
    <>
      <Navigation />
    </>
  );
}

export default App;
