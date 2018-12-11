import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'

import ViewShot from "react-native-view-shot";
import {SketchCanvas} from "@terrylinla/react-native-sketch-canvas";
import Metrics from "../Themes/Metrics";


export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageUri: null
        }
    }


    componentDidMount() {
    }

    capture = () => {
        this.refs.viewShot.capture().then(uri => {
            console.log("do something with ", uri);
            this.setState({imageUri: uri})
        });
    };

    clear = () => {
        this.refs.canvas.clear();
        this.setState({imageUri: null})
    };

    autoCapture = () => {
        setTimeout(() => {
            this.capture()
        }, 5000)
    };

    render() {
        let size = Metrics.screenWidth;
        console.log('size', size);
        return (
            <View style={styles.container}>
                <View style={{height: 25, backgroundColor: 'cyan', width: Metrics.screenWidth}}/>
                <View style={{
                    height: 40,
                    backgroundColor: 'cyan',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: Metrics.screenWidth
                }}>
                    <Text>QUACH DEMO</Text>
                </View>
                <ViewShot options={{format: "jpg", quality: 0.9}} ref="viewShot">
                    <View style={{backgroundColor: 'red', width: Metrics.screenWidth, height: size}}>
                        <SketchCanvas
                            ref={"canvas"}
                            style={{flex: 1, backgroundColor: 'blue'}}
                            strokeColor={'red'}
                            onStrokeEnd={this.autoCapture}
                            strokeWidth={7}
                        />
                    </View>
                </ViewShot>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this.capture} style={{
                        borderRadius: 10,
                        backgroundColor: '#f25819',
                        padding: 10,
                        marginTop: 10,
                        marginRight: 10
                    }}>
                        <Text style={{marginLeft: 10, marginRight: 10}}>Capture</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.clear} style={{
                        borderRadius: 10,
                        backgroundColor: '#f25819',
                        padding: 10,
                        marginTop: 10,
                        marginLeft: 10,
                        alignItems: 'center'
                    }}>
                        <Text style={{marginLeft: 10, marginRight: 10}}>Clear</Text>
                    </TouchableOpacity>

                </View>
                <View style={{width: 150, height: 150, marginTop: 10, backgroundColor: 'blue'}}>
                {
                    this.state.imageUri &&
                    <Image style={{width: 150, height: 150}} source={{uri: this.state.imageUri}}
                           resizeMode={'contain'}/>
                }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
});
