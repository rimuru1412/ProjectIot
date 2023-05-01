import React, { Component } from "react";
import { ImageBackground, View, Image, StyleSheet, Text, TouchableOpacity, Alert, Dimensions, ScrollView } from "react-native";
import database from '@react-native-firebase/database';
import { LineChart } from "react-native-chart-kit"
import background from '../image/background.png'
import header from '../image/headerpakcoy.png'
import wrappertds from '../image/wrappertds.png'
import wrappersubmenu from '../image/wrappersubmenu.png'
import abmix from '../image/abmix.png'
import * as Svg from 'react-native-svg';
import { firebase } from "@react-native-firebase/database";


class PakcoyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Kelembapan: ' ',
            Suhu: ' ',
            Suhu_air: ' ',
            PPM: ' ',
            buttonValue: 0,
            data: [],
        };
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
            .ref('Button/pakcoy')
            .on('value', (snapshot) => {
                const buttonValue = snapshot.val();
                this.setState({ buttonValue });
            })

        // database()
        //     .ref('TDS')
        //     .on('value', snapshot => {
        //         let dataPoints = [];
        //         snapshot.forEach(childSnapshot => {
        //             dataPoints.push(childSnapshot.val().PPM);
        //         });
        //         this.setState({ data: dataPoints });
        //     });

        // database()
        // .ref('/TDS/PPM')
        // .on('value', snapshot => {
        //     const data = snapshot.val();
        //     this.setState({ data });
        // });

    }

    onPressButton = () => {
        const newButtonValue = this.state.buttonValue === 0 ? 1 : 0;
        database()
            .ref('Button/pakcoy')
            .set(newButtonValue);

        {
            this.state.buttonValue === 0 && (
                Alert.alert(
                    'Mode Pakcoy Menyala',
                    'Ketuk sekali lagi untuk mematikan mode pakcoy',
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
                    'Mode Pakcoy Mati',
                    'Ketuk sekali lagi untuk menyalakan mode pakcoy',
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
                        <View style={{ alignItems: 'center', marginTop: 25 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 2, fontFamily: 'Poppins-SemiBold' }}>Grafik TDS</Text>
                            {/* <ImageBackground source={wrappertds} style={{ width: 294, height: 90, }} >
                                <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 32, fontFamily: 'Poppins-SemiBold' }}>{this.state.PPM}</Text>
                            </ImageBackground> */}
                            {/* Untuk grafik */}
                            <LineChart
                                data={{
                                    labels: ["January", "February", "March", "April", "May", "June"],
                                    datasets: [
                                        {
                                            data: [320, 210, 230, 430, 503, 210]
                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width} // from react-native
                                height={180}
                                // yAxisLabel="$"
                                // yAxisSuffix="k"
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "#e26a00",
                                    backgroundGradientFrom: "#fb8c00",
                                    backgroundGradientTo: "#ffa726",
                                    decimalPlaces: 0, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16,
                                    marginRight: 10,
                                    marginLeft: 12
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 25 }}>
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