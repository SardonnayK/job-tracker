import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeLayout, { HomeNavigationTarget } from './screens/HomeLayout';
import DetailsView from './screens/DetailsView';
import QRScannerScreen from './screens/QRScannerScreen';
import { Job } from './services/JobService';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState<'Home' | 'Details' | 'QR'>('Home');
  const [detailsTitle, setDetailsTitle] = useState('Job Details');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  if (screen === 'QR') {
    return <QRScannerScreen onBack={() => setScreen('Home')} />;
  }

  if (screen === 'Details' && selectedJob) {
    return (
      <DetailsView title={selectedJob.title} onBack={() => setScreen('Home')}>
        {/* Details content goes here */}
      </DetailsView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <HomeLayout
        onNavigate={(target: HomeNavigationTarget) => {
          if (target === 'Add') {
            setDetailsTitle('Job Details');
            setScreen('Details');
          } else if (target === 'QR') {
            setScreen('QR');
          } else if (typeof target === 'object' && target.type === 'Details' && target.job) {
            setSelectedJob(target.job);
            setScreen('Details');
          }
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
