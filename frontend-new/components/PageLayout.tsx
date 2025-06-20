import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ViewStyle } from 'react-native';

interface PageLayoutProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
  contentStyle?: ViewStyle;
}

export default function PageLayout({ title, onBack, children, contentStyle }: PageLayoutProps) {
  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backArrow}>{'←'}</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={[styles.contentScroll, contentStyle]}
        style={styles.content}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderColor: '#e0e0e0',
    paddingTop: 16,
    paddingBottom: 6,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  backArrow: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitleWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#f2f6fc',
    padding: 0,
  },
  contentScroll: {
    padding: 5,
    flexGrow: 1,
    paddingBottom: 50, // Add 50px padding to the bottom
  },
});
