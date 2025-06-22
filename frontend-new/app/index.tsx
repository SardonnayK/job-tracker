import LoginScreen from '../screens/LoginScreen';

export default function Login() {
  // Expo Router automatically provides navigation props
  return (
    <LoginScreen
      onLogin={() => {
        /* handle login navigation */
      }}
    />
  );
}
