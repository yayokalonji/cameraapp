import React, { Component } from 'react';
import { View, Text, Button,Image} from 'react-native';

class HomeScene extends Component {

    state = { result: {} };

    onResult = data => {
        this.setState({
            result: data
        });
        console.log(data);
    };

    render() {
        const { navigation } = this.props;
        return (
            <View>
                <Text> Home :) </Text>
                <Button title="Abrir Camara" onPress={() => navigation.navigate('CameraScreen', { onResult: this.onResult })}></Button>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                />
            </View>
        );
    }
}

export default HomeScene;
