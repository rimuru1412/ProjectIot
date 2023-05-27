import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import database from '@react-native-firebase/database';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from "victory-native"

const Graph = () => {
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
                <VictoryLine animate data={chartData} labelComponent={null} />
            </VictoryChart>

            {/* <LineChart
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
                            /> */}
        </View>
    );
};

export default Graph;

const styles = StyleSheet.create({
    container: {
        alignItems: "center", marginLeft: 20
    },
});