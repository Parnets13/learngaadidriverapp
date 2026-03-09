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

function StudentAttendance({navigation}) {
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
        <Text style={styles.headertext}>Student Attendance</Text>
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

      <View style={styles.profileV1}>
        <Text
          style={{
            color: '#1e921b',
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center',
          }}>
          Start Date : April 18th - May 07th
        </Text>
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <View style={styles.dateV}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>18</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>19</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>20</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>21</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>22</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>23</Text>
          </View>
        </View>
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>24</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>25</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>26</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>27</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>28</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>29</Text>
          </View>
        </View>
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>30</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>1</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>2</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>3</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>4</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>5</Text>
          </View>
        </View>
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>6</Text>
          </View>
          <View style={styles.dateV1}>
            <Text style={{color: '#1e921b', fontWeight: 'bold'}}>7</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Home1')}>
        <View style={styles.btn}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Training Completed
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default StudentAttendance;

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
  profileV1: {
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
