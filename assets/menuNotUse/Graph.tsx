import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';
import { LineChart } from 'react-native-chart-kit';
import * as Svg from 'react-native-svg';
import database from '@react-native-firebase/database';
import moment from 'moment';

class RealtimeGraph extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        };
    }

    // fetch_data = () => {
    //     const sleep = db.ref('TDS/');
    //     sleep.on('value', (snapshot) => {
    //         let array = []
    //         snapshot.forEach((childSnapshot) => {
    //             array.push(childSnapshot.val().PPM);
    //         })
    //     })
    // }

    componentDidMount() {
        // database().ref('TDS/')
        //     .on('value', snapshot => {
        //         let dataPoints = [];
        //         snapshot.forEach(childSnapshot => {
        //             dataPoints.push(childSnapshot.val());
        //         });
        //         this.setState({ data: dataPoints });
        //     });

        database().ref('TDS/')
            .on('value', (snapshot) => {
                const data = [];
                snapshot.forEach((child) => {
                    const { x, y } = child.val();
                    data.push({ x: moment(x).format('hh:mm:ss'), y });
                });
                this.setState({ data });
            });
    }


    render() {
        return (
            <View>
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [320, 210, 320, 430, 501, 200]
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
                        marginTop: 30,
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />

            </View>
        );
    }

}








export default RealtimeGraph