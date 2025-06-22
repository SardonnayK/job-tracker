import DetailsScreen from '../../screens/DetailsScreen';
import { useLocalSearchParams } from 'expo-router';

export default function UserDetails() {
  const { userId } = useLocalSearchParams();
  // TODO: Fetch user details by userId
  return <DetailsScreen title={`User ${userId}`} onBack={() => {}} job={undefined} />;
}
