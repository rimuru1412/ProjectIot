

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { responsiveHeight } from 'react-native-responsive-dimensions'
import database from '@react-native-firebase/database';
import { VictoryChart, VictoryLine } from "victory-native"

const Grafik = () => {
    const [fbData, setFbData] = useState([]);
    const [chartLabels, setChartLabels] = useState([1]);
    const [chartData, setChartData] = useState([1]);

    useEffect(() => {
        database()
            .ref('TDS')
            .limitToLast(50)
            .on("value", (snapshot) => {
                let data = snapshot.val();
                let values = Object.values(data);
                setFbData(values);
            });
    }, []);

    useEffect(() => {
        let data = [];
        let labels = [];
        fbData.map((item, index) => {
            data.push(item.PPM);
            labels.push(item.waktu);
        });
        if (data) {
            setChartLabels(labels);
            setChartData(data);
        }
    }, [fbData]);

    {
        fbData.map((item, index) => {
            return (
                <View key={index}>
                    <Text style={styles.itemText}>{item.value + " " + item.time}</Text>
                </View>
            );
        });
    }

    return (
        <View style={styles.container}>
            <VictoryChart height={responsiveHeight(29)}>
                <VictoryLine animate data={chartData} />
            </VictoryChart>
        </View>
    );
};

export default Grafik;

const styles = StyleSheet.create({
    container: {
        alignItems: "center", marginLeft: 20
    },
});