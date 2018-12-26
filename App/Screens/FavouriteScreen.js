import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity, StatusBar,
    StyleSheet
} from 'react-native'
import Metrics from "../Themes/Metrics";
import {Header, Icon} from "native-base";

export default class FavouriteScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header style={{backgroundColor: '#376a3d'}}>
                    <StatusBar barStyle={'light-content'}/>
                    <View style={{
                        height: 40,
                        backgroundColor: '#376a3d',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: Metrics.screenWidth,
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: 30, height: 30, marginLeft: 5}} onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name={'ios-menu'} style={{color: 'white'}} />
                        </TouchableOpacity>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Let's write Kanji</Text>
                        <View style={{width: 30}}>

                        </View>
                    </View>
                </Header>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
