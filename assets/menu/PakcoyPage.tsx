import React, { Component } from "react";
import { ImageBackground, View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import database from '@react-native-firebase/database';
import background from '../image/background.png'
import header from '../image/headerpakcoy.png'
import wrappertds from '../image/wrappertds.png'
import wrappersubmenu from '../image/wrappersubmenu.png'
import abmix from '../image/abmix.png'


class PakcoyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Kelembapan: ' ',
            Suhu: ' ',
            Suhu_air: ' ',
            PPM: ' '
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
    }
    render() {
        return (
            <View>
                <ImageBackground source={background} style={{ width: '100%', height: '100%' }}>
                    <View>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={header} style={styles.headernya} />
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 50 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5, fontFamily: 'Poppins-SemiBold' }}>Grafik TDS</Text>
                            <ImageBackground source={wrappertds} style={{ width: 294, height: 90, }} >
                                <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 32, fontFamily: 'Poppins-SemiBold' }}>{this.state.PPM}</Text>
                            </ImageBackground>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40 }}>
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
                        <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600', marginBottom: -10, fontFamily: 'Poppins-SemiBold' }}>AB MIX</Text>
                            <TouchableOpacity>
                                <Image source={abmix} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground >
            </View >
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



export default PakcoyPage;