import { Platform } from 'react-native';

const getBaseUrl = () => {
    const physicalDeviceIP = '192.168.1.22';

    if (Platform.OS === 'android') {
        return `http://${physicalDeviceIP}:1337`;
    } else if (Platform.OS === 'ios') {
        return `http://${physicalDeviceIP}:1337`;
    } else {
        return 'http://localhost:1337';
    }
};

export const API_BASE_URL = getBaseUrl();
