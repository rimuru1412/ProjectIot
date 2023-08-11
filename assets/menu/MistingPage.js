import React, { Component } from "react";
import { ImageBackground, View, Image, StyleSheet, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import background from '../image/bgair.png'
import header from '../image/headermisting.png'
import abmix from '../image/abmix.png'
import Graph from "./GraphMisting";
import { db } from "./firebase"

let dataRef = db.ref("/Button/misting");
let suhuudara = db.ref("/DHT/Suhu");
let Kelembapan = db.ref("/DHT/Kelembapan")
let suhuair = db.ref("/DS18B20/SuhuAir");


class KangkungPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonValue: 0,
            SuhuUdara: ' ',
            Kelembapan: ' ',
            SuhuAir: ' '
        }
    }

    componentDidMount() {
        suhuudara.on('value', (snapshot) => {
            const SuhuUdara = snapshot.val();
            this.setState({ SuhuUdara });
        })

        Kelembapan.on('value', (snapshot) => {
            const Kelembapan = snapshot.val();
            this.setState({ Kelembapan });
        })

        suhuair.on('value', (snapshot) => {
            const SuhuAir = snapshot.val();
            this.setState({ SuhuAir });
        })

        dataRef.on('value', (snapshot) => {
            const buttonValue = snapshot.val();
            this.setState({ buttonValue });
        })

    }

    onPressButton = () => {
        const newButtonValue = this.state.buttonValue === 0 ? 1 : 0;
        dataRef.set(newButtonValue);

        {
            this.state.buttonValue === 0 && (
                Alert.alert(
                    'Pompa Misting Menyala',
                    'Ketuk sekali lagi untuk mematikan pompa misting',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                )
            )
        }
        {
            this.state.buttonValue === 1 && (
                Alert.alert(
                    'Pompa Misting Mati',
                    'Ketuk sekali lagi untuk menyalakan pompa misting',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                )
            )
        }
    }


    render() {
        return (
            <View>
                <ImageBackground source={background} style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height }}>
                    <View>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={header} style={styles.headernya} />
                        </View>
                        <View style={{ alignItems: 'center', marginTop: responsiveHeight(1) }}>
                            <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', fontFamily: 'Poppins-SemiBold', marginBottom: responsiveHeight(-4), color: '#000000' }}>Grafik Suhu</Text>
                            <Graph />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: responsiveWidth(5) }}>
                            <View>
                                <View style={{ width: responsiveHeight(11), height: responsiveHeight(11), backgroundColor: '#DCEF32', borderRadius: 15, marginLeft: responsiveWidth(1.7) }}>
                                    <Text style={styles.textwrapper}>{this.state.Kelembapan}</Text>
                                </View>
                                <Text style={styles.subjudul}>Kelembapan</Text>
                            </View>

                            <View>
                                <View style={styles.wrappermenu}>
                                    <Text style={styles.textwrapper}>{this.state.SuhuUdara}</Text>
                                </View>
                                <Text style={styles.subjudul}>Suhu Udara</Text>
                            </View>
                            <View>
                                <View style={styles.wrappermenu}>
                                    <Text style={styles.textwrapper}>{this.state.SuhuAir}</Text>
                                </View>
                                <Text style={styles.subjudul}>Suhu Air</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: responsiveWidth(7) }}>
                            <Text style={{ color: 'black', fontSize: responsiveFontSize(1.6), fontWeight: 'bold', marginBottom: responsiveHeight(-2), fontFamily: 'Poppins-SemiBold' }}>Misting</Text>
                            <TouchableOpacity onPress={this.onPressButton}>
                                <Image style={{ width: responsiveWidth(25), height: responsiveHeight(14) }} source={abmix} />
                            </TouchableOpacity>
                            <Text style={{ color: 'black', fontSize: responsiveFontSize(1.6), fontWeight: 'bold', textAlign: 'center', fontFamily: 'Poppins-SemiBold', marginTop: responsiveHeight(-2) }}>{this.state.buttonValue === 1 ? 'ON' : 'OFF'}</Text>

                        </View>
                    </View>
                </ImageBackground >
            </View>
        )
    }
}
const styles = StyleSheet.create({

    headernya: { resizeMode: 'contain', width: responsiveWidth(80.4), height: responsiveHeight(13), marginTop: responsiveHeight(-1.4) },
    subjudul: { fontSize: responsiveFontSize(1.6), color: '#000000', marginTop: responsiveHeight(0.5), textAlign: 'center', fontFamily: 'Poppins-SemiBold' },
    textwrapper: { textAlign: 'center', marginTop: responsiveHeight(4.3), fontSize: responsiveFontSize(1.7), fontFamily: 'Poppins-SemiBold', color: '#000000' },
    wrappermenu: { width: responsiveHeight(11), height: responsiveHeight(11), backgroundColor: '#DCEF32', borderRadius: 15 }
})



export default KangkungPage;