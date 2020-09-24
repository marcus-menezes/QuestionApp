import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DefaultConfirmButton from '../../../components/DefaultConfirmButton/DefaultConfirmButton';
import Separator from '../../../components/LineHairSeparator/Separator';
import SnackBar from '../../../components/Snackbar/SnackBar';
import Loading from '../../../components/StandardActivityIndicator/Loading';
import { COLORS } from '../../../constants/colors';
import { GetQuiz, GetAnwserQuiz } from '../../../utils/AsyncUtil';
import moment from 'moment';
require('moment/locale/pt-br.js');


const { height, width } = Dimensions.get('window')

export const HomeScreen = ({ navigation, route }) => {

    //Erros
    const [ErrorMessageText, setErrorMessageText] = React.useState('')
    const [SnackbarVisibility, setSnackbarVisibility] = React.useState(false)

    //Referências
    const ScrollViewRef = useRef(null);
    const [ScrollY, SetScrollY] = React.useState(new Animated.Value(0))

    //Questionarios
    const [Questionarios, setQuestionarios] = React.useState([])
    const [QuestionariosLoading, setQuestionariosLoading] = React.useState(true)

    const onDismissSnackBar = () => { setSnackbarVisibility(false) }

    useEffect(() => { GetJoberBudgets() }, [])

    const GetJoberBudgets = async () => {
        let response = await GetQuiz()

        if(response != null)
        {
        setQuestionarios(response)
        setQuestionariosLoading(false)
        }
        else
        {
            setTimeout(() => { setQuestionariosLoading(false) }, 2000) 
        }

    }

    const NavigateToQuestions = (item) => {
        navigation.navigate('AnwserForm', { Quiz: item })
    }

    const NavigateToInsertQuestions = () => {
        navigation.navigate('InsertForm')
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // The screen is focused
          // Call any action
          GetJoberBudgets()
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor={COLORS.ROXO_APP} barStyle="light-content" />

                <Image source={require( "../../ ../../../assets/q.png")} style={{width: 40, height: 40, marginBottom:'5%', marginTop:'5%', borderRadius:10, alignSelf:'center'}}/>
                <Animated.Text style={{alignSelf: 'center', color:COLORS.BRANCO_APP, fontSize:20, marginBottom:'5%'}}>QUESTION APP</Animated.Text>

                <Animatable.View animation="fadeInUpBig" useNativeDriver={true} style={styles.footer}>

                    <Animated.ScrollView
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: ScrollY } } }])}
                        showsVerticalScrollIndicator={false}
                        ref={ScrollViewRef}
                        style={{ marginBottom: '5%' }} >
                        {
                            QuestionariosLoading
                                ?
                                <View style={{ marginTop: '2%' }}>
                                    <Loading />

                                </View>
                                :
                                <View style={{ marginTop: '5%' }}>
                                    {
                                        Questionarios.length > 0 ?
                                            Questionarios.map(item => {
                                                return (
                                                    <Animatable.View animation="flipInX" useNativeDriver={true}>
                                                        <TouchableOpacity onPress={() => NavigateToQuestions(item)}>
                                                        <Animated.Text style={styles.BudgetTitle}>{item.Titulo}</Animated.Text>
                                                        <View style={{flexDirection:"row", alignItems:'center', justifyContent:'space-between'}}>
                                                            <Animated.Text style={styles.Budgetuser}>{item.Username}</Animated.Text>
                                                            <Animated.Text style={styles.Budgetuser}>
                                                                {moment(item.DataCadastrolet).format("DD ")}de 
                                                                {moment(item.DataCadastrolet).format(" MMMM YYYY")}
                                                            </Animated.Text>                               
                                                        </View>    
                                                        </TouchableOpacity>
                                                        <Separator />
                                                    </Animatable.View>
                                                )
                                            })
                                            :
                                            
                                            <Text style={styles.BudgetTitle}>Você ainda não possui nenhum Questionário!</Text>
                                    }
                                </View>
                        }
                        <Animatable.View animation={'zoomIn'} duration={3000} useNativeDriver={true} style={{ margin: '10%' }}>
                            <DefaultConfirmButton
                                useNativeDriver={true}
                                TextAnimation={'zoomIn'}
                                TitleText={"Cadastrar questionário"}
                                Icon={'plus'}
                                // isLoading={}
                                isError={SnackbarVisibility}
                                TextError={'Erro'}
                                onPressPositive={NavigateToInsertQuestions}
                            />
                        </Animatable.View>
                    </Animated.ScrollView>
                </Animatable.View>
            </View>

            <SnackBar
                Erro={ErrorMessageText}
                Visible={SnackbarVisibility}
                onDismissSnackBar={onDismissSnackBar}
            />

        </>
    );
};

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: COLORS.ROXO_APP
    },
    header:
    {
        flex: 0.5,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer:
    {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,

    },
    text_header:
    {
        color: '#fff'
        , fontSize: 25
        , alignSelf: 'center'
    },
    text_footer:
    {
        color: COLORS.ROXO_APP,
        fontSize: 18
    },
    action:
    {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput:
    {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        fontSize: 12,
        color: COLORS.ROXO_APP,
    },
    button:
    {
        alignItems: 'center',
        marginTop: 50
    },
    signIn:
    {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    errorMsg: {
        color: COLORS.VERMELHO_APP,
        fontSize: 11,
        paddingVertical: 5,
        alignSelf: 'center'
        , textAlign: 'center'
    },
    textSign:
    {
        fontSize: 18,
    },
    textPrivate:
    {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
        , alignItems: 'center'
        , justifyContent: 'center',

    }
    , color_textPrivate:
    {
        color: 'grey',
    }
    , avatarContainer:
    {
        borderColor: '#9B9B9B'
        , borderWidth: 1
        , justifyContent: 'center'
        , alignItems: 'center'
        , marginTop: '20%'
    }
    , avatar:
    {
        borderRadius: 40
        , width: 75
        , height: 75
    }, cardContent:
    {
        alignItems: 'center'
        , textAlignVertical: 'center'
        , marginTop: 10
        , minHeight: height / 5
        , maxWidth: width * 0.7
    }
    , image:
    {
        width: 50
        , height: 50
    }
    , description:
    {
        fontSize: 10
        , color: COLORS.PRETO_APP
    }
    , Title: { fontSize: 18, textAlign: 'center', color: COLORS.PRETO_APP, marginTop: '5%', marginBottom: '10%' }
    , Subtitletext: { color: COLORS.PRETO_APP, marginTop: '5%', alignSelf: 'center' }
    , SubcategoryText: { color: COLORS.PRETO_APP, fontSize: 10, marginTop: '5%' }
    , BudgetTitle: { color: COLORS.ROXO_APP, marginVertical:'5%',alignSelf: 'center', fontWeight: 'bold', fontSize:13 }
    , Budgetuser: { color: COLORS.ROXO_APP, alignSelf: 'center'}

});
