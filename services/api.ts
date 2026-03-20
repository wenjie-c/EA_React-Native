import { Platform } from 'react-native';

const getBaseUrl = () => {
    const physicalDeviceIP = '192.168.1.22';

    if (Platform.OS === 'android') {
        return `http://${physicalDeviceIP}:1337`;
        // 10.0.2.2 és l'adreça especial per accedir al localhost de l'ordinador des de l'emulador d'Android
        // return `http://10.0.2.2:1337`;
    } else if (Platform.OS === 'ios') {
        return `http://${physicalDeviceIP}:1337`;
    } else {
        return 'http://localhost:1337';
    }
};

export const API_BASE_URL = getBaseUrl();
