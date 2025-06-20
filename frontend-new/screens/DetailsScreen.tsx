import React from 'react';
import PageLayout from '../components/PageLayout';

interface DetailsScreenProps {
  title: string;
  onBack: () => void;
  children?: React.ReactNode;
}

export default function DetailsScreen({ title, onBack, children }: DetailsScreenProps) {
  return (
    <PageLayout title={title} onBack={onBack}>
      {children}
    </PageLayout>
  );
}
