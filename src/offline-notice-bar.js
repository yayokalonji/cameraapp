import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const OfflineNoticeBar =
    props => (
        <View style={styles.offlineContainer} >
            <Text style={styles.text}>No tienes conexion a internet</Text>
        </View>
    );

    const styles = StyleSheet.create ({
        offlineContainer : {
            backgroundColor : '#b52424',
            height : 30,
            width,
            justifyContent : 'center',
            alignItems : 'center',
            flexDirection : 'row',
            position : 'absolute',
            top: 30
        },
        text : {
            color : '#fff'
        }
    })

export default OfflineNoticeBar;
