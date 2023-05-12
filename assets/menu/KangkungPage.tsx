import React, { Component } from "react";
import { ImageBackground, View, Image, StyleSheet, Text, TouchableOpacity, Alert, ScrollView, Dimensions } from "react-native";
import database from '@react-native-firebase/database';
import background from '../image/background.png'
import header from '../image/headerkangkung.png'
import wrappertds from '../image/wrappertds.png'
import wrappersubmenu from '../image/wrappersubmenu.png'
import abmix from '../image/abmix.png'
import Graph from "./Graph";

class KangkungPage extends Component {
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
            .ref('TDS/PPM/')
            .on('value', snapshot => {
                this.setState({
                    PPM: snapshot.val()
                })
            })

        database()
            .ref('Button/kangkung')
            .on('value', (snapshot) => {
                const buttonValue = snapshot.val();
                this.setState({ buttonValue });
            })

    }

    onPressButton = () => {
        const newButtonValue = this.state.buttonValue === 0 ? 1 : 0;
        database()
            .ref('Button/kangkung')
            .set(newButtonValue);

        {
            this.state.buttonValue === 0 && (
                Alert.alert(
                    'Mode Kangkung Menyala',
                    'Ketuk sekali lagi untuk mematikan mode kangkung',
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
                    'Mode Kangkung Mati',
                    'Ketuk sekali lagi untuk menyalakan mode kangkung',
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
            <ScrollView>
                <ImageBackground source={background} style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height }}>
                    <View>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={header} style={styles.headernya} />
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Poppins-SemiBold' }}>Grafik TDS</Text>
                            <Graph />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
                            <View>
                                <ImageBackground source={wrappersubmenu} style={styles.wrappersubmenu} >
                                    <Text style={styles.textwrappermenu}>{this.state.Suhu_air}</Text>
                                </ImageBackground>
                                <Text style={styles.textnya}>Suhu Air</Text>
                            </View>
                            <View>
                                <ImageBackground source={wrappersubmenu} style={styles.wrappersubmenu} >
                                    <Text style={styles.textwrappermenu}>{this.state.Suhu}</Text>
                                </ImageBackground>
                                <Text style={styles.textnya}>Suhu Sekitar</Text>
                            </View>
                            <View>
                                <ImageBackground source={wrappersubmenu} style={styles.wrappersubmenu} >
                                    <Text style={styles.textwrappermenu}>{this.state.Kelembapan}</Text>
                                </ImageBackground>
                                <Text style={styles.textnya}>Kelembapan</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 25 }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600', marginBottom: -15, fontFamily: 'Poppins-SemiBold' }}>AB MIX</Text>
                            <TouchableOpacity onPress={this.onPressButton}>
                                <Image source={abmix} />
                            </TouchableOpacity>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600', textAlign: 'center', fontFamily: 'Poppins-SemiBold', marginTop: -15 }}>{this.state.buttonValue === 1 ? 'ON' : 'OFF'}</Text>

                        </View>
                    </View>
                </ImageBackground >
            </ScrollView >
        )
    }
}
const styles = StyleSheet.create({

    headernya: { width: 330, height: 92, marginTop: -10 },
    textnya: { fontSize: 15, color: '#DCEF32', marginTop: 2, textAlign: 'center', fontFamily: 'Poppins-SemiBold' },
    textwrappermenu: { textAlign: 'center', marginTop: 35, fontSize: 15, fontFamily: 'Poppins-SemiBold' },
    logosayur: { width: 50, height: 50 },
    wrappersubmenu: { height: 90, width: 90 }
})



export default KangkungPage;