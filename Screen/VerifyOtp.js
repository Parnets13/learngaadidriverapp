import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import API_CONFIG from '../config';

function VerifyOtp({navigation}) {
  const CELL_COUNT = 6;
  const [enableMask, setEnableMask] = useState(true);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const toggleMask = () => setEnableMask(f => !f);
  const renderCell = ({index, symbol, isFocused}) => {
    let textChild = null;

    if (symbol) {
      textChild = enableMask ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }
    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  const [otpCountdown, setOtpCountdown] = useState(60); // Initial countdown time in seconds
  const [isResendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    let timer;

    // Countdown logic
    if (otpCountdown > 0 && isResendDisabled) {
      timer = setTimeout(() => {
        setOtpCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else if (otpCountdown === 0 && isResendDisabled) {
      setResendDisabled(false);
    }

    // Cleanup the timer when component unmounts
    return () => clearTimeout(timer);
  }, [otpCountdown, isResendDisabled]);

  const handleResendOTP = () => {
    // Add logic to resend OTP here
    sendotp();
    // Disable the resend button and reset the countdown
    setResendDisabled(true);
    setOtpCountdown(60);
  };

  const [mobile, setmobile] = useState();
  const [token, settoken] = useState('');

  const [notificationverify, setnotificationverify] = useState(false);

  useEffect(() => {
    if (!notificationverify) {
      checkApplicationPermission();
    }
  }, [notificationverify]);

  useFocusEffect(
    React.useCallback(() => {
      PushNotification.configure({
        onRegister: function (token) {
          console.log('TOKEN:======>', token);
          settoken(token);
        },
        onNotification: function (notification) {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        onAction: function (notification) {
          console.log('ACTION:', notification.action);
          console.log('NOTIFICATION:', notification);
        },
        onRegistrationError: function (err) {
          console.error(err.message, err);
        },

        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
      });
    }, []),
  );
  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        setnotificationverify(true);
      } catch (error) {
        // Handle error
      }
    } else if (Platform.OS === 'ios') {
      // Handle iOS notification permission request
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getnumber();
    }, []),
  );

  const getnumber = async () => {
    try {
      const value1 = await AsyncStorage.getItem('mobile');
      if (value1 !== null) {
        setmobile(JSON.parse(value1));
      }
    } catch (error) {}
  };

  const otpverify = async () => {
    if (!value) {
      alert('Please Enter OTP sent to your mobile number');
    } else {
      try {
        const config = {
          url: '/driver/verifyotp',
          method: 'post',
          baseURL: API_CONFIG.BASE_URL,
          timeout: API_CONFIG.TIMEOUT,
          data: {
            mobile: mobile,
            otp: value,
            token: token?.token,
          },
        };
        let res = await axios(config);
        if (res.status === 200) {
          if (res.data.driver?.blockstatus) {
            alert(
              'Sorry..!, You are restricted to use Application. Please contact Application Owner for more details',
            );
          } else {
            await AsyncStorage.setItem(
              'driver',
              JSON.stringify(res.data.driver),
            );
            alert('OTP verified successfully');
            navigation.navigate('Otpverified');
          }
        }
      } catch (error) {
        console.log('Verify OTP Error:', error.message);
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert('Network error. Please check your connection.');
        }
      }
    }
  };

  const sendotp = async () => {
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
      if (res.status === 200) {
        console.log('Resend OTP:', res.data.otp);
        alert(`OTP sent to your mobile number: ${res.data.otp}`);
      }
    } catch (error) {
      console.log('Resend OTP Error:', error.message);
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert('Network error. Please check your connection.');
      }
    }
  };

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
      <Text style={styles.text}>Enter Verification Code</Text>
      <Text style={{fontWeight: 'bold', color: 'black'}}>
        Send to your mobile number ****{mobile?.slice(-4)}
      </Text>
      <View style={styles.fieldRow}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
        <Text style={styles.toggle} onPress={toggleMask}>
          {enableMask ? '🙈' : '🐵'}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 150,
          //   marginTop: 10,
        }}>
        <Text style={{color: 'gray'}}>{otpCountdown} Sec</Text>

        <TouchableOpacity onPress={handleResendOTP} disabled={isResendDisabled}>
          <Text style={{color: isResendDisabled ? 'gray' : '#1e921b'}}>
            Resend OTP
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={otpverify}>
        <View style={styles.btn}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Verify OTP</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default VerifyOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
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
    // lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: '8%',
    // backgroundColor: '#000000c0',
  },
  inputView: {
    alignSelf: 'center',
    // borderWidth: 1,
    width: '80%',
    height: '8%',
    marginTop: '20%',
    // borderRadius: 30,
    textAlign: 'center',
    borderColor: 'gray',
    marginBottom: '10%',
    color: 'black',
    opacity: 30,
    elevation: 30,
    // shadowColor: '#1e921b',
  },
  btn: {
    alignSelf: 'center',
    margin: 10,
    backgroundColor: '#1e921b', //blue
    // backgroundColor: '#1e921b', //green
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginTop: '15%',
  },
  focusCell: {borderColor: '#1e921b'},
  fieldRow: {
    marginTop: 40,
    flexDirection: 'row',
    marginLeft: 8,
    justifyContent: 'center',
  },
  toggle: {
    width: 45,
    height: 45,
    lineHeight: 33,
    fontSize: 30,
    textAlign: 'center',
  },
  cell: {
    width: 36,
    height: 36,
    lineHeight: 32,
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 8,
    borderRadius: 6,
    borderColor: '#1e921b',
    borderWidth: 1,
    color: '#1e921b',
  },
});
