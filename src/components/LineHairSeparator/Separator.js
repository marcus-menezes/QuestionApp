import React from 'react';

import {StyleSheet } from 'react-native';

import {COLORS} from '../../constants/colors';
import { View } from 'react-native';
import PropTypes from 'prop-types';

export default class Separator extends React.Component 
{
    onPressPositive = () => { this.props.onPressPositive(); };

    render()
    {
        return(
            <View style={[styles.separator,{backgroundColor:this.props.Color !== undefined ?this.props.Color : COLORS.PRETO_APP }]} />
        )
    }
}

Separator.propTypes = {    
    Color: PropTypes.string
}

const styles = StyleSheet.create({
    separator:
    {
        height: StyleSheet.hairlineWidth
        , backgroundColor: COLORS.PRETO_APP
        , marginVertical: '3%'
    }
})