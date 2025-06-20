import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../assets/globalStyles';
import JobList from '../components/JobList';
import { Job } from '../services/JobService';
import { Ionicons } from '@expo/vector-icons';

export type HomeNavigationTarget =
  | 'Home'
  | 'Add'
  | 'Settings'
  | 'QR'
  | { type: 'Details'; job: Job };

export default function HomeLayout({
  onNavigate,
}: {
  onNavigate: (screen: HomeNavigationTarget) => void;
}) {
  return (
    <View style={styles.background}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Base Layout For the Application</Text>
        <View style={styles.profileCircle}>
          <Text style={styles.profileText}>SK</Text>
        </View>
      </View>
      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.contentScroll} style={styles.content}>
        <JobList onSelectJob={(job) => onNavigate({ type: 'Details', job })} />
      </ScrollView>
      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => onNavigate('Home')}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab} onPress={() => onNavigate('QR')}>
          <Ionicons name="qr-code-outline" size={28} color="#111827" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => onNavigate('Settings')}>
          <Text>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
    borderBottomWidth: 1.5,
    borderColor: '#e0e0e0',
  },
  menuButton: {
    width: 36, // Slightly smaller
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 24, // Slightly smaller
    fontWeight: 'bold',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 14, // Decreased
    flex: 1,
    textAlign: 'center',
  },
  profileCircle: {
    width: 36, // Slightly smaller
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileText: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: '#f2f6fc', // Soft background for content
    padding: 0,
  },
  contentScroll: {
    padding: 5,
    flexGrow: 1,
  },
  footer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1.5,
    borderColor: '#e0e0e0',
    paddingHorizontal: 32,
    paddingVertical: 18,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: -28,
    zIndex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  qrIcon: {
    fontSize: 28,
    fontWeight: 'bold',
    // You can replace this with a QR code icon from an icon library if available
  },
});
