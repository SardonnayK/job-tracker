import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PageLayout from '../components/PageLayout';
import { Job } from '../services/JobService';

interface DetailsScreenProps {
  title: string;
  onBack: () => void;
  job?: Job;
}

export default function DetailsScreen({ title, onBack, job }: DetailsScreenProps) {
  if (!job) {
    return (
      <PageLayout title={title} onBack={onBack}>
        <Text style={{ textAlign: 'center', marginTop: 32 }}>No job selected.</Text>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={title} onBack={onBack}>
      {/* Job Details Card */}
      <View style={styles.card}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={styles.cardTitle}>Job Details</Text>
            <Text style={styles.subheading}>Title:</Text>
            <Text style={styles.itemText}>{job.title}</Text>
            <Text style={styles.subheading}>Description:</Text>
            <Text style={styles.itemText}>{job.description}</Text>
            {job.location && (
              <>
                <Text style={styles.subheading}>Location:</Text>
                <Text style={styles.itemText}>{job.location}</Text>
              </>
            )}
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <Image
              source={{
                uri: `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=job-${job.id}`,
              }}
              style={{ width: 120, height: 120, marginBottom: 8 }}
              accessibilityLabel="QR code for this job"
            />
            <Text style={{ color: '#1976d2', fontSize: 13, textAlign: 'center' }}>
              Scan to open this job
            </Text>
          </View>
        </View>
      </View>

      {/* Approvals Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Approvals</Text>
        {job.approvals.map((a, idx) => (
          <View key={idx} style={styles.approvalRow}>
            <Text style={styles.itemText}>{a.name}</Text>
            <Text style={[styles.itemText, { color: a.approved ? '#388e3c' : '#d32f2f' }]}>
              {a.approved ? 'Approved' : 'Pending'}
            </Text>
          </View>
        ))}
      </View>

      {/* Events/Actions Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Events / Actions</Text>
        {job.events.length === 0 ? (
          <Text style={styles.itemText}>No events yet.</Text>
        ) : (
          job.events.map((e, idx) => (
            <View key={idx} style={styles.eventRow}>
              <Text style={styles.eventTimestamp}>{e.timestamp}</Text>
              <Text style={styles.eventDescription}>{e.description}</Text>
            </View>
          ))
        )}
      </View>

      {/* Workers Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Workers</Text>
        {job.workers.length === 0 ? (
          <Text style={styles.itemText}>No workers clocked in.</Text>
        ) : (
          job.workers.map((m, idx) => (
            <View key={idx} style={styles.workerRow}>
              <Text style={styles.workerName}>{m.name}</Text>
              <Text style={styles.workerTime}>In: {m.clockIn}</Text>
              <Text style={styles.workerTime}>Out: {m.clockOut ? m.clockOut : '-'}</Text>
            </View>
          ))
        )}
      </View>

      {/* Documents Card (moved to last) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Documents</Text>
        <Text style={styles.subheading}>SOPs:</Text>
        {job.sops.map((sop, idx) => (
          <Text key={idx} style={styles.itemText}>
            • {sop}
          </Text>
        ))}
        <View style={styles.divider} />
        <Text style={styles.subheading}>Risk Assessments:</Text>
        {job.riskAssessments.map((risk, idx) => (
          <Text key={idx} style={styles.itemText}>
            • {risk}
          </Text>
        ))}
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20, // Increased for more breathing room
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  subheading: {
    fontWeight: 'bold',
    color: '#1976d2',
    fontSize: 15,
    marginTop: 14,
    marginBottom: 6,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
    color: '#1976d2',
  },
  itemText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    marginTop: 0,
  },
  approvalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 0,
  },
  workerRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 0,
    marginTop: 0,
  },
  workerName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
    marginTop: 0,
  },
  workerTime: {
    fontSize: 14,
    color: '#444',
    marginBottom: 1,
    marginTop: 0,
  },
  eventRow: {
    marginBottom: 16,
    paddingBottom: 0,
    marginTop: 0,
  },
  eventTimestamp: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1976d2',
    marginBottom: 2,
    marginTop: 0,
  },
  eventDescription: {
    fontSize: 15,
    color: '#333',
    marginBottom: 2,
    marginTop: 0,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    alignSelf: 'stretch',
    marginVertical: 12,
  },
});
