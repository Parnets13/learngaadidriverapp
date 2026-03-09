import {StyleSheet, Text, View, Linking} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splashscreen from './Splashscreen';
import Otplogin from './Otplogin';
import VerifyOtp from './VerifyOtp';
import Otpverified from './Otpverified';
import Register from './Register';
import Register1 from './Register1';
import Home from './Home';
import Register2 from './Register2';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Menu from './Menu';
import AddTime from './AddTime';
import Home1 from './Home1';
import StudentDetaisl from './StudentDetaisl';
import Accepted from './Accepted';
import StudentAttendance from './StudentAttendance';
import Myprofile from './Myprofile';
import EditProfile from './EditProfile';
import BookingHistory from './BookingHistory';
import StudentList from './StudentList';
import AllStudentdetails from './AllStudentdetails';
import Notification from './Notification';
import Wallet from './Wallet';
import Contactus from './Contactus';
import Usertrack from './Usertrack';
import BookingOtpVerify from './BookingOtpVerify';
import CompleteRide from './CompleteRide';
import Abooutus from './Abooutus';
const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Navigation = () => {
  function MyDrawer() {
    return (
      <Drawer.Navigator drawerContent={Menu}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Splashscreen">
        <Stack.Screen
          name="Splashscreen"
          component={Splashscreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Otplogin"
          component={Otplogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Otpverified"
          component={Otpverified}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register1"
          component={Register1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register2"
          component={Register2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={MyDrawer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home1"
          component={Home1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddTime"
          component={AddTime}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StudentDetaisl"
          component={StudentDetaisl}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Accepted"
          component={Accepted}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StudentAttendance"
          component={StudentAttendance}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Myprofile"
          component={Myprofile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookingHistory"
          component={BookingHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StudentList"
          component={StudentList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AllStudentdetails"
          component={AllStudentdetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Usertrack"
          component={Usertrack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookingOtpVerify"
          component={BookingOtpVerify}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompleteRide"
          component={CompleteRide}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Contactus"
          component={Contactus}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Abooutus"
          component={Abooutus}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
