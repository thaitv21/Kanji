import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    Alert,
    Modal
} from 'react-native'

import ViewShot from "react-native-view-shot";
import {SketchCanvas} from "@terrylinla/react-native-sketch-canvas";
import Metrics from "../Themes/Metrics";
import Images from "../Themes/Images";
import {Header, Icon} from 'native-base';
import Sound from 'react-native-sound'
import {TFLiteImageRecognition} from 'react-native-tensorflow-lite';
import Realm from "realm";
import ImageResizer from 'react-native-image-resizer';

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageUri: null,
            number: 9250,
            pronounciation: '',
            isRight: false,
            modal: false
        };
        this.canCapture = true;

        try {
            this.classifier = new TFLiteImageRecognition({
                model: 'model.tflite',
                labels: 'label.txt'
            });
            console.log('class', this.classifier)
        } catch (err) {
            alert(err)
        }

    }

    async classifyImage(imagePath) {
        try {
            const results = await this.classifier.recognize({
                image: imagePath,
                inputShape: 32
            });
            console.log('res', results);

            if (results.length > 0) {
                let word = this.getWord(parseInt(results[0].name));
                if (word) {
                    // const resultObj = {
                    //     name: word.word,
                    //     number: word.number,
                    //     pronounciation: word.pronounciation
                    // };
                    this.setState({
                        name: word.word,
                        number: word.number,
                        pronounciation: word.pronounciation
                    })
                } else {
                    console.log("Can't find the number " + results[0].name);
                }
            } else {
                alert('Unrecognized character, please draw more carefully!')
            }

            this.refs.canvas.clear();
            //todo thêm vào db
            // this.add(2, 'A', false);
        } catch (err) {
            alert(err);
            console.log(err);
            this.refs.canvas.clear();
        }
    }

    componentWillUnmount() {
        this.classifier.close()
    }

    componentDidMount() {
        Sound.setCategory('Playback');
        const WordSchema = {
            name: 'Word',
            properties: {
                number: 'int',
                word: 'string',
                pronounciation: 'string'
            }
        };
        const HistorySchema = {
            name: 'History',
            properties: {
                number: 'int',
                word: 'string',
                noRight: {type: 'int', default: 0},
                noWrong: {type: 'int', default: 0}
            }
        };
        Realm.open({
            schema: [WordSchema, HistorySchema]
        }).then(realm => {
            this.realm = realm;
            console.log('realm', this.realm);
            // this.getHistory()
            this.loadWord()
        });
    }

    loadWord = () => {
        let word = this.realm.objects('Word');
        if (word.length !== 3036) {
            const wordList = require('../../data.json');
            console.log('Loading...' + wordList.length);
            this.realm.write(() => {
                wordList.forEach(w => {
                    console.log('word loaded', w);
                    this.realm.create('Word', {
                        number: parseInt(w['number']),
                        word: w['word'],
                        pronounciation: w['pronounciation']
                    });
                });
            });
        } else {
            console.log('Word data was loaded!');
        }
    };

    getWord = (number) => {
        let word = this.realm.objects('Word').filtered("number == " + number);
        if (word.length === 0) {
            console.log('Can not get the word with number = ' + number);
            return null
        } else {
            console.log('word', word);
            return word[0]
        }
    };

    add = (number, word, isRight) => {
        let history = this.realm.objects("History").filtered("number == " + number);
        console.log('add');
        if (history.length === 0) {
            this.realm.write(() => {
                let noRight, noWrong;
                if (isRight) {
                    noRight = 1;
                    noWrong = 0;
                } else {
                    noRight = 0;
                    noWrong = 1;
                }
                this.realm.create('History', {number: number, word: word, noRight: noRight, noWrong: noWrong});
            })
        } else {
            this.realm.write(() => {
                if (isRight) {
                    history[0].noRight = history[0].noRight + 1
                } else {
                    history[0].noWrong = history[0].noWrong + 1
                }
            })
        }
    };

    getHistory = () => {
        let history = this.realm.objects("History");
        console.log('history', history);
        let arr = history.map(item => {
            return {
                number: item.number,
                word: item.word,
                noRight: item.noRight,
                noWrong: item.noWrong
            }
        });
        console.log('arr', arr);
        return arr;
    };

    capture = () => {
        this.refs.viewShot.capture().then(uri => {
            ImageResizer.createResizedImage(uri, 32, 32, 'PNG', 100, 0, null).then((response) => {
                this.setState({imageUri: uri});
                this.classifyImage(this.state.imageUri).then();
            }).catch((err) => {
                console.log('resize', err)
            });
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
        let sound_link = '';
        // if (this.state.number){
        //     sound_link = '../Voices/' + this.state.number + '.mp3'
        // } else {
        sound_link = '../Voices/9250.mp3'
        // }

        console.log('number', `../Voices/${this.state.number}.mp3`);

        // let filt = require('')

        const sound = new Sound(`audio_${this.state.number}.mp3`, Sound.MAIN_BUNDLE, error => callback(error, sound));
    };

    showAlertResult = (visible) => {
        this.setState({modal: visible})
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
                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 30,
                                height: 30,
                                marginLeft: 5
                            }} onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name={'ios-menu'} style={{color: 'white'}}/>
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
                            <Text style={{color: 'black', fontSize: 30, marginTop: 30}}>{this.state.name}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text>{this.state.pronounciation}</Text>
                                <Image style={{width: 15, height: 15, marginLeft: 5, tintColor: 'black'}}
                                       source={Images.icSound}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: 'red', width: size, height: size, marginTop: 10}}>
                    <ViewShot options={{format: "png", quality: 1.0}} ref="viewShot">
                        <View style={{backgroundColor: 'red', width: size, height: size, borderWidth: 1}}>
                            <SketchCanvas
                                ref={"canvas"}
                                style={{flex: 1, backgroundColor: 'black'}}
                                strokeColor={'white'}
                                // onStrokeStart={this.cancelTimeout}
                                // onStrokeEnd={this.autoCapture}
                                strokeWidth={10}
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
                <Modal
                    visible={this.state.modal}
                    onRequestClose={() => {

                    }}>
                    <TouchableOpacity style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} activeOpacity={1}>
                        <View style={{width: '70%', backgroundColor: 'white', borderRadius: 5, alignItems: 'center'}}>
                            <Image source={this.state.isRight ? Images.right : Images.wrong}
                                   style={{width: 50, height: 50, margin: 20}}/>
                            <Text>{this.state.isRight ? 'Congratulation' : 'Sorry! You are wrong'}</Text>
                            {
                                this.state.isRight &&
                                <TouchableOpacity style={{
                                    margin: 10,
                                    width: '90%',
                                    borderRadius: 5,
                                    backgroundColor: 'red',
                                    alignItems: 'center',
                                    padding: 10
                                }}>
                                    <Text style={{color: 'white'}}>Edit</Text>
                                </TouchableOpacity>
                            }
                            <TouchableOpacity style={{
                                margin: 10,
                                width: '90%',
                                borderRadius: 5,
                                backgroundColor: '#376a3d',
                                alignItems: 'center',
                                padding: 10
                            }}>
                                <Text style={{color: 'white'}}>Okay</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
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
