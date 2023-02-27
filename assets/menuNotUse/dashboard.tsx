import React from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import background from '../image/background.png'
import headerpage from '../image/headerdshbrd.png';
import ktkdashboard from '../image/ktkdashboard.png'
import bayam from '../image/bayam.png';
import kangkung from '../image/kangkung.png';
import pakcoy from '../image/pakcoy.png'
import footerpage from '../image/footer.png'


const Dashboard = ({ navigation }) => {
    return (
        <View>
            <ImageBackground source={background} style={{ width: '100%', height: '100%' }}>
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={headerpage} style={styles.headernya} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 130 }}>
                        <View>
                            <Image source={ktkdashboard} style={styles.wrappertengah} />
                            <Text style={styles.textnya}>Suhu Air</Text>
                        </View>
                        <View>
                            <Image source={ktkdashboard} style={styles.wrappertengah} />
                            <Text style={styles.textnya}>Kelembapan</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 25 }}>
                        <Image source={ktkdashboard} style={styles.wrappertengah} />
                        <Text style={styles.textnya}>Suhu Sekitar</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 173 }}>
                        <ImageBackground source={footerpage} style={{ width: "100%", height: 65 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Pakcoy')}>
                                    <Image source={pakcoy} style={styles.logosayur} />
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => navigation.navigate('Kangkung')}>
                                    <Image source={kangkung} style={styles.logosayur} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Bayam')}>
                                    <Image source={bayam} style={styles.logosayur} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </ImageBackground >
        </View >
    )
}

const styles = StyleSheet.create({

    headernya: { width: 330, height: 92, borderRadius: 20, marginTop: -20 },
    textnya: { fontSize: 12, color: 'white', marginTop: 2, textAlign: 'center' },
    logosayur: { width: 50, height: 50 },
    wrappertengah: { height: 90, width: 90 }
})

export default Dashboard;