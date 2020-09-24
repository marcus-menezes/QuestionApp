import React from 'react';

import {StyleSheet } from 'react-native';

import {COLORS} from '../../constants/colors';
import { ActivityIndicator } from 'react-native';

export default class Loading extends React.Component 
{
    onPressPositive = () => { this.props.onPressPositive(); };

    render()
    {
        return(
            <ActivityIndicator color={COLORS.ROXO_APP} style={styles.Loading}/>
        )
    }
}

Loading.propTypes = {    
    
}

const styles = StyleSheet.create({
    Loading:{
        marginTop:'5%'
        ,alignSelf:'center'
    }
})