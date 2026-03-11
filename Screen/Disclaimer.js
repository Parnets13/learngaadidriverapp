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

function Disclaimer({navigation}) {
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

      <Text style={styles.title}>Disclaimer</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.intro}>
            Please read this disclaimer carefully before using the LearnGaadi Driver App. By using this app, you acknowledge and agree to the following terms.
          </Text>

          <Text style={styles.sectionTitle}>1. General Information</Text>
          <Text style={styles.text}>
            The information provided through LearnGaadi Driver App is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the app or the information contained within.
          </Text>

          <Text style={styles.sectionTitle}>2. No Professional Advice</Text>
          <Text style={styles.text}>
            The content provided in this app does not constitute professional driving instruction advice, legal advice, or any other form of professional advice. Drivers are responsible for their own professional conduct and compliance with all applicable laws and regulations.
          </Text>

          <Text style={styles.sectionTitle}>3. Independent Contractors</Text>
          <Text style={styles.text}>
            Drivers using LearnGaadi are independent contractors and not employees of LearnGaadi. LearnGaadi acts solely as a platform to connect drivers with students seeking driving lessons. We do not control how drivers conduct their lessons or manage their schedules.
          </Text>

          <Text style={styles.sectionTitle}>4. Limitation of Liability</Text>
          <Text style={styles.text}>
            LearnGaadi, its owners, employees, and affiliates shall not be liable for:{'\n\n'}
            • Any accidents, injuries, or damages occurring during driving lessons{'\n'}
            • Loss of income or business opportunities{'\n'}
            • Technical issues or app malfunctions{'\n'}
            • Disputes between drivers and students{'\n'}
            • Any direct, indirect, incidental, or consequential damages{'\n'}
            • Loss of data or information{'\n'}
            • Unauthorized access to your account
          </Text>

          <Text style={styles.sectionTitle}>5. Vehicle and Insurance</Text>
          <Text style={styles.text}>
            Drivers are solely responsible for:{'\n'}
            • Maintaining valid vehicle insurance{'\n'}
            • Ensuring vehicle roadworthiness{'\n'}
            • Complying with all vehicle-related regulations{'\n'}
            • Any damages to their vehicle during lessons{'\n\n'}
            LearnGaadi does not provide vehicle insurance and is not responsible for any vehicle-related issues.
          </Text>

          <Text style={styles.sectionTitle}>6. Accuracy of Information</Text>
          <Text style={styles.text}>
            While we make every effort to verify driver credentials, we cannot guarantee the accuracy of all information provided by drivers. Students are encouraged to verify driver credentials independently.
          </Text>

          <Text style={styles.sectionTitle}>7. Third-Party Links</Text>
          <Text style={styles.text}>
            The app may contain links to third-party websites or services. LearnGaadi has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </Text>

          <Text style={styles.sectionTitle}>8. Service Availability</Text>
          <Text style={styles.text}>
            We do not guarantee that:{'\n'}
            • The app will be available at all times{'\n'}
            • The app will be error-free or uninterrupted{'\n'}
            • Defects will be corrected{'\n'}
            • The app is free from viruses or harmful components{'\n\n'}
            We reserve the right to modify or discontinue the service at any time without notice.
          </Text>

          <Text style={styles.sectionTitle}>9. Payment Disputes</Text>
          <Text style={styles.text}>
            LearnGaadi is not responsible for payment disputes between drivers and students. While we facilitate payment processing, we do not guarantee payment collection or resolve financial disputes.
          </Text>

          <Text style={styles.sectionTitle}>10. Legal Compliance</Text>
          <Text style={styles.text}>
            Drivers are responsible for:{'\n'}
            • Complying with all local, state, and national laws{'\n'}
            • Maintaining valid licenses and permits{'\n'}
            • Paying applicable taxes{'\n'}
            • Following traffic regulations{'\n\n'}
            LearnGaadi is not responsible for any legal violations by drivers.
          </Text>

          <Text style={styles.sectionTitle}>11. User Conduct</Text>
          <Text style={styles.text}>
            Drivers are solely responsible for their conduct and interactions with students. LearnGaadi does not monitor or control driver behavior during lessons and is not liable for any misconduct.
          </Text>

          <Text style={styles.sectionTitle}>12. Changes to Disclaimer</Text>
          <Text style={styles.text}>
            We reserve the right to update or modify this disclaimer at any time without prior notice. Continued use of the app after changes constitutes acceptance of the modified disclaimer.
          </Text>

          <Text style={styles.warning}>
            ⚠️ IMPORTANT: By using this app, you acknowledge that you have read, understood, and agree to this disclaimer. If you do not agree with any part of this disclaimer, please discontinue use of the app immediately.
          </Text>

          <Text style={styles.footer}>
            Last Updated: March 2026{'\n\n'}
            For questions about this disclaimer, contact us through the app.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default Disclaimer;

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
    fontWeight: '500',
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
  warning: {
    fontSize: 15,
    textAlign: 'justify',
    color: '#d32f2f',
    lineHeight: 22,
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    fontWeight: '500',
  },
  footer: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
