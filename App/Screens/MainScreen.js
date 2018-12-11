import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native'
import Tts from 'react-native-tts';


import ViewShot from "react-native-view-shot";
import {SketchCanvas} from "@terrylinla/react-native-sketch-canvas";
import Metrics from "../Themes/Metrics";
import Images from "../Themes/Images";
import LoudSpeaker from "react-native-loud-speaker";


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
            this.setState({imageUri: uri});
            this.refs.canvas.clear();

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

    speak = () => {
        // LoudSpeaker.open(true)
        // Tts.speak('片')
        Tts.speak('Hello')
    };

    render() {
        let size = Metrics.screenWidth * 5 / 5;
        console.log('size', size);
        return (
            <View style={styles.container}>
                <View>
                    <View style={{height: 25, backgroundColor: '#376a3d', width: Metrics.screenWidth}}>
                        <StatusBar barStyle={'light-content'}/>
                    </View>
                    <View style={{
                        height: 40,
                        backgroundColor: '#376a3d',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: Metrics.screenWidth,
                        // marginBottom: Metrics.screenWidth / 10
                    }}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Let's write Kanji</Text>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 10,
                        backgroundColor: 'transparent',
                        alignSelf: 'flex-start',
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'black', fontSize: 60, marginLeft: 10}}>片</Text>
                    </View>
                    <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={this.speak}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            borderColor: '#376a3d',
                            borderWidth: 1,
                            width: 120,
                            height: 120,
                            borderRadius: 5,
                            shadowOpacity: 1,
                            shadowOffset: {width: 1, height: 1},
                            backgroundColor: '#4baf58',
                            elevation: 3,
                        }}>
                            <Text style={{color: 'black', fontSize: 30, marginTop: 30}}>片</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text>ro</Text>
                                <Image style={{width: 15, height: 15, marginLeft: 5, tintColor: 'black'}}
                                       source={Images.icSound}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: 'red', width: size, height: size, marginTop: 10}}>
                    <ViewShot options={{format: "jpg", quality: 0.9}} ref="viewShot">
                        <View style={{backgroundColor: 'red', width: size, height: size, borderWidth: 1}}>
                            <SketchCanvas
                                ref={"canvas"}
                                style={{flex: 1, backgroundColor: 'black'}}
                                strokeColor={'white'}
                                onStrokeEnd={this.autoCapture}
                                strokeWidth={7}
                            />
                        </View>
                    </ViewShot>

                    <TouchableOpacity style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        margin: 10
                    }} onPress={this.clear}>
                        <Image style={{
                            width: 25,
                            height: 25
                        }} source={Images.icClear}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        margin: 10
                    }} onPress={this.capture}>
                        <Image style={{
                            width: 30,
                            height: 30
                        }} source={Images.icCapture}/>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#4baf58'
    }
});
