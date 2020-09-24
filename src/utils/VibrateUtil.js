/*
Controle de vibrações dentro do app
*/
import {Vibration} from 'react-native';
export function VibrarNaTrocaDeTela(duration)
{
    Vibration.vibrate(duration);
}

export default {VibrarNaTrocaDeTela};
