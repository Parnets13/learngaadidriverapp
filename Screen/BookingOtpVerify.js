import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  Modal,
  Linking,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Animatable from 'react-native-animatable';
import Geolocation from '@react-native-community/geolocation';
import call from 'react-native-phone-call';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function BookingOtpVerify({route, navigation}) {
  const {item} = route.params;
  const [driver, setdriver] = useState({});

  const driverData = async () => {
    let driver = await AsyncStorage.getItem('driver');
    setdriver(JSON.parse(driver));
  };

  useFocusEffect(
    React.useCallback(() => {
      driverData();
    }, []),
  );

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
    SendOtp();
    // Disable the resend button and reset the countdown
    setResendDisabled(true);
    setOtpCountdown(60);
  };

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setError(null);
      },
      error => {
        console.error('Error fetching location:', error);
        setError('Error fetching location');
      },
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const intervalId = setInterval(() => {
        getCurrentLocation();
      }, 5000); // 5000 milliseconds = 5 seconds
      return () => clearInterval(intervalId);
    }, []),
  );

  const args = {
    number: '9093900003', // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };

  const SendOtp = async () => {
    try {
      const config = {
        url: '/user/sendBookingOTP',
        baseURL: '${API_CONFIG.BASE_URL}',
        method: 'post',
        hearder: {'content-type': 'application/json'},
        data: {
          mobile: item?.users[0]?.mobile,
        },
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          alert('OTP sent successfully');
        }
      });
    } catch (error) {}
  };

  const otpverify = async () => {
    if (!value) {
      alert('Please Enter OTP sent to your mobile number');
    } else {
      try {
        const config = {
          url: '/user/verifyBookingOTP',
          method: 'post',
          baseURL: '${API_CONFIG.BASE_URL}',
          // headers: {'content-type': 'application/json'},
          data: {
            mobile: item?.users[0]?.mobile,
            otp: value,
          },
        };
        let res = await axios(config);
        if (res.status === 200) {
          alert('OTP verified successfully');
          navigation.navigate('CompleteRide', {item: item});
        }
      } catch (error) {
        console.log(error.response);
        if (error.response) {
          alert(error.response.data.error);
        }
      }
    }
  };

  //   console.log('item', latitude, longitude);
  return (
    <>
      <View
        style={[
          styles.container,
          // {backgroundColor: modalVisible || modalExtend ? 'gray' : 'white'},
        ]}>
        <StatusBar
          translucent
          backgroundColor="#1e921b"
          barStyle="light-content"
        />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" color="white" size={25} />
          </TouchableOpacity>
          <Text style={styles.headertext}>Verify OTP</Text>
        </View>
        <ScrollView>
          <Animatable.View animation="fadeIn">
            <View style={{height: hp('85%'), width: '100%'}}>
              <MapView
                style={{flex: 1}}
                initialRegion={{
                  latitude: latitude ? latitude : 13.199379,
                  longitude: longitude ? longitude : 77.710136,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                showsCompass={true}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}></MapView>
            </View>
          </Animatable.View>
          <View
            style={{
              marginTop: -150,
              // paddingVertical: '25%',
              paddingTop: 30,
              // flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#1e921b',
            }}>
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
                {enableMask ? (
                  <Entypo name="eye-with-line" color="white" size={30} />
                ) : (
                  <Entypo name="eye" color="white" size={30} />
                )}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 150,
                marginHorizontal: 30,
                marginTop: 10,
              }}>
              <Text style={{color: 'white'}}>{otpCountdown} Sec</Text>

              <TouchableOpacity
                onPress={handleResendOTP}
                disabled={isResendDisabled}>
                <Text style={{color: isResendDisabled ? '#1e921b' : 'white'}}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={otpverify}>
              <View style={styles.btn}>
                <Text style={{color: '#1e921b', fontWeight: 'bold'}}>
                  Verify OTP
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default BookingOtpVerify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: '9%',
    width: '100%',
    backgroundColor: '#1e921b',
    padding: 10,
    flexDirection: 'row',
    gap: 10,
  },
  headertext: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileV: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 10,
    border: 'none',
  },
  profileV1: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 10,
  },
  courseimg: {
    width: 80,
    height: 50,
    borderRadius: 100,
  },
  dateV: {
    backgroundColor: '#1e921b',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  dateV1: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: '#1e921b',
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    flex: 0.3,
  },
  btn: {
    alignSelf: 'center',
    margin: 10,
    backgroundColor: 'white', //blue
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginTop: '15%',
    marginBottom: '5%',
  },
  inputView: {
    alignSelf: 'center',
    // borderWidth: 1,
    width: 250,
    height: 100,
    marginTop: '15%',
    borderRadius: 10,
    padding: 10,
    borderColor: 'gray',
    marginBottom: '10%',
    color: 'black',
    backgroundColor: '#f1f1f1',
    opacity: 30,
    elevation: 30,
    shadowColor: 'gray',
  },
  inputView1: {
    alignSelf: 'center',
    // borderWidth: 1,
    width: 250,
    height: 50,
    marginTop: '15%',
    borderRadius: 10,
    padding: 10,
    borderColor: 'gray',
    marginBottom: '10%',
    color: 'black',
    backgroundColor: '#f1f1f1',
    opacity: 30,
    elevation: 30,
    shadowColor: 'gray',
  },
  btnPuase: {
    alignSelf: 'center',
    margin: 10,
    backgroundColor: '#1e921b',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  maptruck: {
    width: 55,
    height: 30,
  },
  directionsButton: {
    backgroundColor: '#1e921b',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 10,
  },
  focusCell: {borderColor: 'white'},
  fieldRow: {
    // marginTop: 40,
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
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
  },
});
