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

function TermsConditions({navigation}) {
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

      <Text style={styles.title}>Terms & Conditions</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By accessing and using LearnGaadi Driver App, you accept and agree to be bound by the terms and provision of this agreement.
          </Text>

          <Text style={styles.sectionTitle}>2. Driver Registration</Text>
          <Text style={styles.text}>
            • You must provide accurate and complete information during registration{'\n'}
            • You must have a valid driving license{'\n'}
            • You must upload genuine documents (Aadhar Card, Driving License){'\n'}
            • You are responsible for maintaining the confidentiality of your account
          </Text>

          <Text style={styles.sectionTitle}>3. Driver Responsibilities</Text>
          <Text style={styles.text}>
            • Provide safe and professional driving instruction{'\n'}
            • Maintain punctuality for scheduled bookings{'\n'}
            • Keep your vehicle in good condition{'\n'}
            • Follow all traffic rules and regulations{'\n'}
            • Treat students with respect and professionalism
          </Text>

          <Text style={styles.sectionTitle}>4. Booking & Cancellation</Text>
          <Text style={styles.text}>
            • Accept or reject bookings within the specified time{'\n'}
            • Inform students in advance if you need to cancel{'\n'}
            • Excessive cancellations may result in account suspension{'\n'}
            • Complete rides as per the scheduled time
          </Text>

          <Text style={styles.sectionTitle}>5. Payment Terms</Text>
          <Text style={styles.text}>
            • Payments will be processed as per the agreed terms{'\n'}
            • LearnGaadi may deduct service charges from your earnings{'\n'}
            • You are responsible for any applicable taxes
          </Text>

          <Text style={styles.sectionTitle}>6. Account Suspension</Text>
          <Text style={styles.text}>
            LearnGaadi reserves the right to suspend or terminate your account if you:{'\n'}
            • Violate these terms and conditions{'\n'}
            • Receive multiple complaints from students{'\n'}
            • Provide false information{'\n'}
            • Engage in inappropriate behavior
          </Text>

          <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
          <Text style={styles.text}>
            LearnGaadi is not liable for any damages arising from the use of this app or services provided through it.
          </Text>

          <Text style={styles.sectionTitle}>8. Changes to Terms</Text>
          <Text style={styles.text}>
            We reserve the right to modify these terms at any time. Continued use of the app constitutes acceptance of modified terms.
          </Text>

          <Text style={styles.footer}>
            Last Updated: March 2026{'\n\n'}
            For questions, contact us through the app.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default TermsConditions;

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
  footer: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
