import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeLayout, { HomeNavigationTarget } from './screens/HomeLayout';
import DetailsScreen from './screens/DetailsScreen';
import QRScannerScreen from './screens/QRScannerScreen';
import { Job } from './services/JobService';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState<'Home' | 'Details' | 'QR'>('Home');
  const [detailsTitle, setDetailsTitle] = useState('Job Details');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Hydrate selectedJob from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('selectedJob');
    if (stored) {
      try {
        setSelectedJob(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // Save selectedJob to localStorage when it changes
  useEffect(() => {
    if (selectedJob) {
      localStorage.setItem('selectedJob', JSON.stringify(selectedJob));
    } else {
      localStorage.removeItem('selectedJob');
    }
  }, [selectedJob]);

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  if (screen === 'QR') {
    return <QRScannerScreen onBack={() => setScreen('Home')} />;
  }

  if (screen === 'Details' && selectedJob) {
    return (
      <DetailsScreen title={selectedJob.title} onBack={() => setScreen('Home')} job={selectedJob} />
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
