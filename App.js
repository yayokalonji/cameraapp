import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Slider } from 'react-native';
import { RNCamera } from 'react-native-camera';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off'
};

const whiteBalanceOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto'
}
export default class CameraScene extends Component {

  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '4:3',
    showGallery: false,
    photos: [],
    recordOptions: {
      mute: false,
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality["288p"]
    },
    isRecording: false
  }

  cameraRender = () => {
    <RNCamera ref={ref => { this.camera = ref; }} style={styles.camera} type={this.state.type}
      flashMode={this.state.flash} autoFocus={this.state.autoFocus} zoom={this.state.zoom}
      whiteBalance={this.state.whiteBalance} focusDepth={this.state.depth}
      permissionDialogTitle={'Permiso para usar la camara'}
      permissionDialogMessage={'Necesitas el permiso para usar la camara'}>
      <View style={styles.containerCamera}>
        <TouchableOpacity style={styles.botton} onPress={this.flashEvent}>
          <Text style={styles.textButton}> Flash : {this.state.flash}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botton} onPress={this.typeEvent}>
          <Text style={styles.textButton}> Camera : {this.state.type}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botton} onPress={this.balanceEvent}>
          <Text style={styles.textButton}> Balance : {this.state.whiteBalance}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerControls}>
        <Slider
          value={this.state.zoom}
          onValueChange={zoom => this.setState({ zoom })}
        />
      </View>
    </RNCamera>

  }
  flashEvent = () => {
    this.setState({
      flash: flashModeOrder[
        this.state.flash
      ]
    });
  }

  typeEvent = () => {
    this.setState({
      type: this.state.type == 'front' ? 'back' : 'front'
    });
  }

  balanceEvent = () => {
    this.setState({
      whiteBalance: whiteBalanceOrder[this.state.whiteBalance]
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.cameraRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#333'
  },
  camera: {
    flex: 1
  },
  containerCamera: {
    flex: 0.5,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  botton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8
  },
  textButton: {
    color: '#fff',
    fontSize: 14,
  },
  slider: {
    width: 300,
  },
  containerControls: {
    flex: 0.5,
    flexDirection: 'row',
    alignSelf: 'flex-end'
  }
});