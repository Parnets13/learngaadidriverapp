import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Menu({navigation}) {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

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

  const logOut = () => {
    axios
      .get('http://192.168.1.34:8781/api/driver/driverSignout/' + driver?._id)
      .then(function (response) {
        console.log(response.data.Success);
        alert(response.data.Success);
        AsyncStorage.removeItem('driver');
        navigation.navigate('Otplogin');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // console.log('driver', driver);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <Image
              source={{
                uri: 'http://192.168.1.34:8781/Driver/' + driver?.profilepic,
              }}
              style={styles.profileAvatar}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              handleChoosePhoto();
            }}>
            <View style={styles.profileAction}>
              <FeatherIcon color="#fff" name="edit-3" size={15} />
            </View>
          </TouchableOpacity> */}

          <View>
            <Text style={styles.profileName}>{driver?.name}</Text>
            <Text style={styles.profileAddress}>
              {driver?.Area}, {driver?.City}, {driver?.State}, {driver?.Country}
              , {driver?.Pincode}
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Myprofile');
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, {backgroundColor: '#fe9400'}]}>
                <FeatherIcon color="#fff" name="driver" size={20} />
              </View>

              <Text style={styles.rowLabel}>My Profile</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                // navigation.navigate('ForgetPassword');
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, {backgroundColor: '#32c759'}]}>
                <MaterialCommunityIcons
                  color="#fff"
                  name="onepassword"
                  size={20}
                />
              </View>

              <Text style={styles.rowLabel}>Change Password</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BookingHistory');
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, {backgroundColor: '#32c759'}]}>
                <FontAwesome color="#fff" name="history" size={20} />
              </View>

              <Text style={styles.rowLabel}>Booking History</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('StudentList');
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, {backgroundColor: '#32c759'}]}>
                <Fontisto color="#fff" name="persons" size={20} />
              </View>

              <Text style={styles.rowLabel}>Student List</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}>
              <View style={styles.row}>
                <View
                  style={[
                    styles.rowIcon,
                    {backgroundColor: '#38C959', position: 'relative'},
                  ]}>
                  <FeatherIcon color="#fff" name="bell" size={20} />
                </View>

                <Text style={styles.rowLabel}>Notifications</Text>
                <View style={styles.rowSpacer} />

                {/* <Text
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: 50,
                    padding: 10,
                  }}>
                  2
                </Text> */}
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
              <View style={styles.row}>
                <View style={[styles.rowIcon, {backgroundColor: '#38C959'}]}>
                  <Ionicons color="#fff" name="wallet-outline" size={20} />
                </View>
                <Text style={styles.rowLabel}>Wallet</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </View>
            </TouchableOpacity> */}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Abooutus');
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, {backgroundColor: '#8e8d91'}]}>
                <AntDesign color="#fff" name="appstore1" size={20} />
              </View>

              <Text style={styles.rowLabel}>About us</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                // navigation.navigate('ChatScreen');
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, {backgroundColor: '#8e8d91'}]}>
                <FontAwesome color="#fff" name="support" size={20} />
              </View>

              <Text style={styles.rowLabel}>Support</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('ChatScreen');
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, {backgroundColor: '#8e8d91'}]}>
                <Foundation color="#fff" name="clipboard-notes" size={20} />
              </View>

              <Text style={styles.rowLabel}>T&C</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('ChatScreen');
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, {backgroundColor: '#8e8d91'}]}>
                <Fontisto color="#fff" name="onenote" size={20} />
              </View>

              <Text style={styles.rowLabel}>Privacy Policy</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('ChatScreen');
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, {backgroundColor: '#8e8d91'}]}>
                <Entypo color="#fff" name="warning" size={20} />
              </View>

              <Text style={styles.rowLabel}>Disclaimer</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Contactus');
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, {backgroundColor: '#007afe'}]}>
                <FeatherIcon color="#fff" name="mail" size={20} />
              </View>

              <Text style={styles.rowLabel}>Contact Us</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, {backgroundColor: '#32c759'}]}>
                <FeatherIcon color="#fff" name="star" size={20} />
              </View>

              <Text style={styles.rowLabel}>Rate in App Store</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity> */}
          </View>
        </ScrollView>
        <View style={styles.section}>
          <TouchableOpacity onPress={logOut} style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: 'red'}]}>
              <AntDesign color="#fff" name="logout" size={20} />
            </View>

            <Text style={[styles.rowLabel, {color: 'red'}]}>LogOut</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Profile */
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    left: 10,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  /** Section */
  section: {
    paddingHorizontal: 21,
  },
  sectionTitle: {
    paddingVertical: 8,
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
