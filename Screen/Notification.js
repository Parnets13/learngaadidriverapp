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
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import HTML from 'react-native-render-html';
import moment from 'moment';

function Notification({navigation}) {
  const [Notifi, setNotifi] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getNotification();
    }, []),
  );

  const getNotification = () => {
    axios
      .get('http://192.168.1.34:8781/api/admin/getNotification')
      .then(function (response) {
        console.log(response.data.NotificationList);
        setNotifi(
          response.data.NotificationList?.filter(
            notify => notify?.NotificationFor === 'Drivers',
          ),
        );
      })
      .catch(function (error) {
        console.log(error);
      });
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
        <Text style={styles.headertext}>Notification</Text>
      </View>
      <View style={{paddingBottom: '20%'}}>
        <ScrollView>
          {Notifi?.map(notify => (
            <View style={styles.profileV}>
              <HTML
                source={{
                  html: `<div style="color: gray">${notify?.notification}</div>`,
                }}
              />

              <Text style={{color: 'gray', marginTop: 10, textAlign: 'right'}}>
                {moment(notify?.createdAt).format('Do MMMM YYYY hh:mm a')}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* <View style={styles.profileV}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>
          Important message
        </Text>
        <Text style={{color: 'gray', justifyContent: 'center'}}>
          Learn Gaadi will nerver ask for your password or OTP. Please do not
          share the password of OTP with anyone.
        </Text>
        <Text style={{color: 'gray', marginTop: 10, textAlign: 'right'}}>
          14th April, 03:05 PM
        </Text>
      </View> */}
    </View>
  );
}

export default Notification;

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
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
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
});
