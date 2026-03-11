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
import API_CONFIG from '../config';

function Otplogin({navigation}) {
  const [mobile, setmobile] = useState('');

  const sendotp = async () => {
    if (!mobile) {
      Alert.alert('Error', 'Please Enter mobile number');
    } else if (mobile.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
    } else {
      try {
        const config = {
          url: '/driver/sendotp',
          method: 'post',
          baseURL: API_CONFIG.BASE_URL,
          timeout: API_CONFIG.TIMEOUT,
          data: {
            mobile: mobile,
          },
        };
        let res = await axios(config);

        console.log('API Response:', res.data);
        if (res.status === 200) {
          console.log('OTP:', res.data.otp);

          Alert.alert(
            'OTP Sent',
            `OTP sent to your mobile number: ${res.data.otp}`,
            [{text: 'OK', onPress: () => navigation.navigate('VerifyOtp')}]
          );
          await AsyncStorage.setItem('mobile', JSON.stringify(res.data.mobile));
        }
      } catch (error) {
        console.log('API Error:', error.message);
        if (error.response) {
          const status = error.response.status;
          const errorMsg = error.response.data.error;
          
          if (status === 404) {
            // Mobile number not registered
            Alert.alert(
              'Driver Not Registered',
              'This mobile number is not registered.\n\nPlease register first by clicking "Create a new account" below.\n\nOr use test number: 9999999999',
              [
                {text: 'Register Now', onPress: () => navigation.navigate('Register')},
                {text: 'Cancel', style: 'cancel'}
              ]
            );
          } else {
            Alert.alert('Error', errorMsg || 'Something went wrong. Please try again.');
          }
        } else if (error.code === 'ECONNABORTED') {
          Alert.alert('Timeout', 'Request timeout. Server might be waking up. Please wait 30 seconds and try again.');
        } else if (error.message === 'Network Error') {
          Alert.alert(
            'Network Error',
            'Cannot connect to server.\n\nPossible reasons:\n1. Server is waking up (wait 30 seconds)\n2. No internet connection\n3. Server is down\n\nPlease try again.'
          );
        } else {
          Alert.alert('Error', 'Network error. Please try again.');
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

      <TouchableOpacity onPress={sendotp}>
        <View style={styles.btn}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Get OTP</Text>
        </View>
      </TouchableOpacity>

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
});
