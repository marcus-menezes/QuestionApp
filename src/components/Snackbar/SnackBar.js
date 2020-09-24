import PropTypes from "prop-types";
import React from 'react';
import { Dimensions, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Snackbar } from 'react-native-paper';
import { COLORS } from '../../constants/colors';

const { height, width } = Dimensions.get('window')

export default class SnackBar extends React.Component {

  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      return ({
        Visible: nextProps.Visible,
        Erro: nextProps.Erro,
        onDismissSnackBar: nextProps.onDismissSnackBar
      })
    }
  }

  render() {
    return (
      <Animatable.View animation="fadeInUp" duration={1000} useNativeDriver={true}>
        <Snackbar
          visible={this.props.Visible}
          onDismiss={this.props.onDismissSnackBar}
          duration={3000}          
          style={{ backgroundColor: 'red', zIndex:2}}>
          <Text style={{ fontSize:14,textAlign: 'justify'}}>{this.props.Erro}</Text>
        </Snackbar>


      </Animatable.View>
    )
  }
}

Snackbar.propTypes = {
  Visible: PropTypes.bool
  , Erro: PropTypes.string
  , onDismissSnackBar: PropTypes.func
}
