import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { responsiveHeight } from 'react-native-responsive-dimensions'
import database from '@react-native-firebase/database';
import { VictoryChart, VictoryLine } from "victory-native"
import { db } from "./firebase"

let suhu = db.ref("/LOG").limitToLast(50);

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SuhuUdara: []
        };
    }


    componentDidMount() {

        suhu.on('value', snapshot => {
            let dataPoints = [];
            snapshot.forEach(childSnapshot => {
                dataPoints.push(childSnapshot.val().SuhuUdara);
            });
            this.setState({ SuhuUdara: dataPoints });
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <VictoryChart height={responsiveHeight(29)}>
                    <VictoryLine animate data={this.state.SuhuUdara} />
                </VictoryChart>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center", marginLeft: 20
    },
});



export default Graph;