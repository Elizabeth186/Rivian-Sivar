import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet,
  Image, Dimensions, Animated, StatusBar, ScrollView, Linking
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { auth } from './firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from "expo-linear-gradient";
import { Constants } from 'expo';

// arrglo de imagenes
const imagenes = [

  "https://scontent.fsal3-1.fna.fbcdn.net/v/t39.30808-6/277727331_101439585870733_848852093796842867_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=WzL706-b4rUAX88y4iv&_nc_ht=scontent.fsal3-1.fna&oh=00_AT9dgzv-XRwKpmVVvRL6RX3vJke7z1eDu1svSfqk88DZCA&oe=624A8A55",
  "https://scontent.fsal2-1.fna.fbcdn.net/v/t39.30808-6/277761523_101439602537398_4040562502174153354_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=730e14&_nc_ohc=UjcQdVOxXu8AX8SCSUT&_nc_ht=scontent.fsal2-1.fna&oh=00_AT8fy4jPiNy2Bm2msVWUZLkwzMUTh7A-7zUnBbEITuTL8A&oe=624A73B6",
  "https://scontent.fsal2-1.fna.fbcdn.net/v/t39.30808-6/277764841_101439565870735_8606014096617798462_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=uG5iKverWsMAX-T2CTC&_nc_ht=scontent.fsal2-1.fna&oh=00_AT_rsFKSRBZz4EmhlPsbsU119RO_HXSKKAjWIRRqoik7QA&oe=624AF62E",
  "https://scontent.fsal2-1.fna.fbcdn.net/v/t39.30808-6/276139425_101439625870729_396991921636436698_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=730e14&_nc_ohc=haT40vRH314AX8cGNWo&_nc_ht=scontent.fsal2-1.fna&oh=00_AT_8YVSDYgvCiqhq32YVerXUpEgD92mnlhvvUKbORBFB0g&oe=624B7034",
];
// colocando dimensiones
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
// declarando caracteristicas del contenedor de imagen
const ancho_del_contenedor = width * 0.7;
// indicando las imagenes visibles en la pantalla
const espacio_contenedores = (width - ancho_del_contenedor) / 2;
const espacio = 4;
const altura_imagen_fondo = height;
// funcion para funcionamiento de carrusel
function CrearCarrusel({ scrollX }) {
  return (
    <View
      style={[
        {
          position: "absolute",
          height: altura_imagen_fondo,
          top: 0,
          width: width,
        },
        StyleSheet.absoluteFillObject,
      ]}
    >
      {imagenes.map((imagen, index) => {
        const inputRange = [
          (index - 1) * ancho_del_contenedor,
          index * ancho_del_contenedor,
          (index + 1) * ancho_del_contenedor,
        ];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });
        return (
          <Animated.Image
            key={index}
            source={{ uri: imagen }}
            style={[
              { width: width, height: altura_imagen_fondo, opacity },
              StyleSheet.absoluteFillObject,
            ]}
          />
        );
      })}
      {/* colocando efecto gradiente */}
      <LinearGradient
        colors={["transparent", "white"]}
        style={{
          width,
          height: altura_imagen_fondo,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
}

export default function HomeScreen() {
  const scrollX = React.useRef(new Animated.Value(2)).current;
  const navigation = useNavigation()

  const SignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%", height: '100%' }}>
        <StatusBar hidden />
        <CrearCarrusel scrollX={scrollX} />
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          // indicando salida del carrusel
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{
            paddingTop: 100,
            paddingHorizontal: espacio_contenedores,
          }}
          snapToInterval={ancho_del_contenedor}
          decelerationRate={0}
          data={imagenes}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * ancho_del_contenedor,
              index * ancho_del_contenedor,
              (index + 1) * ancho_del_contenedor,
            ];
            // Altura de la animacon
            const scrollY = scrollX.interpolate({
              inputRange,
              outputRange: [0, -20, 0],
            });
            return (
              <View style={{ width: ancho_del_contenedor }}>
                <Animated.View
                  style={{
                    marginHorizontal: espacio,
                    padding: espacio,
                    borderRadius: 30,
                    backgroundColor: "'#0E4C59",
                    alignItems: "center",
                    transform: [{ translateY: scrollY }],
                  }}
                >
                  <Image source={{ uri: item }} style={styles.posterImage} />
                </Animated.View>
              </View>
            );
          }}
        />

        <View style={styles.Recargar}>
          <Text style={styles.textsuperior}>¿NO SABES DONDE</Text>
          <Text style={styles.textinferior}>RECARGAR TU AUTO ELECTRICO?</Text>
        </View>
        <View style={styles.viewrecargas}>
          <Text style={styles.textDepartamento}>Santa Tecla, San Salvador</Text>
        </View>
        <View style={styles.santatecla}>
          <TouchableOpacity style={styles.santatecla1} onPress={() => { Linking.openURL('https://goo.gl/maps/ckdPmkBWTBuDDLiz7') }}>
            <Text style={styles.txtsantatecla1}>Texaco La Skina</Text>
            <Image style={styles.images}
              source={require("./assets/station.png")} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.santatecla1} onPress={() => { Linking.openURL('https://g.page/PlazaMalta?share') }}>
            <Text style={styles.txtsantatecla2} >Comercial Plaza Malta</Text>
            <Image style={styles.images}
              source={require("./assets/electrics.png")} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewrecargas2}>
          <Text style={styles.textDepartamento}>Santa Ana, San Salvador</Text>
        </View>
        <View style={styles.santana} >
          <TouchableOpacity style={styles.santaana1} onPress={() => { Linking.openURL('https://goo.gl/maps/GqVcDwjwJspEX3H1A') }}>
            <Text style={styles.txtCasaverde}>Hotel Casa Verde</Text>
            <Image style={styles.images}
              source={require("./assets/electrics.png")} />
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.btn}
            onPress={SignOut}>
            <Text>Cerrar Sesion</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  Recargar: {
    borderColor: '#0E4C59',
    borderWidth: 3,
    height: '8%',
    width: '90%',
    marginTop: '10%',
    marginLeft: '5%',
    alignItems: 'center',
    borderRadius: 12
  },
  textsuperior: {
    fontSize: 30,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#0E4C59',
    width: '100%',
    color: '#ffffff',
    textAlign: 'center'
  },
  textinferior: {
    fontSize: 16,
    color: '#307B8C',
    fontSize: 20,
    fontWeight: 'bold'
  },
  posterImage: {
    width: "100%",
    height: ancho_del_contenedor * 1.2,
    resizeMode: "cover",
    borderRadius: 20,
    marginBottom: '60%'

  },
  viewrecargas: {
    alignItems: 'center',
    borderColor: '#307B8C',
    borderWidth: 0.5,
    marginTop: '5%',
    marginBottom: '5%',
    width: '97%',
    backgroundColor: '#307B8C',
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    elevation: 2
  },
  viewrecargas2: {
    marginLeft: '3%',
    borderColor: '#307B8C',
    borderWidth: 0.5,
    marginTop: '5%',
    marginBottom: '5%',
    width: '97%',
    backgroundColor: '#307B8C',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    elevation: 2
  },
  santaana1: {
    backgroundColor: '#8EBF24',
    width: '40%',
    height: '100%',
    borderColor: '#0E4C59',
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 20
  },
  santana: {
    width: "100%",
    alignItems: 'center',
    marginTop: "5%",
    height: '15%'
  },
  txtCasaverde: {
    marginTop: '5%',
    marginRight: '3%',
    textAlign: 'center',
    color: '#0E4C59',
    fontSize: 20
  },
  images: {
    padding: 12,
    height: '50%',
    width: '50%',
    marginTop: '10%',
  },
  santatecla: {
    height: '15%',
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',

  },
  santatecla1: {
    alignItems: 'center',
    backgroundColor: '#8EBF24',
    width: '40%',
    height: '100%',
    borderColor: '#0E4C59',
    borderWidth: 2,
    borderRadius: 15,
    marginLeft: '6%',
    elevation: 20
  },
  txtsantatecla1: {
    marginTop: '5%',
    marginRight: '6%',
    textAlign: 'center',
    color: '#0E4C59',
    fontSize: 20
  },
  txtsantatecla2: {
    marginTop: '5%',
    marginRight: '6%',
    color: '#0E4C59',
    fontSize: 20,
    textAlign: 'center'

  },
  textDepartamento: {
    fontSize: 30,
    color: '#ffffff',
    textAlign: 'center'
  }



})


