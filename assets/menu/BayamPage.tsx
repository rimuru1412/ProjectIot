import React from "react";
import { ImageBackground, View, Image, StyleSheet, Text } from "react-native";
import background from '../image/background.png'
import header from '../image/headerbayam.png'
import wrappertds from '../image/wrappertds.png'
import wrappersubmenu from '../image/wrappersubmenu.png'
import abmix from '../image/abmix.png'


const BayamPage = () => {
    return (
        <View>
            <ImageBackground source={background} style={{ width: '100%', height: '100%' }}>
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={header} style={styles.headernya} />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ fontSize: 13, fontWeight: 'bold', marginBottom: 5 }}>Grafik TDS</Text>
                        <Image source={wrappertds} style={{ width: 294, height: 90, }} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40 }}>
                        <View>
                            <Image source={wrappersubmenu} style={styles.wrappersubmenu} />
                            <Text style={styles.textnya}>Suhu Air</Text>
                        </View>
                        <View>
                            <Image source={wrappersubmenu} style={styles.wrappersubmenu} />
                            <Text style={styles.textnya}>Suhu Sekitar</Text>
                        </View>
                        <View>
                            <Image source={wrappersubmenu} style={styles.wrappersubmenu} />
                            <Text style={styles.textnya}>Kelembapan</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 30 }}>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '600', marginBottom: -10 }}>AB MIX</Text>
                        <Image source={abmix} />
                    </View>
                </View>
            </ImageBackground >
        </View >
    )
}

const styles = StyleSheet.create({

    headernya: { width: 330, height: 92, marginTop: -10 },
    textnya: { fontSize: 12, color: '#DCEF32', marginTop: 2, textAlign: 'center' },
    logosayur: { width: 50, height: 50 },
    wrappersubmenu: { height: 90, width: 90 }
})



export default BayamPage;