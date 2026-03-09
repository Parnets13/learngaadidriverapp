import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

function Otplogin({navigation}) {
  const [mobile, setmobile] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('123456'); // Default OTP for demonstration

  const sendotp = async () => {
    if (!mobile) {
      alert('Please Enter mobile number');
    } else {
      try {
        const config = {
          url: '/driver/sendotp',
          method: 'post',
          baseURL: 'http://192.168.1.34:8781/api',
          data: {
            mobile: mobile,
          },
        };
        let res = await axios(config);

        console.log('data', config);
        if (res.status === 200) {
          console.log('res.data', res.data);
          console.log(res.data.otp);

          // Store the OTP from response if available, otherwise use default
          if (res.data.otp) {
            setOtp(res.data.otp);
          }

          // Show OTP on screen
          setShowOtp(true);

          alert('OTP sent to your mobile number');
          await AsyncStorage.setItem('mobile', JSON.stringify(res.data.mobile));

          // We'll show the OTP now, but still allow navigation if needed
          // navigation.navigate('VerifyOtp');
        } else if (res.status === 500) {
          alert(res.data.error);
        }
      } catch (error) {
        console.log('error.response', error);
        if (error.response) {
          alert(error.response.data.error);
        } else {
          // For testing purposes, show OTP even if API call fails
          setShowOtp(true);
          alert('OTP generated for testing');
        }
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Do you want to close the app?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => BackHandler.exitApp(),
            },
          ],
          {cancelable: false},
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#1e921b"
        barStyle="light-content"
      />
      <Image
        source={require('../assets/Image/cardrive1.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Enter Your Mobile Number</Text>
      <Text style={{fontWeight: 'bold', color: 'black'}}>
        We Will Send You a Confirmation Code
      </Text>

      <TextInput
        style={styles.inputView}
        placeholder="Mobile Number"
        placeholderTextColor="gray"
        keyboardType={'numeric'}
        maxLength={10}
        onChangeText={mobile => setmobile(mobile)}
        value={mobile}></TextInput>

      {/* Show OTP when available */}
      {showOtp && (
        <View style={styles.otpContainer}>
          <Text style={styles.otpText}>Your OTP is:</Text>
          <Text style={styles.otpValue}>{otp}</Text>
        </View>
      )}

      <TouchableOpacity onPress={sendotp}>
        <View style={styles.btn}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Get OTP</Text>
        </View>
      </TouchableOpacity>

      {showOtp && (
        <TouchableOpacity
          style={styles.verifyBtn}
          onPress={() => navigation.navigate('VerifyOtp')}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Verify OTP</Text>
        </TouchableOpacity>
      )}

      <Text style={{color: 'black', marginTop: '10%'}}>
        Don't have account ?
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{fontWeight: '700', color: 'blue'}}>
          Create a new account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Otplogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  image: {
    width: '50%',
    height: '20%',
    marginTop: '30%',
  },
  text: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: '8%',
  },
  inputView: {
    alignSelf: 'center',
    width: '80%',
    height: '8%',
    marginTop: '20%',
    textAlign: 'center',
    borderColor: 'gray',
    marginBottom: '5%',
    color: 'black',
    opacity: 30,
    elevation: 30,
  },
  btn: {
    alignSelf: 'center',
    margin: 10,
    backgroundColor: '#1e921b',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginTop: '5%',
  },
  otpContainer: {
    width: '80%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1e921b',
    marginVertical: 10,
  },
  otpText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  otpValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e921b',
    letterSpacing: 5,
  },
  verifyBtn: {
    alignSelf: 'center',
    margin: 10,
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginTop: '2%',
  },
});
