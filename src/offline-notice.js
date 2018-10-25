import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import OfflineNoticeBar from './offline-notice-bar';

class OfflineNotice extends Component {

    state = {
        isConnected = true
    }


    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivity)

    }

    handleConnectivity = isConnected => {
        this.setState({ isConnected: isConnected });
    }

    render() {
        return !this.state.isConnected ? <OfflineNoticeBar /> : null
    }


}

export default OfflineNotice;
