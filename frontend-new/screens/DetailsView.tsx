import React from 'react';
import PageLayout from '../components/PageLayout';

interface DetailsViewProps {
  title: string;
  onBack: () => void;
  children?: React.ReactNode;
}

export default function DetailsView({ title, onBack, children }: DetailsViewProps) {
  return (
    <PageLayout title={title} onBack={onBack}>
      {children}
    </PageLayout>
  );
}
