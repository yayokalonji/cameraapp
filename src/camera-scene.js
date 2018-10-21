import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
import { RNCamera } from 'react-native-camera';

const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off'
}

const whiteBalanceOrder = {
    auto: 'sunny', //soleado
    sunny: 'cloudy',
    cloudy: 'shadow',
    shadow: 'incandescent',
    incandescent: 'auto'
}

export default class CameraScene extends Component {

    //Opciones de la Camara
    state = {
        flash: 'off',
        zoom: 0,
        autoFocus: 'on', //enfoque
        depth: 0,
        type: 'back',
        whitBalance: 'auto',
        ratio: '4:3', //tamano
        // photoId:
        showGallery: false, //ver galeria
        photos: [], //arreglo de fotos
        recorOptions: {
            mute: false,
            maxDuration: 20, //Duracion del video de grabacion
            quality: RNCamera.Constants.VideoQuality["288p"]
        },
        isRecording: false
    }

    flashEvent = () => {
        this.setState({
            flash: flashModeOrder[this.state.flash]
        });
    }
    typeEvent = () => {
        this.setState({
            type: this.state.type == 'front' ? 'back' : 'front' //para esto podemos crear la constante como la hicimos para el flash
        });
    }

    balanceEvent = () => {
        this.setState({
            whitBalance: whiteBalanceOrder[this.state.whitBalance]
        });
    }

    zoomEvent = ({ value }) => {
        this.setState({
            zoom: value
        });
    }

    textRecognizedEvent = ({ text }) => {
        console.log(textBlocks);
    }

    barcodeReadEvent = ({ data, type }) => {
        console.log('data');
        console.log('type');
    }

    takePhotoEvent = ({ data, type }) => {
        if (this.camera) {
            const options = { quality: 0.5, base64: false, width: 300, doNotSave: false };
            this.camera.takePictureAsync(options)
                .then(data => {
                    console.log('picture: ', data);
                    this.goBackPreviewScreen(data)
                });
        }
    }

    goBackPreviewScreen(data) {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.onResult(data)
    }

    recordVideoEvent = async () => {
        if (this.camera) {
            if (this.state.isRecording) {
                await this.camera.stopRecording();
            } else {
                this.setState({
                    isRecording: true
                });
                this.camera.recordAsync(this.state.recorOptions)
                    .then(data => {
                        this.setState({ isRecording: false });
                        console.log('video', data);
                    });
            }
        }
    }

    cameraRender = () => {
        return (
            <RNCamera
                ref={
                    ref => {
                        this.camera = ref;
                    }
                }
                style={style.camera}
                type={this.state.type}
                flashMode={this.state.flash}
                autoFocus={this.state.autoFocus}
                zoom={this.state.zoom}
                whitBalance={this.state.whitBalance}
                focusDepth={this.state.depth}
                /* onTextRecognized = {this.textRecognizedEvent}*/
                onBarCodeRead={this.barcodeReadEvent}
                permissionDialogTitle={"Permiso para usar la camara"}
                permissionDialogMessage={"Necesitas el permiso para usar la camara "}
            >
                <View style={style.containerCamera}>
                    <TouchableOpacity
                        style={style.button}
                        onPress={this.flashEvent}
                    >
                        <Text style={style.textButton}>
                            Flash : {this.state.flash}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.button}
                        onPress={this.typeEvent}
                    >
                        <Text style={style.textButton}>
                            Type : {this.state.type}
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.button}
                        onPress={this.balanceEvent}
                    >
                        <Text style={style.textButton}>
                            Balance : {this.state.whitBalance}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={style.containerZoom}>
                    <Slider style={style.slider}
                        step={0.1}
                        maximumValue={1}
                        onValueChange={this.zoomEvent}
                    />
                </View>
                <View style={style.containerControls}>
                    <TouchableOpacity
                        style={style.button}
                        onPress={this.takePhotoEvent}
                    >
                        <Text style={style.textButton}>
                            Tomar Foto
                  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.button}
                        onPress={this.recordVideoEvent}
                    >
                        <Text style={style.textButton}>
                            {
                                this.state.isRecording ? 'Grabando' : 'Grabar'
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </RNCamera>
        );
    }


    render() {
        return (
            <View style={style.container}>
                {this.cameraRender()}
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#000'
    },
    camera: {
        flex: 1
    },
    containerCamera: {
        flex: 0.5,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: 'red'
    },

    button: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderColor: '#fff',
        borderRadius: 8
    },

    textButton: {
        color: '#fff',
        fontSize: 14
    },

    containerZoom: {
        flex: 0.3,
        borderWidth: 1,
        borderColor: 'red',
        flexDirection: 'row'

    },
    containerControls: {
        flex: 0.2,
        //borderWidth: 1,
        // borderColor: 'red',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    slider: {
        width: 200
    }

});

