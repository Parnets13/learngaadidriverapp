import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

function PrivacyPolicy({navigation}) {
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
      </View>

      <Text style={styles.title}>Privacy Policy</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.intro}>
            LearnGaadi is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.
          </Text>

          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Personal Information:{'\n'}</Text>
            • Name, phone number, email address{'\n'}
            • Profile picture{'\n'}
            • Address (Area, City, State, Country, Pincode){'\n'}
            • Date of birth and gender{'\n\n'}
            
            <Text style={styles.bold}>Documents:{'\n'}</Text>
            • Aadhar Card{'\n'}
            • Driving License{'\n\n'}
            
            <Text style={styles.bold}>Usage Information:{'\n'}</Text>
            • Booking history{'\n'}
            • Location data during rides{'\n'}
            • App usage patterns{'\n'}
            • Device information
          </Text>

          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.text}>
            • To create and manage your driver account{'\n'}
            • To connect you with students for driving lessons{'\n'}
            • To process bookings and payments{'\n'}
            • To send notifications about bookings and updates{'\n'}
            • To improve our services{'\n'}
            • To ensure safety and security{'\n'}
            • To comply with legal requirements
          </Text>

          <Text style={styles.sectionTitle}>3. Information Sharing</Text>
          <Text style={styles.text}>
            We share your information only in these cases:{'\n\n'}
            • With students who book your services (name, photo, contact){'\n'}
            • With service providers who help us operate the app{'\n'}
            • When required by law or legal process{'\n'}
            • To protect rights, property, or safety{'\n\n'}
            We do NOT sell your personal information to third parties.
          </Text>

          <Text style={styles.sectionTitle}>4. Data Security</Text>
          <Text style={styles.text}>
            We implement security measures to protect your information:{'\n'}
            • Encrypted data transmission{'\n'}
            • Secure servers{'\n'}
            • Access controls{'\n'}
            • Regular security audits{'\n\n'}
            However, no method of transmission over the internet is 100% secure.
          </Text>

          <Text style={styles.sectionTitle}>5. Your Rights</Text>
          <Text style={styles.text}>
            You have the right to:{'\n'}
            • Access your personal information{'\n'}
            • Update or correct your information{'\n'}
            • Delete your account{'\n'}
            • Opt-out of promotional communications{'\n'}
            • Request a copy of your data
          </Text>

          <Text style={styles.sectionTitle}>6. Location Data</Text>
          <Text style={styles.text}>
            We collect location data during rides to:{'\n'}
            • Track ride progress{'\n'}
            • Ensure student safety{'\n'}
            • Provide navigation assistance{'\n'}
            • Maintain booking records{'\n\n'}
            You can disable location services, but this may affect app functionality.
          </Text>

          <Text style={styles.sectionTitle}>7. Data Retention</Text>
          <Text style={styles.text}>
            We retain your information as long as your account is active or as needed to provide services. After account deletion, we may retain certain information for legal compliance.
          </Text>

          <Text style={styles.sectionTitle}>8. Children's Privacy</Text>
          <Text style={styles.text}>
            This app is intended for drivers aged 18 and above. We do not knowingly collect information from minors.
          </Text>

          <Text style={styles.sectionTitle}>9. Changes to Privacy Policy</Text>
          <Text style={styles.text}>
            We may update this policy from time to time. We will notify you of significant changes through the app or email.
          </Text>

          <Text style={styles.sectionTitle}>10. Contact Us</Text>
          <Text style={styles.text}>
            For privacy-related questions or concerns, please contact us through the app's Contact Us section.
          </Text>

          <Text style={styles.footer}>
            Last Updated: March 2026{'\n\n'}
            By using LearnGaadi, you agree to this Privacy Policy.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default PrivacyPolicy;

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
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 15,
    color: '#1e921b',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    margin: 15,
    paddingBottom: 30,
  },
  intro: {
    fontSize: 15,
    textAlign: 'justify',
    color: '#333',
    lineHeight: 22,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e921b',
    marginTop: 15,
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    textAlign: 'justify',
    color: '#333',
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
    color: '#1e921b',
  },
  footer: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
