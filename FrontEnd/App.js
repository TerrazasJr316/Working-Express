import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import LoginScreen from './src/pages/auth/Login';
import RegisterScreen from './src/pages/auth/Register';
import ForgotPasswordScreen from './src/pages/auth/ForgotPassword';
import VerifyIdentityScreen from './src/pages/auth/VerifyIdentity';
import ResetPasswordScreen from './src/pages/auth/ResetPassword';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  // Agregamos 'method' a la memoria
  const [tempData, setTempData] = useState({ email: '', code: '', flow: '', method: 'email' });

  return (
    <SafeAreaView style={styles.container}>

      {currentScreen === 'login' && (
        <LoginScreen
          onNavigateToRegister={() => setCurrentScreen('register')}
          onNavigateToForgot={() => setCurrentScreen('forgot')}
        />
      )}

      {currentScreen === 'register' && (
        <RegisterScreen
          onNavigateToLogin={() => setCurrentScreen('login')}
          onNavigateToVerify={(email, method) => {
            setTempData({ email, code: '', flow: 'register', method });
            setCurrentScreen('verify');
          }}
        />
      )}

      {currentScreen === 'forgot' && (
        <ForgotPasswordScreen
          onNavigateToVerify={(email, method) => {
            setTempData({ email, code: '', flow: 'forgot', method });
            setCurrentScreen('verify');
          }}
          onNavigateToLogin={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'verify' && (
        <VerifyIdentityScreen
          email={tempData.email}
          flow={tempData.flow}
          method={tempData.method} // Pasamos el método para cambiar el texto visual
          onNavigateToReset={(code) => {
            setTempData({ ...tempData, code });
            setCurrentScreen('reset');
          }}
          onNavigateToLogin={() => setCurrentScreen('login')}
          onNavigateToForgot={() => setCurrentScreen('forgot')}
        />
      )}

      {currentScreen === 'reset' && (
        <ResetPasswordScreen
          recoveryData={tempData}
          onNavigateToLogin={() => setCurrentScreen('login')}
        />
      )}

      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F8FAFC' } });