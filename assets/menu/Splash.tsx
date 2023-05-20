import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import logoipb from '../image/logoipb.png';
import logorh from "../image/logorh.png";

const { height, width } = Dimensions.get('window')

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Screen');
    }, 3000);
  })
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={{ alignItems: 'center', marginTop: 112 }}>
        <Text style={styles.judul}>HyGrow</Text>
        <Image source={logorh} style={styles.logo1} />
      </View>
      <View style={{ alignItems: 'center', marginTop: 116 }}>
        <Text style={styles.text}>In Association:</Text>
        <Image source={logoipb} style={styles.logo2} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  judul: { fontSize: 20, fontWeight: 'bold', fontFamily: 'Poppins-SemiBold' },
  text: { fontSize: 12, fontFamily: 'Poppins-SemiBold' },
  logo1: { width: 162, height: 108, marginTop: 179 },
  logo2: { width: 129, height: 33, marginTop: 20 }
})

export default Splash;