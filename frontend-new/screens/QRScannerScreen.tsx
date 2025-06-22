import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PageLayout from '../components/PageLayout';

export default function QRScannerScreen({ onBack }: { onBack?: () => void }) {
  const [manualId, setManualId] = useState('');

  return (
    <PageLayout
      title="QR Code Scanner"
      onBack={onBack || (() => {})}
      contentStyle={{ alignItems: 'center' }}
    >
      <Text style={styles.title}>Scan a job QR code to view details and clock in/out</Text>
      <View style={styles.qrBox}>
        <Ionicons name="qr-code-outline" size={64} color="#bdbdbd" />
        <Text style={styles.qrHint}>Position QR code in camera view</Text>
        <TouchableOpacity style={styles.simulateButton}>
          <Ionicons name="qr-code-outline" size={20} color="#1976d2" />
          <Text style={styles.simulateButtonText}>Simulate Scan</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.manualBox}>
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.orText}>or enter manually</Text>
          <View style={styles.divider} />
        </View>
        <Text style={styles.inputLabel}>Job ID or QR Code Data</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter job ID (e.g., job-001)"
            value={manualId}
            onChangeText={setManualId}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.availableIds}>
          Available job IDs for testing:{'\n'}job-001, job-002, job-003, job-004, job-005
        </Text>
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 16,
    textAlign: 'center',
  },
  qrBox: {
    borderWidth: 2,
    borderColor: '#bdbdbd',
    borderStyle: 'dashed',
    borderRadius: 12,
    width: 300,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  qrHint: {
    color: '#888',
    marginTop: 8,
    marginBottom: 12,
  },
  simulateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3eafc',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  simulateButtonText: {
    color: '#1976d2',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  manualBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    width: 320,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  orText: {
    marginHorizontal: 8,
    color: '#888',
    fontSize: 12,
  },
  inputLabel: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#f8fafc',
  },
  searchButton: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
  },
  availableIds: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
});
