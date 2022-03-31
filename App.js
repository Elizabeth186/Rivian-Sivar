import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';



<<<<<<< HEAD

function Splash({ navigation }) {

  setTimeout(() => {
    navigation.navigate('Login')
  }, 3000);

  return (
    <View style={{ alignItems: 'center', height: '100%', backgroundColor: 'white' }}>
      <Image
        style={{ width: '100%', height: '100%', marginBottom: 15 }}
        source={require("./assets/Logo.png")} />
    </View>
  )
=======
function Splash({navigation}){

    setTimeout(()=>{
       navigation.navigate('Login')
            }, 3000);

return(
  <View style={{ alignItems:'center'}}>
      <Image  
       style={{ width:'100%', height: '100%', marginBottom: 15 }}
        source={require("./assets/Logo.png") }/>
  </View>
)
>>>>>>> a667be7c6fd14d41896193bb2a579454f698958d
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="splash"
          options={{ headerShown: false }}

          component={Splash} />
        <Stack.Screen name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} />
        <Stack.Screen name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});