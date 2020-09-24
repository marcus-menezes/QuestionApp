import React, { useEffect } from 'react';
import { request, PERMISSIONS } from 'react-native-permissions';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal'

import {
View,
Text,
TouchableOpacity,
TextInput,
Platform,
StyleSheet,
StatusBar,
Dimensions,
Image,
Alert,
Animated
} from 'react-native';
import { COLORS } from '../../../constants/colors'

import { AuthContext } from '../../../context/context';

import Loading from '../../../components/StandardActivityIndicator/Loading'

import Random from 'random-id';

import DefaultConfirmButton2 from '../../../components/DefaultConfirmButton/DefaultConfirmButton2';

const { height, width } = Dimensions.get('window')


const SignInScreen = ({ navigation }) => {

    useEffect(() => {
        request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then((result) => {

        });
    }, [])

    const [data, setData] = React.useState({
        username: ''
    });

    const [isModalVisible, setIsModalVisible] = React.useState(false)

    const [isError, setError] = React.useState(false)
    const [TextError, setTextError] = React.useState('')


    const { signIn } = React.useContext(AuthContext);


    const textInputChange = (val) => {
            setData({
                ...data,
                username: val
            });
    }


    const getUser = async (userName) => {
        
        let foundUser = []
        
        setIsModalVisible(true)
        console.log(userName)
        foundUser = {
            userToken: Random(10),
            username: userName
        }
        
        signIn(foundUser);

        setIsModalVisible(false)
    }

    const loginHandle = (userName) => {

    
        if (data.username.length == 0) 
        {
            setError(true)
            setTextError('Usuário não podem ser vazio.')
            setTimeout(() => { setError(false) }, 2000) 
        }
        else
        {
            if(data.username.length <= 3)
            {
                setError(true)
                setTextError('Nome deve conter 3 carcteres ou mais.')
                setTimeout(() => { setError(false) }, 2000) 
                
            }
            else
            {
                let foundUser;
                foundUser = getUser(userName)
            }
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={ COLORS.ROXO_APP} barStyle="light-content" />


            <View style={styles.footer}>

            <Image source={require( "../../../assets/q.png")} style={{width: 60, height: 60, marginBottom:'5%', borderRadius:10, alignSelf:'center'}}/>
            <Animated.Text style={{alignSelf: 'center', color:COLORS.BRANCO_APP, fontSize:30, marginBottom:'10%'}}>QUESTION APP</Animated.Text>

                {/* Card Usuário */}
                <View style={styles.card}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 }}>

                        <FontAwesome name="user-o" color={'#000'} size={20} style={{ paddingHorizontal: 5 }} />

                        <TextInput
                            style={{ color: '#05375a', flex: 1 }}
                            placeholder="Nome"
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                        />

                        {
                            data.check_textInputChange
                                ?
                                <Animatable.View animation="bounceIn">
                                    <Feather name="check-circle" color="green" size={20} style={{ paddingHorizontal: 5 }} />
                                </Animatable.View>
                                : null
                        }


                    </View>
                </View>


                <View style={styles.button}>
                    <DefaultConfirmButton2
                        useNativeDriver={true}
                        TextAnimation={'zoomIn'}
                        TitleText={"Entrar"}
                        Icon={'log-in'}
                        isLoading={isModalVisible}
                        isError={isError}
                        TextError={TextError}
                        onPressPositive={() => {loginHandle(data.username)}}
                    />
                </View>
                    

                {/* Modal de confirmação */}
                <Modal isVisible={isModalVisible}>
                    <View style={{ height: height * 0.10, width: width * 0.30, alignSelf: 'center', backgroundColor: '#c', borderRadius: 40 }}>
                        <Loading />
                    </View>
                </Modal>

            </View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container:
    {
        flex: 1
        , backgroundColor:  COLORS.ROXO_APP
    },
    header:
    {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer:
    {
        flex: 1
        , justifyContent: 'center'
        , paddingHorizontal:'4%'
    },
    text_header:
    {
        color: '#fff'
        
        , fontSize: 30
    },
    text_footer:
    {
        color: '#05375a'
        , fontSize: 18
    },
    buttonContainer:
    {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        width: width * 0.80,
        borderRadius: 50,
        borderWidth: 0.7,
        borderColor: '#FFF'

    },
    action:
    {
        flexDirection: 'row'
        , backgroundColor: '#FFF'
        , borderTopRightRadius: 10
        , borderTopLeftRadius: 10
        , borderBottomLeftRadius: 10
        , borderBottomRightRadius: 10
        , marginTop: 10
        , borderBottomWidth: 1
        , borderBottomColor: '#f2f2f2'
        , alignItems: 'center'
        , paddingHorizontal: 5
        , paddingBottom: 5
        , alignContent: "center"
        , justifyContent: "center"
        , alignSelf: "center"
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        
    },
    errorMsg: {
        color: '#FFF',
        fontSize: 10,
        paddingVertical: 5,
        alignSelf: 'center'
        
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        
    }
    ,
    card: {

        shadowColor: '#00000021',
        shadowOffset: {
            width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 5,
        backgroundColor: "#FFF",
        borderColor: '#4739ea',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: 5,
        marginRight: 5,
        marginLeft: 5,
        

    },

});