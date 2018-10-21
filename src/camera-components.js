import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ComponentsCamera = props => (
    <View style={styles.containerCamera}>
        <TouchableOpacity style={styles.bottonCamera} onPress={this.flashEvent}>
            <Text style={styles.textButtonCamera}> Flash : {this.state.flash}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottonCamera} onPress={this.typeEvent}>
            <Text style={styles.textButtonCamera}> Camera : {this.state.type}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottonCamera} onPress={this.balanceEvent}>
            <Text style={styles.textButtonCamera}> Balance : {this.state.whiteBalance}</Text>
        </TouchableOpacity>
    </View>
);

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

const styles = StyleSheet.create({
    containerCamera: {
        flex: 0.5,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    bottonCamera: {
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
    textButtonCamera: {
        color: '#fff',
        fontSize: 14,
    },
});

export default ComponentsCamera;
