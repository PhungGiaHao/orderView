import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import IconSvg from '../components/ui/IconSvg';

const Settings: React.FC = () => {
  // Dummy state for settings
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [emailUpdates, setEmailUpdates] = React.useState(true);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <IconSvg name="settings" size={24} color="#2563eb" />
        <Text style={styles.header}>Settings</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Enable Notifications</Text>
            <Text style={styles.settingDescription}>Receive notifications about order updates</Text>
          </View>
          <Switch 
            value={notifications} 
            onValueChange={setNotifications} 
            trackColor={{ false: '#d1d1d1', true: '#81b0ff' }}
            thumbColor={notifications ? '#1976d2' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Text style={styles.settingDescription}>Use dark theme throughout the app</Text>
          </View>
          <Switch 
            value={darkMode} 
            onValueChange={setDarkMode}
            trackColor={{ false: '#d1d1d1', true: '#81b0ff' }}
            thumbColor={darkMode ? '#1976d2' : '#f4f3f4'} 
          />
        </View>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Email Updates</Text>
            <Text style={styles.settingDescription}>Receive order updates via email</Text>
          </View>
          <Switch 
            value={emailUpdates} 
            onValueChange={setEmailUpdates}
            trackColor={{ false: '#d1d1d1', true: '#81b0ff' }}
            thumbColor={emailUpdates ? '#1976d2' : '#f4f3f4'} 
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.button}>
          <IconSvg name="person" size={18} color="#fff" style={{marginRight: 8}} />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <IconSvg name="lock" size={18} color="#fff" style={{marginRight: 8}} />
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.dangerButton]}>
          <Text style={styles.dangerButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>Order Viewer v1.0.0</Text>
        <Text style={styles.aboutText}>© 2025 All rights reserved</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  dangerButton: {
    backgroundColor: '#ffebee',
  },
  dangerButtonText: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: 'bold',
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

export const SettingsScreen = React.memo(Settings);
export default Settings;
