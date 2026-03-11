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
  BackHandler,
  AppState,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Animatable from 'react-native-animatable';
import Geolocation from '@react-native-community/geolocation';

function CompleteRide({route, navigation}) {
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

  // const [seconds, setSeconds] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSeconds(seconds + 1);
  //   }, 1000);

  //   // Clear the interval when component unmounts
  //   return () => clearInterval(interval);
  // }, [seconds]);

  // // Convert seconds to hours, minutes, and seconds
  // const hours = Math.floor(seconds / 3600);
  // const minutes = Math.floor((seconds % 3600) / 60);
  // const remainingSeconds = seconds % 60;

  // const TrainingTime = hours + ':' + minutes + ':' + remainingSeconds;
  // console.log('TrainingTime', TrainingTime);

  const [start, setstart] = useState(false);
  const [startkm, setstartkm] = useState();
  const [endkm, setendkm] = useState();
  const [isActive, setIsActive] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Listen for app state changes (foreground/background)
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        const now = Date.now();
        const diffInSeconds = Math.floor((now - lastTimeRef.current) / 1000);
        setSeconds(prevSeconds => prevSeconds + diffInSeconds);
      }

      setAppState(nextAppState);
    });

    // Clear interval and remove subscription when the component unmounts
    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, [appState]);

  useEffect(() => {
    lastTimeRef.current = Date.now(); // Store current time whenever `seconds` changes
  }, [seconds]);

  // Convert seconds to hours, minutes, and seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const TrainingTime = `${hours}:${minutes}:${remainingSeconds}`;

  console.log('TrainingTime', TrainingTime);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const CompleteTraning = async () => {
    if (!endkm) {
      alert('Plaese enter End km to complete your training');
    } else if (parseInt(startkm) > parseInt(endkm)) {
      alert('End km should be greater than Start km');
    } else {
      try {
        const config = {
          url: '/user/CompleteTraning',
          method: 'post',
          baseURL: '${API_CONFIG.BASE_URL}',
          data: {
            BookingID: item?.MainBookingId,
            TrainingTime: TrainingTime,
            DailyBookingID: item?._id,
            Attendance_Date: moment().format('DD/MM/YYYY'),
            DriverID: driver?._id,
            DriverName: driver?.name,
            AssignedBy: item?.AssignedBy,
            BookingTime: item?.SelectedTime,
            endkm: endkm,
          },
        };
        let response = await axios(config);
        if (response.status === 200) {
          alert(`Training Completed successfully`);
          navigation.navigate('Home');
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          alert(error.response.data.error);
        }
      }
    }
  };

  const StartTraining = async () => {
    if (!startkm) {
      alert('Plaese enter start km to start your training');
    } else {
      try {
        const config = {
          url: '/user/StartTraining',
          method: 'post',
          baseURL: '${API_CONFIG.BASE_URL}',
          data: {
            BookingID: item?.MainBookingId,
            DailyBookingID: item?._id,
            DriverMobile: driver?.mobile,
            startkm: startkm,
          },
        };
        let response = await axios(config);
        if (response.status === 200) {
          alert(`Training Started successfully`);
          setstart(true);
          handleStart();
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          alert(error.response.data.error);
        }
      }
    }
  };
  // console.log('start', start);
  console.log('startkm', startkm, endkm);

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
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" color="white" size={25} />
          </TouchableOpacity> */}
          <Text style={styles.headertext}>Training Started</Text>
        </View>
        <Animatable.View animation="fadeIn">
          <View style={{height: '80%', width: '100%'}}>
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

        {start ? (
          <View
            style={{
              marginTop: -260,
              // paddingVertical: '25%',
              paddingTop: 30,
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              backgroundColor: '#1e921b',
            }}>
            <View style={styles.timerView}>
              <Text style={styles.timer}>
                {/* {hours < 10 ? '0' + hours : hours}:
                {minutes < 10 ? '0' + minutes : minutes}:
                {remainingSeconds < 10
                  ? '0' + remainingSeconds
                  : remainingSeconds} */}
                {TrainingTime}
              </Text>
            </View>
            <TextInput
              style={styles.inputView}
              placeholder="Enter end km*"
              placeholderTextColor="gray"
              onChangeText={endkm => setendkm(endkm)}
              keyboardType="numeric"
              value={endkm}></TextInput>

            <TouchableOpacity onPress={CompleteTraning}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: 200,
                  alignSelf: 'center',
                  margin: 10,
                  padding: 10,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#1e921b',
                    fontWeight: 'bold',
                  }}>
                  Complete Training
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              marginTop: -130,
              // paddingVertical: '25%',
              paddingTop: 30,
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              backgroundColor: '#1e921b',
              paddingBottom: 25,
            }}>
            <TextInput
              style={styles.inputView}
              placeholder="Enter initial km*"
              placeholderTextColor="gray"
              keyboardType="numeric"
              onChangeText={startkm => setstartkm(startkm)}
              value={startkm}></TextInput>

            <TouchableOpacity onPress={StartTraining}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: 200,
                  alignSelf: 'center',
                  margin: 20,
                  padding: 10,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#1e921b',
                    fontWeight: 'bold',
                  }}>
                  Start
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

export default CompleteRide;

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
  timer: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  timerView: {
    borderColor: 'white',
    borderWidth: 3,
    margin: 10,
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 100,
    justifyContent: 'center',
  },
  inputView: {
    alignSelf: 'center',
    // borderWidth: 1,
    width: '95%',
    height: 50,
    // marginTop: '20%',
    // borderRadius: 30,
    // textAlign: 'center',
    padding: 10,
    borderColor: 'gray',
    marginBottom: '10%',
    color: 'black',
    backgroundColor: '#f1f1f1',
    // opacity: 30,
    // elevation: 30,
    // shadowColor: '#1e921b',
  },
});
