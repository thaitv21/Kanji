import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity, StatusBar,
    StyleSheet,
    FlatList
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
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.item}>Character</Text>
                        <Text style={styles.noRight}>Right</Text>
                        <Text style={styles.noWrong}>Wrong</Text>
                    </View>
                    <View style={styles.break}/>
                    <FlatList
                    data={[
                        {key: 'Devin', noR: 4, noW: 5},
                        {key: 'Jackson', noR: 4, noW: 5},
                        {key: 'James', noR: 4, noW: 5},
                        {key: 'Joel', noR: 4, noW: 5},
                        {key: 'John', noR: 4, noW: 5},
                        {key: 'Jillian', noR: 4, noW: 5},
                        {key: 'Jimmy', noR: 4, noW: 5},
                        {key: 'Julie', noR: 4, noW: 5},
                        {key: 'Devin_1', noR: 4, noW: 5},
                        {key: 'Jackson_1', noR: 4, noW: 5},
                        {key: 'James_1', noR: 4, noW: 5},
                        {key: 'Joel_1', noR: 4, noW: 5},
                        {key: 'John_1', noR: 4, noW: 5},
                        {key: 'Jillian_1', noR: 4, noW: 5},
                        {key: 'Jimmy_1', noR: 4, noW: 5},
                        {key: 'Julie_1', noR: 4, noW: 5}
                    ]}
                    renderItem={({item}) => 
                    <View>
                        <View style={styles.row}>
                        <Text style={styles.item}>{item.key}</Text>
                        <Text style={styles.noRight}>{item.noR}</Text>
                        <Text style={styles.noWrong}>{item.noW}</Text>      
                        </View>
                        <View style={styles.break}/>
                    </View>
                    }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
      flexDirection: 'row',
      padding: 10,
      height: 60,
      backgroundColor: '#F6F6F6'
    },
    item: {
      padding: 10,
      fontSize: 18,
    },
    noRight: {
      position: 'absolute',
      right: 120,
      fontSize: 18,
      padding: 20,
      color: 'green'
    },
    noWrong: {
      position: 'absolute',
      right: 40,
      fontSize: 18,
      padding: 20,
      color: 'red'
    },
    break: {
        height: 1, backgroundColor: '#3B5998'
    }
});
