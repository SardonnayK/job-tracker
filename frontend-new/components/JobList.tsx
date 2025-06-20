import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { JobService, JobStatus, Job } from '../services/JobService';

const statusOptions: JobStatus[] = ['Pending', 'Approved', 'In Progress', 'Completed'];

export default function JobList({ onSelectJob }: { onSelectJob: (job: Job) => void }) {
  const [selectedStatus, setSelectedStatus] = useState<JobStatus | undefined>(undefined);
  const jobs = JobService.getJobs(selectedStatus);
  const { width } = useWindowDimensions();
  const isWide = width > 700;

  return (
    <View style={styles.wrapper}>
      {/* Create New Job Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Create New Job</Text>
        <Text style={styles.sectionDesc}>Add a new job to the system.</Text>
        <Text style={styles.inputLabel}>Job Title</Text>
        <TextInput style={styles.input} placeholder="Enter job title" />
        <Text style={styles.inputLabel}>Job Location</Text>
        <TextInput style={styles.input} placeholder="Enter job location" />
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>+ Create Job</Text>
        </TouchableOpacity>
      </View>
      {/* Current Jobs Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Current Jobs</Text>
        <Text style={styles.sectionDesc}>View and manage existing jobs.</Text>
        {/* Filter Bar */}
        <View style={styles.filterBar}>
          <Text style={styles.filterLabel}>Filter by status:</Text>
          {statusOptions.map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterButton,
                selectedStatus === status && styles.filterButtonSelected,
              ]}
              onPress={() => setSelectedStatus(selectedStatus === status ? undefined : status)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedStatus === status && styles.filterButtonTextSelected,
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          numColumns={isWide ? 2 : 1}
          columnWrapperStyle={isWide ? { gap: 12 } : undefined}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.jobCard, isWide && { flex: 1, minWidth: 0 }]}
              onPress={() => onSelectJob(item)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.jobTitle}>{item.title}</Text>
                  <Text style={styles.jobLocation}>Location: Example Location</Text>
                </View>
                <View style={styles.jobStatusIcon}>
                  <Text style={{ color: '#1976d2', fontWeight: 'bold' }}>{item.status}</Text>
                </View>
              </View>
              <Text style={styles.jobDesc}>{item.description}</Text>
              <View style={styles.jobMetaRow}>
                <View style={styles.jobMetaItem}>
                  <Text style={styles.jobMetaIcon}>👤</Text>
                  <Text style={styles.jobMetaText}>{item.approvals.length}</Text>
                </View>
                <View style={styles.jobMetaItem}>
                  <Text style={styles.jobMetaIcon}>✅</Text>
                  <Text style={styles.jobMetaText}>
                    {item.approvals.filter((a) => a.approved).length}/{item.approvals.length}
                  </Text>
                </View>
                <TouchableOpacity style={styles.detailsButton} onPress={() => onSelectJob(item)}>
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 32 }}>No jobs found.</Text>
          }
          contentContainerStyle={{ paddingBottom: 16 }}
          removeClippedSubviews={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 8,
    backgroundColor: 'transparent',
    minWidth: 450,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 450,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
  },
  sectionDesc: {
    color: '#555',
    marginBottom: 12,
  },
  inputLabel: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#f8fafc',
  },
  createButton: {
    backgroundColor: '#111827',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  filterLabel: {
    marginRight: 8,
    fontWeight: 'bold',
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 2,
  },
  filterButtonSelected: {
    backgroundColor: '#1976d2',
  },
  filterButtonText: {
    color: '#333',
  },
  filterButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  jobCard: {
    backgroundColor: '#f8fafc', // Add contrast to job card
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1, // Slightly stronger shadow
    shadowRadius: 6,
    elevation: 3,
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Subtle border for contrast
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  jobLocation: {
    color: '#888',
    fontSize: 13,
    marginBottom: 2,
  },
  jobStatusIcon: {
    marginLeft: 8,
    alignItems: 'flex-end',
  },
  jobDesc: {
    color: '#555',
    marginTop: 4,
    marginBottom: 8,
  },
  jobMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  jobMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  jobMetaIcon: {
    fontSize: 16,
    marginRight: 2,
  },
  jobMetaText: {
    fontSize: 14,
    color: '#333',
  },
  detailsButton: {
    marginLeft: 'auto',
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  detailsButtonText: {
    color: '#111827',
    fontWeight: 'bold',
  },
});
