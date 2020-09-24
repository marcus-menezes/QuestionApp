import React from 'react';
import PropTypes from "prop-types";
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import {
    StyleSheet
    ,Text
    ,TouchableOpacity
    ,ActivityIndicator
    ,View
    ,Dimensions
} from 'react-native';

import {COLORS} from '../../constants/colors';

const { height, width } = Dimensions.get('window')

export default class DefaultConfirmButton2 extends React.Component 
{
    onPressPositive = () => { this.props.onPressPositive(); };

    insidebutton = () => 
    {
        if(this.props.isLoading )
        {
            return(
                <View>
                    <ActivityIndicator size="small" color="#000" ></ActivityIndicator>
                </View>
            ) 
        }
        else
        {
            if (this.props.isError)
            {
                return( 
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.TextErrorStyle}>
                        {this.props.TextError}
                        </Text>
                        <Feather name="alert-circle" color="white" size={20} />
                    </View>
                )
            }
            else
            {
                return( 
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.text}>
                            {this.props.TitleText}
                        </Text>
                        <Feather name={this.props.Icon} color="black" size={20} />
                    </View>
                )
            }
        }
    }

    render()
    {        
        return(
            <TouchableOpacity disabled={this.props.isLoading? true : this.props.Disabled} style={this.props.Disabled ? styles.disabledButton : this.props.isError ? styles.ButtonError : styles.Button} onPress={this.onPressPositive}>                
                <Animatable.View animation={this.props.TextAnimation} useNativeDriver={this.props.useNativeDriver?? true}>                    
                {this.insidebutton()}   
                </Animatable.View>
            </TouchableOpacity>
        )
    }
}

DefaultConfirmButton2.propTypes = {    
    TitleText: PropTypes.string
    ,Icon: PropTypes.string
    ,TextAnimation: PropTypes.string
    ,useNativeDriver: PropTypes.bool
    ,Disabled: PropTypes.bool
    ,isLoading: PropTypes.bool
    ,isError: PropTypes.bool
    ,TextError: PropTypes.string
    ,onPressPositive : PropTypes.func    
}

const styles = StyleSheet.create({
    text:
    {
        color:COLORS.PRETO_APP
        ,fontSize:20
        ,marginRight:10
        
    }
    ,TextErrorStyle:
    {
        color:'white'
        ,fontSize:18
        ,textAlign:'center'
        ,padding: '3%'
    }
    ,Button:
    {
        alignSelf:'center'
        ,backgroundColor:COLORS.BRANCO_APP
        ,paddingVertical:'2%'
        ,borderRadius:5
        ,height: height*0.06
        ,width: width*0.85
        ,justifyContent:'center'
        ,alignItems:'center'
        ,flexDirection: 'row'
    }
    ,disabledButton:
    {
        alignSelf:'center'
        ,backgroundColor:COLORS.CINZAINPUT_APP
        ,paddingVertical:'2%'
        ,borderRadius:5
        ,height: height*0.06
        ,width: width*0.85
        ,justifyContent:'center'
        ,alignItems:'center'
        ,flexDirection: 'row'
        ,opacity: 1
    }
    ,ButtonError:
    {
        alignSelf:'center'
        ,backgroundColor:'red'
        ,paddingVertical:'2%'
        ,borderRadius:5
        ,height: height*0.06
        ,width: width*0.85
        ,justifyContent:'center'
        ,alignItems:'center'
        ,flexDirection: 'row'
    }
})