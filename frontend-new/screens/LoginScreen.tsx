import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard } from 'react-native';
import { globalStyles } from '../assets/globalStyles';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Allow any credentials for now
    onLogin();
  };

  const handlePasswordSubmit = () => {
    Keyboard.dismiss();
    handleLogin();
  };

  return (
    <View style={globalStyles.softBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In and Register Page</Text>
        <View style={styles.box}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            returnKeyType="next"
            onSubmitEditing={() => {
              // Focus password input if needed
            }}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handlePasswordSubmit}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    margin: 0,
    width: '100%',
    alignSelf: 'stretch',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 24,
    marginTop: 24,
  },
  box: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 18,
    padding: 24,
    width: 250,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    backgroundColor: '#f8fafc',
  },
});
