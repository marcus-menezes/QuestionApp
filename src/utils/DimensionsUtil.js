/*
Controle de Dimensões dentro do app
Ex.: ReturnDimensions().width = Number
Ex.: ReturnDimensions().height = Number
*/
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window')

export function ReturnDimensions()
{
    const DispositiveDimensions = {height:height, width: width}

    return DispositiveDimensions
}

export default {ReturnDimensions};
