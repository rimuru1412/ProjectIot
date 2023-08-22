import React, { Component } from "react";
import { ImageBackground, View, Image, StyleSheet, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faToggleOn } from '@fortawesome/free-solid-svg-icons/faToggleOn'
import { faToggleOff } from '@fortawesome/free-solid-svg-icons/faToggleOff'
import database from '@react-native-firebase/database';
import background from '../image/bgbayam.png'
import header from '../image/headerbayam.png'
import Graph from "./Graph";


class BayamPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Kelembapan: ' ',
            Suhu: ' ',
            Suhu_air: ' ',
            PPM: ' ',
            buttonValue: 0
        }
    }

    componentDidMount() {
        database()
            .ref('DHT/Kelembapan/')
            .on('value', snapshot => {
                this.setState({
                    Kelembapan: snapshot.val()

                })
            })

        database()
            .ref('DHT/Suhu/')
            .on('value', snapshot => {
                this.setState({
                    Suhu: snapshot.val()

                })
            })

        database()
            .ref('DS18B20/Suhu_air/')
            .on('value', snapshot => {
                this.setState({
                    Suhu_air: snapshot.val()

                })
            })

        database()
            .ref('PPM/realtime')
            .on('value', snapshot => {
                this.setState({
                    PPM: snapshot.val()
                })
            })

        database()
            .ref('Button/bayam')
            .on('value', (snapshot) => {
                const buttonValue = snapshot.val();
                this.setState({ buttonValue });
            })

    }

    onPressButton = () => {
        const newButtonValue = this.state.buttonValue === 0 ? 1 : 0;
        database()
            .ref('Button/bayam')
            .set(newButtonValue);


        {
            this.state.buttonValue === 0 && (
                Alert.alert(
                    'Mode Bayam Menyala',
                    'Ketuk sekali lagi untuk mematikan mode bayam',
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
                    'Mode Bayam Mati',
                    'Ketuk sekali lagi untuk menyalakan mode bayam',
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
                            <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', fontFamily: 'Poppins-SemiBold', marginBottom: responsiveHeight(-4), color: '#000000' }}>Grafik TDS</Text>
                            <Graph />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginLeft: responsiveWidth(1.7) }}>
                            <View style={{ marginRight: responsiveWidth(1.4) }}>
                                <View style={styles.wrappermenu}>
                                    <Text style={styles.textwrapper}>{this.state.Suhu_air}</Text>
                                </View>
                                <Text style={styles.subjudul}>Suhu Air</Text>
                            </View>

                            <View>
                                <View style={styles.wrappermenu}>
                                    <Text style={styles.textwrapper}>{this.state.Suhu}</Text>
                                </View>
                                <Text style={styles.subjudul}>Suhu Sekitar</Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginLeft: responsiveWidth(1.7), marginTop: responsiveHeight(1) }}>
                            <View style={{ marginRight: responsiveWidth(1.4) }}>
                                <View style={styles.wrappermenu}>
                                    <Text style={styles.textwrapper}>{this.state.PPM}</Text>
                                </View>
                                <Text style={styles.subjudul}>PPM</Text>
                            </View>

                            <View>
                                <View style={styles.wrappermenu}>
                                    <Text style={styles.textwrapper}>{this.state.Kelembapan}</Text>
                                </View>
                                <Text style={styles.subjudul}>Kelembapan</Text>
                            </View>

                        </View>
                        <View style={{ alignItems: 'center', marginTop: responsiveWidth(3) }}>
                            <Text style={{ color: 'black', fontSize: responsiveFontSize(1.6), fontWeight: 'bold', marginBottom: responsiveWidth(1), fontFamily: 'Poppins-SemiBold' }}>AB MIX</Text>
                            <TouchableOpacity onPress={this.onPressButton}>
                                <Text style={{ color: 'white', fontSize: responsiveFontSize(40), fontWeight: 'bold', textAlign: 'center', fontFamily: 'Poppins-SemiBold' }}>{this.state.buttonValue === 1 ? <FontAwesomeIcon style={{ color: '#EC008C' }} icon={faToggleOn} size={60} /> : <FontAwesomeIcon icon={faToggleOff} style={{ color: '#EC008C' }} size={60} />}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ImageBackground >
            </View>
        )
    }
}

const styles = StyleSheet.create({

    headernya: { resizeMode: 'contain', width: responsiveWidth(80.4), height: responsiveHeight(13), marginTop: responsiveHeight(-1.4) },
    subjudul: { fontSize: responsiveFontSize(1.6), color: '#000000', marginTop: responsiveHeight(0.1), textAlign: 'center', fontFamily: 'Poppins-SemiBold' },
    textwrapper: { textAlign: 'center', marginTop: responsiveHeight(4.3), fontSize: responsiveFontSize(1.7), fontFamily: 'Poppins-SemiBold', color: '#000000' },
    wrappermenu: { width: responsiveHeight(11), height: responsiveHeight(11), backgroundColor: '#DCEF32', borderRadius: 15, }
})



export default BayamPage;