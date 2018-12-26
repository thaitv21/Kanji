import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    Text, StatusBar, TouchableOpacity
} from 'react-native'
import Metrics from "../Themes/Metrics";
import {Header, Icon} from "native-base";
import NavigationBar from "../Components/NavigationBar";


const guide = 'Viết hướng dẫn vòo đây nhé!';

export default class GuideScreen extends Component{
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar navigation={this.props.navigation}/>
                <Text>{guide}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
