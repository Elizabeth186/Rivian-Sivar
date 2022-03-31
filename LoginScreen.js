import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text,
   TextInput, TouchableOpacity, View, Image } from 'react-native'
import { SafeAreaView } from 'react-navigation'
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
        keyboardVerticalOffset={-100000}>
     <View
         style={styles.Viewimg}>        
       <Image style={styles.ImgPrincipal}
              source={require("./assets/LoginImg.png")  }/>
     </View>
       <View style={styles.viewEmpresa}>
          <Text style={styles.textRivian}>RIVIAN </Text>
          <Text style={styles.textSivar}>SIVAR</Text>
      </View>
          <Text style={styles.textBienvenida}>BIENVENIDO</Text>
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
          <Text style={styles.buttonText1}>Iniciar Sesion</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Viewbtn2}>
        <TouchableOpacity
          onPress={SignUp}
          style={[styles.button2]}>
          <Text style={styles.buttonText2}>Registrarme</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.Viewbtn3}>
        <TouchableOpacity
          onPress={()=>{}}
          style={[styles.button3]}>

            <Image style={styles.img}
            source={require("./assets/search.png")  }/>
          <Text  style={styles.buttonText3}>Google</Text>
        </TouchableOpacity>
      </View>
      
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '6%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    
  },
<<<<<<< HEAD
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
=======
 View1:{
width: 300,
height: 50,
marginBottom: 20
 },
 View2:{
  width: 300,
  height: 50,

 },
 input1:{
 borderColor: ('#307B8C'),
 borderWidth: 1.5,
textAlign: 'center',
height: 50,
borderRadius: 15,
fontSize: 15
 },
 input2:{
  borderColor: ('#307B8C'),
  borderWidth: 1.5,
 textAlign: 'center',
 height: 50,
 borderRadius: 15,
 fontSize: 15
 },
 Viewbtn1:{
marginTop: 40,
width:300
 },
 
 button1:{
backgroundColor: ('#0E4C59'),
width: 300,
height: 50,
borderRadius: 11,

 },
 button2:{
  backgroundColor: ('#ffffff'),
  width: 300,
  height: 50,
  borderRadius: 11,
  marginTop:20,
  borderColor:('#0E4C59'),
  borderWidth: 1,

 },
 buttonText1:{
textAlign: 'center',
padding:10,
color:'white',
fontSize: 17,
 },
 buttonText2:{
  textAlign: 'center',
  padding:10,
  color:('#0E4C59'),
  fontSize: 17,
  },
 Viewbtn3:{
   backgroundColor:'white',
   marginTop: 30,
   height:50,
   borderRadius: 15

 },
 buttonText3:{
  textAlign: 'center',
  padding:9,
  fontSize: 17,
  color:('#0E4C59'),
  width: 149,
  backgroundColor:'#ffffff',
  borderBottomRightRadius: 15,
  borderTopRightRadius: 15
  
 },
 button3:{
flexDirection:'row',
width:300,
backgroundColor: '#ffffff',
borderRadius: 11,
borderColor:'black',
borderWidth: 1,
height:50
 },
   img:{
marginTop: 7,
width:'11%',
height: 33,
marginLeft:40,
  },
  Viewimg:{
    width:'100%',
     height:'30%',
  },
  ImgPrincipal:{
    width:'100%',
     height:'100%'
  },
viewEmpresa:{
flexDirection:'row'
},
  textRivian:{
fontSize:30,

  },
  textSivar:{
fontSize: 22,
padding:8,

  },
  textBienvenida:{
    fontSize: 20,
    marginBottom: 25,
  
  }
 
>>>>>>> a667be7c6fd14d41896193bb2a579454f698958d

})