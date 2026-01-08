import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentScreen, setCurrentScreen] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000000' : '#F2F2F7',
    flex: 1,
  };

  const handleLogin = () => {
    if (email && password) {
      setCurrentScreen('main');
    }
  };

  const handleLogout = () => {
    setEmail('');
    setPassword('');
    setCurrentScreen('login');
  };

  if (currentScreen === 'login') {
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.loginContainer}>
            <Text style={[styles.logo, { color: isDarkMode ? '#FFF' : '#000' }]}>
              IKYKIK
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: isDarkMode ? '#888' : '#666' },
              ]}>
              Task Management App
            </Text>

            <View style={styles.formContainer}>
              <Text
                style={[styles.label, { color: isDarkMode ? '#FFF' : '#000' }]}>
                Email
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF',
                    color: isDarkMode ? '#FFF' : '#000',
                  },
                ]}
                placeholder="Enter your email"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text
                style={[styles.label, { color: isDarkMode ? '#FFF' : '#000' }]}>
                Password
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF',
                    color: isDarkMode ? '#FFF' : '#000',
                  },
                ]}
                placeholder="Enter your password"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <Text
                style={[
                  styles.signupText,
                  { color: isDarkMode ? '#888' : '#666' },
                ]}>
                Don't have an account? Sign Up (Coming Soon)
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tab,
            currentScreen === 'main' && styles.activeTab,
          ]}
          onPress={() => setCurrentScreen('main')}>
          <Text style={styles.tabText}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            currentScreen === 'analytics' && styles.activeTab,
          ]}
          onPress={() => setCurrentScreen('analytics')}>
          <Text style={styles.tabText}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            currentScreen === 'rewards' && styles.activeTab,
          ]}
          onPress={() => setCurrentScreen('rewards')}>
          <Text style={styles.tabText}>Rewards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            currentScreen === 'profile' && styles.activeTab,
          ]}
          onPress={() => setCurrentScreen('profile')}>
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.content}>
          {currentScreen === 'main' && (
            <View>
              <Text
                style={[
                  styles.screenTitle,
                  { color: isDarkMode ? '#FFF' : '#000' },
                ]}>
                My Tasks
              </Text>
              <View
                style={[
                  styles.card,
                  { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF' },
                ]}>
                <Text
                  style={[
                    styles.cardTitle,
                    { color: isDarkMode ? '#FFF' : '#000' },
                  ]}>
                  Complete IKYKIK Assignment
                </Text>
                <Text
                  style={[
                    styles.cardDesc,
                    { color: isDarkMode ? '#888' : '#666' },
                  ]}>
                  Build the full task management app
                </Text>
                <View style={[styles.badge, { backgroundColor: '#FF3B30' }]}>
                  <Text style={styles.badgeText}>HIGH PRIORITY</Text>
                </View>
              </View>

              <View
                style={[
                  styles.card,
                  { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF' },
                ]}>
                <Text
                  style={[
                    styles.cardTitle,
                    { color: isDarkMode ? '#FFF' : '#000' },
                  ]}>
                  Setup Backend Services
                </Text>
                <Text
                  style={[
                    styles.cardDesc,
                    { color: isDarkMode ? '#888' : '#666' },
                  ]}>
                  Configure all 6 microservices
                </Text>
                <View style={[styles.badge, { backgroundColor: '#FF9500' }]}>
                  <Text style={styles.badgeText}>MEDIUM PRIORITY</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add New Task</Text>
              </TouchableOpacity>
            </View>
          )}

          {currentScreen === 'analytics' && (
            <View>
              <Text
                style={[
                  styles.screenTitle,
                  { color: isDarkMode ? '#FFF' : '#000' },
                ]}>
                Analytics
              </Text>
              <View
                style={[
                  styles.card,
                  { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF' },
                ]}>
                <Text
                  style={[
                    styles.metricLabel,
                    { color: isDarkMode ? '#888' : '#666' },
                  ]}>
                  Completion Rate
                </Text>
                <Text style={[styles.metricValue, { color: '#34C759' }]}>
                  75%
                </Text>
              </View>
              <View
                style={[
                  styles.card,
                  { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF' },
                ]}>
                <Text
                  style={[
                    styles.metricLabel,
                    { color: isDarkMode ? '#888' : '#666' },
                  ]}>
                  Productivity Score
                </Text>
                <Text style={[styles.metricValue, { color: '#007AFF' }]}>
                  85/100
                </Text>
              </View>
            </View>
          )}

          {currentScreen === 'rewards' && (
            <View>
              <Text
                style={[
                  styles.screenTitle,
                  { color: isDarkMode ? '#FFF' : '#000' },
                ]}>
                Rewards
              </Text>
              <View
                style={[
                  styles.card,
                  { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF' },
                ]}>
                <Text
                  style={[
                    styles.cardTitle,
                    { color: isDarkMode ? '#FFF' : '#000' },
                  ]}>
                  📱 Instagram
                </Text>
                <Text
                  style={[
                    styles.cardDesc,
                    { color: isDarkMode ? '#888' : '#666' },
                  ]}>
                  15 / 30 minutes remaining
                </Text>
                <View style={[styles.badge, { backgroundColor: '#34C759' }]}>
                  <Text style={styles.badgeText}>✓ UNLOCKED</Text>
                </View>
              </View>
              <View
                style={[
                  styles.card,
                  { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF' },
                ]}>
                <Text
                  style={[
                    styles.cardTitle,
                    { color: isDarkMode ? '#FFF' : '#000' },
                  ]}>
                  🎮 COD Mobile
                </Text>
                <Text
                  style={[
                    styles.cardDesc,
                    { color: isDarkMode ? '#888' : '#666' },
                  ]}>
                  0 / 30 minutes remaining
                </Text>
                <View style={[styles.badge, { backgroundColor: '#FF3B30' }]}>
                  <Text style={styles.badgeText}>🔒 LOCKED</Text>
                </View>
              </View>
            </View>
          )}

          {currentScreen === 'profile' && (
            <View>
              <Text
                style={[
                  styles.screenTitle,
                  { color: isDarkMode ? '#FFF' : '#000' },
                ]}>
                Profile
              </Text>
              <View
                style={[
                  styles.card,
                  { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF' },
                ]}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>Y</Text>
                </View>
                <Text
                  style={[
                    styles.profileName,
                    { color: isDarkMode ? '#FFF' : '#000' },
                  ]}>
                  Yadhu Gowda
                </Text>
                <Text
                  style={[
                    styles.profileEmail,
                    { color: isDarkMode ? '#888' : '#666' },
                  ]}>
                  {email || 'user@example.com'}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.logoutButton, { backgroundColor: '#FF3B30' }]}
                onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    padding: 24,
    paddingTop: 80,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 60,
  },
  formContainer: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signupText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(128,128,128,0.1)',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 24,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  metricLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    textAlign: 'center',
  },
  logoutButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
