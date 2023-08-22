import React, { Component } from "react";
import { ImageBackground, View, Image, StyleSheet, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faToggleOn } from '@fortawesome/free-solid-svg-icons/faToggleOn'
import { faToggleOff } from '@fortawesome/free-solid-svg-icons/faToggleOff'
import background from '../image/bgair.png'
import header from '../image/headermisting.png'
import Graph from "./GraphMisting";
import { db } from "./firebase"

let buttonmisting = db.ref("/Button/misting");
let buttonOtomatis = db.ref("/Mode/otomatis");
let buttonManual = db.ref("/Mode/manual")
let suhuudara = db.ref("/DHT/Suhu");
let Kelembapan = db.ref("/DHT/Kelembapan")
let suhuair = db.ref("/DS18B20/SuhuAir");
let kondisi = db.ref("Pompa/Kondisi");

class MistingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonMisting: 0,
            buttonOtomatis: 0,
            buttonManual: 0,
            SuhuUdara: ' ',
            Kelembapan: ' ',
            SuhuAir: ' ',
            kondisi: ' ',
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

        buttonmisting.on('value', (snapshot) => {
            const buttonMisting = snapshot.val();
            this.setState({ buttonMisting });
        })

        buttonOtomatis.on('value', (snapshot) => {
            const buttonOtomatis = snapshot.val();
            this.setState({ buttonOtomatis });
        })

        buttonManual.on('value', (snapshot) => {
            const buttonManual = snapshot.val();
            this.setState({ buttonManual });
        })

        kondisi.on('value', (snapshot) => {
            const kondisi = snapshot.val();
            this.setState({ kondisi });
        })

    }

    onPressButton = () => {
        const newbuttonMisting = this.state.buttonMisting === 0 ? 1 : 0;
        buttonmisting.set(newbuttonMisting);

        {
            this.state.buttonMisting === 0 && (
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
            this.state.buttonMisting === 1 && (
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

    PressButtonOtomatis = () => {
        const newbuttonOtomatis = this.state.buttonOtomatis === 0 ? 1 : 0;
        buttonOtomatis.set(newbuttonOtomatis);
    }

    PressButtonManual = () => {
        const newbuttonManual = this.state.buttonManual === 0 ? 1 : 0;
        buttonManual.set(newbuttonManual);
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: responsiveWidth(1) }}>
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


                        <View style={{ alignItems: 'center', marginTop: responsiveHeight(3) }}>
                            <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', fontFamily: 'Poppins-SemiBold', marginBottom: responsiveHeight(-4), color: '#000000' }}>Mode Misting</Text>
                        </View>

                        <View style={{ marginTop: responsiveHeight(3) }}>
                            {this.state.buttonManual === 1 && this.state.buttonOtomatis === 0 ? (
                                <View>
                                    <View style={{ alignItems: 'center' }}>
                                        <TouchableOpacity onPress={this.PressButtonManual}>
                                            <Text>{this.state.buttonManual === 1 ? <FontAwesomeIcon style={styles.button} icon={faToggleOn} size={60} /> : <FontAwesomeIcon icon={faToggleOff} style={styles.button} size={60} />}</Text>
                                        </TouchableOpacity>
                                        <Text style={{ color: 'black', fontSize: responsiveFontSize(1.6), fontWeight: 'bold', fontFamily: 'Poppins-SemiBold', marginTop: responsiveWidth(-1.2) }}>Manual</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: responsiveHeight(2), marginLeft: responsiveWidth(4) }}>
                                        <View style={{ alignItems: 'center', marginTop: responsiveHeight(-1) }}>
                                            <TouchableOpacity onPress={this.onPressButton}>
                                                <Text>{this.state.buttonMisting === 1 ? <FontAwesomeIcon style={styles.button} icon={faToggleOn} size={60} /> : <FontAwesomeIcon icon={faToggleOff} style={styles.button} size={60} />}</Text>
                                            </TouchableOpacity>
                                            <Text style={{ color: 'black', fontSize: responsiveFontSize(1.6), fontWeight: 'bold', fontFamily: 'Poppins-SemiBold', marginTop: responsiveWidth(0.8) }}>Misting</Text>
                                        </View>
                                        <View style={{ marginTop: responsiveHeight(0.1), alignItems: 'center' }}>
                                            <View style={{ width: responsiveHeight(11), height: responsiveHeight(7), backgroundColor: '#DCEF32', borderRadius: 15 }}>
                                                <Text style={{ textAlign: 'center', marginTop: responsiveHeight(2.1), fontSize: responsiveFontSize(1.7), fontFamily: 'Poppins-SemiBold', color: '#000000' }}>{this.state.kondisi}</Text>
                                            </View>
                                            <Text style={{ color: 'black', fontSize: responsiveFontSize(1.6), fontWeight: 'bold', fontFamily: 'Poppins-SemiBold', marginTop: responsiveWidth(2) }}>Kondisi Misting</Text>
                                        </View>
                                    </View>
                                </View>

                            ) : this.state.buttonOtomatis === 1 && this.state.buttonManual === 0 ? (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: responsiveHeight(4) }}>
                                    <View style={{ alignItems: 'center', marginTop: responsiveHeight(-0.8) }}>
                                        <TouchableOpacity onPress={this.PressButtonOtomatis}>
                                            <Text>{this.state.buttonOtomatis === 1 ? <FontAwesomeIcon style={styles.button} icon={faToggleOn} size={60} /> : <FontAwesomeIcon icon={faToggleOff} style={styles.button} size={60} />}</Text>
                                        </TouchableOpacity>
                                        <Text style={{ color: 'black', fontSize: responsiveFontSize(1.6), fontWeight: 'bold', fontFamily: 'Poppins-SemiBold', marginTop: responsiveWidth(0.8) }}>Otomatis</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <View style={{ width: responsiveHeight(11), height: responsiveHeight(7), backgroundColor: '#DCEF32', borderRadius: 15 }}>
                                            <Text style={{ textAlign: 'center', marginTop: responsiveHeight(2.1), fontSize: responsiveFontSize(1.7), fontFamily: 'Poppins-SemiBold', color: '#000000' }}>{this.state.kondisi}</Text>
                                        </View>
                                        <Text style={{ color: 'black', fontSize: responsiveFontSize(1.6), fontWeight: 'bold', fontFamily: 'Poppins-SemiBold', marginTop: responsiveWidth(2) }}>Kondisi Misting</Text>
                                    </View>
                                </View>

                            ) :
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <TouchableOpacity onPress={this.PressButtonManual}>
                                                <Text>{this.state.buttonManual === 1 ? <FontAwesomeIcon style={styles.button} icon={faToggleOn} size={60} /> : <FontAwesomeIcon icon={faToggleOff} style={styles.button} size={60} />}</Text>
                                            </TouchableOpacity>
                                            <Text style={{ color: 'black', fontSize: responsiveFontSize(1.6), fontWeight: 'bold', fontFamily: 'Poppins-SemiBold', marginTop: responsiveWidth(-1.2) }}>Manual</Text>
                                        </View>

                                        <View style={{ alignItems: 'center', marginRight: responsiveWidth(1) }}>
                                            <TouchableOpacity onPress={this.PressButtonOtomatis}>
                                                <Text>{this.state.buttonOtomatis === 1 ? <FontAwesomeIcon style={styles.button} icon={faToggleOn} size={60} /> : <FontAwesomeIcon icon={faToggleOff} style={styles.button} size={60} />}</Text>
                                            </TouchableOpacity>
                                            <Text style={{ color: 'black', fontSize: responsiveFontSize(1.6), fontWeight: 'bold', fontFamily: 'Poppins-SemiBold', marginTop: responsiveWidth(-1.2) }}>Otomatis</Text>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'center', marginTop: responsiveHeight(2) }}>
                                        <View style={{ width: responsiveHeight(11), height: responsiveHeight(7), backgroundColor: '#DCEF32', borderRadius: 15 }}>
                                            <Text style={{ textAlign: 'center', marginTop: responsiveHeight(2.1), fontSize: responsiveFontSize(1.7), fontFamily: 'Poppins-SemiBold', color: '#000000' }}>{this.state.kondisi}</Text>
                                        </View>
                                        <Text style={{ color: 'black', fontSize: responsiveFontSize(1.6), fontWeight: 'bold', fontFamily: 'Poppins-SemiBold', marginTop: responsiveWidth(2) }}>Kondisi Misting</Text>
                                    </View>
                                </View>
                            }
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
    wrappermenu: { width: responsiveHeight(11), height: responsiveHeight(11), backgroundColor: '#DCEF32', borderRadius: 15 },
    button: { color: '#EC008C' }
})



export default MistingPage;