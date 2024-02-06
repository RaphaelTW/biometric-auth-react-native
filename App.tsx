import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { styles } from './styles.ts';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function verifyAvaiableAuthentication(){
    const compatible = await LocalAuthentication.hasHardwareAsync();
    console.log(compatible);

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(types.map(type => LocalAuthentication.AuthenticationType[type]));
  }

  async function handleAuthentication(){
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    console.log(isBiometricEnrolled);

    if(!isBiometricEnrolled){
      return Alert.alert('Alerta', 'Nenhuma biometria encontrada. Cadastre no dispositivo!');
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
      fallbackLabel: 'Biometria não reconhecia'
    });

    setIsAuthenticated(auth.success);

  }

  useEffect(() => {
    verifyAvaiableAuthentication();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Usuário conectado: { isAuthenticated ? 'Sim' : 'Não' }</Text>

      <Button title="Entrar" onPress={handleAuthentication}/>
    </View>
  );
}
