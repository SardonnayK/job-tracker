import DetailsScreen from '../../screens/DetailsScreen';
import { useLocalSearchParams } from 'expo-router';
import { JobService } from '../../services/JobService';

export default function JobDetails() {
  const { jobId } = useLocalSearchParams();
  const job = JobService.getJobById(jobId as string);
  return <DetailsScreen title={job?.title || 'Job Details'} onBack={() => {}} job={job} />;
}
