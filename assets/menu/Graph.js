import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { responsiveHeight } from 'react-native-responsive-dimensions'
import database from '@react-native-firebase/database';
import { VictoryChart, VictoryLine } from "victory-native"


class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PPM: []
        };
    }


    componentDidMount() {

        database()
            .ref('TDS')
            .limitToLast(50)
            .on('value', snapshot => {
                let dataPoints = [];
                snapshot.forEach(childSnapshot => {
                    dataPoints.push(childSnapshot.val().PPM);
                });
                this.setState({ PPM: dataPoints });
            });

    }

    render() {
        return (
            <View style={styles.container}>
                <VictoryChart height={responsiveHeight(29)}>
                    <VictoryLine animate data={this.state.PPM} />
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