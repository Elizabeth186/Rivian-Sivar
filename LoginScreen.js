import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from './firebase'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const homenavigation = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })
    return homenavigation
  }, [])
  const SignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registro completo:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const Login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Ingresando :', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
      <View style={styles.View1}>
        <TextInput
          placeholder="Correo Electronico"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input1}
        /></View>
      <View style={styles.View2}>
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input2}
          secureTextEntry
        />
      </View>

      <View style={styles.Viewbtn1}>
        <TouchableOpacity
          onPress={Login}
          style={styles.button1}
        >
          <Text style={styles.buttonText1}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Viewbtn2}>
        <TouchableOpacity
          onPress={SignUp}
          style={[styles.button2]}>
          <Text style={styles.buttonText2}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  View1: {

  },
  View2: {

  },
  input1: {

  },
  input2: {

  },
  Viewbtn1: {

  },
  Viewbtn2: {

  },
  button1: {

  },
  button2: {

  },
  buttonText1: {

  },
  buttonText2: {

  }

})