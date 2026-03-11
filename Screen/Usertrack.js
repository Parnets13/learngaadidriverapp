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
import database from '@react-native-firebase/database';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function Usertrack({route, navigation}) {
  const {item} = route.params;
  const [Booking, setBooking] = useState({});
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

  const getBookingByID = () => {
    axios
      .get('${API_CONFIG.BASE_URL}/user/getBooking')
      .then(function (response) {
        setBooking(
          response.data.BookingList?.find(pen => pen?._id === item?._id),
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [timeDuration, settimeDuration] = useState();

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setError(null);
        fetchDirections(position.coords.latitude, position.coords.longitude);
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
      }, 10000); // 5000 milliseconds = 10 seconds
      return () => clearInterval(intervalId);
    }, []),
  );

  const fetchDirections = async (latitude, longitude) => {
    try {
      const apiKey = 'AIzaSyACW1po0qU1jptIybBPGdFY-_MrycQPjfk';
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${latitude},${longitude}&destination=${item?.latitute},${item?.logitute}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      //   console.log('data', data.routes[0]?.legs[0]?.duration?.text);
      settimeDuration(data.routes[0]?.legs[0]?.duration?.text);
      const points = data.routes[0].overview_polyline.points;
      const routeCoords = decodePolyline(points);
      //   console.log('routeCoords', routeCoords);
      setRouteCoordinates(routeCoords);
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  const decodePolyline = encoded => {
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;
    const coordinates = [];

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      const latitude = lat / 1e5;
      const longitude = lng / 1e5;
      coordinates.push({latitude, longitude});
    }
    return coordinates;
  };

  const openDirectionsInGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${item?.latitute},${item?.logitute}`;
    Linking.openURL(url);
  };

  const args = {
    number: item?.users[0]?.mobile.toString(), // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };
  // console.log('args', args);

  const [usertravel, setusertravel] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const calculateDistance = (
    itemlatitute,
    itemlogitute,
    latitude,
    longitude,
  ) => {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = (itemlatitute - latitude) * (Math.PI / 180); // Convert degrees to radians
    const dLon = (itemlogitute - longitude) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(latitude * (Math.PI / 180)) *
        Math.cos(itemlatitute * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const checkDistance = (latitude, longitude, itemlatitute, itemlogitute) => {
    const distance = calculateDistance(
      latitude,
      longitude,
      itemlatitute,
      itemlogitute,
    );
    if (distance <= 0.2) {
      console.log('distance', distance);
      setusertravel(true);
    }
  };

  useEffect(() => {
    checkDistance(latitude, longitude, item?.latitute, item?.logitute);
  }, [latitude, longitude, item?.latitute, item?.logitute]);

  useEffect(() => {
    if (usertravel) {
      setModalVisible(true);
    }
  }, [usertravel]);

  useEffect(() => {
    if (routeCoordinates?.length > 0) {
      updateDriverAddress();
    }
  }, [routeCoordinates]);

  const updateDriverAddress = async () => {
    try {
      const config = {
        url: '/user/updateDriverAddress',
        method: 'post',
        baseURL: '${API_CONFIG.BASE_URL}',
        data: {
          BookingID: item?._id,
          Driverlatitude: latitude,
          Driverlongitude: longitude,
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(error.response.data.error);
      }
    }
  };

  // console.log('item', location.coords.latitude, location.coords.longitude);
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
          <Text style={styles.headertext}>{item?.StartAddress}</Text>
        </View>
        <Animatable.View animation="fadeIn">
          <View style={{height: hp('90%'), width: '100%'}}>
            <MapView
              style={{flex: 1}}
              initialRegion={{
                latitude: 13.199379,
                longitude: 77.710136,
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
              rotateEnabled={true}>
              {item?.latitute && (
                <MapViewDirections
                  destination={{
                    latitude: parseFloat(item?.latitute),
                    longitude: parseFloat(item?.logitute),
                  }}
                  origin={{
                    latitude: latitude ? parseFloat(latitude) : 13.035781,
                    longitude: longitude ? parseFloat(longitude) : 77.597008,
                  }}
                  apikey="AIzaSyACW1po0qU1jptIybBPGdFY-_MrycQPjfk"
                  strokeWidth={3}
                  strokeColor="#d81d4a"
                />
              )}

              {item?.latitute & item?.logitute ? (
                <>
                  <Marker
                    description="user"
                    coordinate={{
                      latitude: parseFloat(item?.latitute),
                      longitude: parseFloat(item?.logitute),
                    }}>
                    {item?.users[0]?.profilepic ? (
                      <>
                        <Image
                          source={{
                            uri: `https://learngaadi-x496.onrender.com/User/${item?.users[0]?.profilepic}`,
                          }}
                          style={{
                            height: 35,
                            width: 35,
                            borderRadius: 50,
                            marginTop: 13,
                            marginBottom: 5,
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <Image
                          style={styles.maptruck}
                          source={require('../assets/Image/cab.png')}
                        />
                      </>
                    )}
                  </Marker>
                </>
              ) : (
                <></>
              )}
              {latitude && longitude ? (
                <>
                  <Marker
                    description="driver"
                    coordinate={{
                      latitude: parseFloat(latitude),
                      longitude: parseFloat(longitude),
                    }}>
                    <View>
                      <Text style={{color: 'blue'}}>{timeDuration}</Text>
                      <Image
                        style={styles.maptruck}
                        source={require('../assets/Image/cab.png')}
                      />
                    </View>
                  </Marker>
                </>
              ) : (
                <></>
              )}
              <Polyline
                coordinates={routeCoordinates}
                strokeWidth={3}
                strokeColor="blue"
              />
            </MapView>
            {/* <TouchableOpacity onPress={openDirectionsInGoogleMaps}>
              <Text style={styles.directionsButton}>Get Directions</Text>
            </TouchableOpacity> */}
          </View>
        </Animatable.View>
        <View
          style={{
            marginTop: -90,
            paddingVertical: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#1e921b',
          }}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Image
              source={{
                uri: `https://learngaadi-x496.onrender.com/User/${item?.users[0]?.profilepic}`,
              }}
              style={{
                height: 35,
                width: 35,
                borderRadius: 50,
                marginBottom: 5,
              }}
            />
            <Text style={{color: 'white', marginTop: 6, fontWeight: 'bold'}}>
              {item?.users[0]?.name}
            </Text>
          </View>

          <TouchableOpacity onPress={() => call(args).catch(console.error)}>
            <View
              style={{
                backgroundColor: '#1e921b',
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}>
              <FontAwesome name="phone" color="white" size={25} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  You have reached customer place..!
                </Text>
                <TouchableOpacity
                  onPress={() => call(args).catch(console.error)}>
                  <View
                    style={{
                      backgroundColor: '#1e921b',
                      width: 40,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 100,
                    }}>
                    <FontAwesome name="phone" color="white" size={25} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('BookingOtpVerify', {item: item});
                    setModalVisible(!modalVisible);
                  }}>
                  <View
                    style={{
                      backgroundColor: '#1e921b',
                      width: 100,
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 10,
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      Continue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </>
  );
}

export default Usertrack;

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
    backgroundColor: '#1e921b', //blue
    // backgroundColor: '#1e921b', //green
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    // marginTop: '15%',
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
});
