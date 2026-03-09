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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import CheckBox from 'react-native-check-box';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

function Accepted({navigation}) {
  const [SendOTP, setSendOTP] = useState(false);

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

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#1e921b"
        barStyle="light-content"
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" color="white" size={25} />
        </TouchableOpacity>
        <Text style={styles.headertext}>Student Details</Text>
      </View>
      <View style={styles.profileV}>
        <View style={{flex: 0.7}}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
            }}>
            <Ionicons
              name="person-circle"
              color="#1e921b"
              size={20}
              style={{margin: 10}}
            />
            Name
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
            }}>
            <FontAwesome
              name="phone"
              color="#1e921b"
              size={20}
              style={{margin: 10}}
            />
            9876656788
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
            }}>
            <Entypo
              name="location-pin"
              color="#1e921b"
              size={20}
              style={{margin: 10}}
            />
            Singapura, Vidyranyapuram,Bengalore
          </Text>
        </View>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
          }}
          style={styles.profileAvatar}
        />
      </View>
      <View style={styles.profileV}>
        <View style={styles.package}>
          <Text
            style={{
              color: '#1e921b',
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
            }}>
            Learner Standard Track Course
          </Text>
          <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 5,
              }}>
              <Fontisto name="date" /> 18th April
            </Text>
            <View
              style={{
                backgroundColor: '#1e921b',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 50,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                20
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
            }}>
            <Entypo name="time-slot" /> 06:00 PM --- 07:00 PM
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
            }}>
            ₹ 5000
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
            }}>
            <Entypo name="location-pin" size={15} />
            Singapura, Vidyranyapuram,Bengalore
          </Text>
          <FontAwesome name="car" color="red" size={30} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}></View>
        </View>
      </View>

      {!SendOTP ? (
        <TouchableOpacity onPress={() => setSendOTP(!SendOTP)}>
          <View style={styles.btn}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Send OTP to start Training
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <>
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
              justifyContent: 'space-around',
              //   gap: 10,
              //   marginTop: 10,
            }}>
            <Text style={{color: 'gray'}}>{otpCountdown} Sec</Text>

            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={isResendDisabled}>
              <Text style={{color: isResendDisabled ? 'gray' : '#1e921b'}}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('StudentAttendance')}>
            <View style={styles.btn}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Verify</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default Accepted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    flex: 0.3,
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
  btn: {
    alignSelf: 'center',
    margin: 10,
    backgroundColor: '#1e921b', //blue
    // backgroundColor: '#1e921b', //green
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    // marginTop: '15%',
  },
});
