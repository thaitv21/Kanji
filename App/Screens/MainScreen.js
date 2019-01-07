import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    Alert
} from 'react-native'

import ViewShot from "react-native-view-shot";
import {SketchCanvas} from "@terrylinla/react-native-sketch-canvas";
import Metrics from "../Themes/Metrics";
import Images from "../Themes/Images";
import {Header, Icon} from 'native-base';
import Sound from 'react-native-sound'
import {TFLiteImageRecognition} from 'react-native-tensorflow-lite';

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageUri: null
        };
        this.canCapture = true;

        try {
            this.classifier = new TFLiteImageRecognition({
                model: 'model.tflite',
                labels: 'label.txt'
            });
            console.log('class', this.classifier)
        } catch(err){
            alert(err)
        }
    }

    async classifyImage(imagePath){
        try {
            const results = await this.classifier.recognize({
                image: imagePath,
                inputShape: 32
            });
            console.log('res', results)

            if (results.length > 0) {
                const resultObj = {
                    name: results[0].name,
                    confidence: results[0].confidence,
                    inference: results[0].inference
                };
                this.setState(resultObj)
            } else {
                alert('Unrecognized character')
            }
        } catch(err){
            alert(err);
            console.log(err)
        }
    }

    componentWillUnmount(){
        this.classifier.close()
    }

    componentDidMount() {
        Sound.setCategory('Playback');
    }

    capture = () => {
        this.refs.viewShot.capture().then(uri => {
            console.log("do something with ", uri);
            this.setState({imageUri: uri});
            this.refs.canvas.clear();
            this.classifyImage(this.state.imageUri).then().catch((err) => {
                console.log('err', err)
            })
        });
    };

    clear = () => {
        this.refs.canvas.clear();
        this.setState({imageUri: null})
    };

    autoCapture = () => {
        if (this.canCapture) {
            this.canCapture = false;
            setTimeout(() => {
                this.capture();
                this.canCapture = true;
            }, 5000)
        }
    };

    speak = () => {
        const callback = (error, sound) => {
            if (error) {
                Alert.alert('error', error.message);
                return;
            }
            sound.play(() => {
                sound.release();
            });
        };

        const sound = new Sound(require('../../test.mp3'), error => callback(error, sound));
    };
    
    render() {
        let size = Metrics.screenWidth * 5 / 5;
        return (
            <View style={styles.container}>
                <View>
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
                        <Text style={{color: 'black', fontSize: 60, marginLeft: 10}}>{this.state.name}</Text>
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
                    <ViewShot options={{format: "png", quality: 1.0, width: 32, height: 32}} ref="viewShot">
                        <View style={{backgroundColor: 'red', width: size, height: size, borderWidth: 1}}>
                            <SketchCanvas
                                ref={"canvas"}
                                style={{flex: 1, backgroundColor: 'black'}}
                                strokeColor={'white'}
                                // onStrokeStart={this.cancelTimeout}
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
