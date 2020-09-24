import Random from 'random-id';
import React, { useEffect, useRef } from 'react';
import {
    Animated, Dimensions,

    Platform,

    StatusBar,
    StyleSheet,
    Text,
    TextInput,

    TouchableOpacity, View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DefaultConfirmButton from '../../../components/DefaultConfirmButton/DefaultConfirmButton';
import SnackBar from '../../../components/Snackbar/SnackBar';
import { COLORS } from '../../../constants/colors';
import { GetUserID, SetQuiz, GetUserName, GetQuiz } from '../../../utils/AsyncUtil';
import moment from 'moment';

const { height, width } = Dimensions.get('window')

export const InsertForm = ({ navigation, route }) => {

    const [data, setData] = React.useState({
        name: ''
        , check_textInputNameChange: false
        , Question: ''
        , check_textInputQuestionChange: false
    });

    const [Perguntas, setPerguntas] = React.useState([])

    const [loading, setloading] = React.useState(false)

    const [ErrorMessageText, setErrorMessageText] = React.useState('')

    const [SnackbarVisibility, setSnackbarVisibility] = React.useState(false)

    const [Titulo, setTitulo] = React.useState('')

    const [TitleAnimation, setTitleAnimation] = React.useState('fadeIn')

    const ScrollViewRef = useRef(null);

    const [ScrollY, SetScrollY] = React.useState(new Animated.Value(0))

    useEffect(() => {
        if (data.name.length >= 5) {
            setData({ ...data, check_textInputNameChange: true });
        }
        else {
            setData({ ...data, check_textInputNameChange: false });
        }

    }, [data.name])

    useEffect(() => {
        if (data.Question.length > 5) {
            setData({ ...data, check_textInputQuestionChange: true });
        }
        else {
            setData({ ...data, check_textInputQuestionChange: false });
        }
    }, [data.Question])

    useEffect(() => {

        if (ScrollViewRef !== null) {
            ScrollViewRef.current.scrollToEnd({ animated: true, duration: 500 })
        }

    }, [Perguntas.length])


    const textInputNameChange = (val) => {
        setData({ ...data, name: val });
    }

    const textInputQuestionChange = (val) => {
        setData({ ...data, Question: val });
    }

    const AdicionarPergunta = () => {

        let PerguntasArray = Perguntas

        let NewQuestion = {
            "Id": PerguntasArray.length + 1
            , "Pergunta": replaceAll(data.Question.trim(), '?', '') + '?'
        }

        PerguntasArray.push(NewQuestion)

        setPerguntas(PerguntasArray)

        setData({ ...data, Question: '' })
    }

    const RemoverPerguntas = (id) => {
        let PerguntasArray = Perguntas

        let filteredAry = PerguntasArray.filter(item => item.Id !== id)

        setPerguntas(filteredAry)
    }

    function replaceAll(string, search, replace) {
        return string.split(search).join(replace);
    }

    const AdicionarTitulo = () => {
        setTitulo(data.name)
    }

    const HandleQuestionSubmit = () => {
        if (data.Question.length >= 5) {
            AdicionarPergunta()
        }
    }

    const HandleTitleSubmit = () => {
        if (data.check_textInputNameChange) {
            AdicionarTitulo()
        }
    }


    const onDismissSnackBar = () => {
        setSnackbarVisibility(false)
    }


    const NoBudgetTitleJsx = () => {
        return (
            <Animatable.View animation={TitleAnimation} useNativeDriver={true} style={{ marginTop: '5%' }}>

                <Text style={styles.text_footer}>Título</Text>
                <View style={styles.action}>
                    <FontAwesome name="plus" color="black" size={20} />

                    <TextInput
                        placeholder="Deve conter no mínimo 5 caracteres."
                        style={styles.textInput}
                        autoCapitalize="none"
                        value={data.name}
                        onChangeText={(val) => textInputNameChange(val)}
                        onSubmitEditing={HandleTitleSubmit}
                        blurOnSubmit={false}
                    />

                    {
                        data.check_textInputNameChange
                            ?
                            <TouchableOpacity onPress={AdicionarTitulo}>
                                <Feather name="check" color="black" size={20} />
                            </TouchableOpacity>
                            :
                            <Animatable.View useNativeDriver={true} animation="bounceIn">
                                <Feather name="x-circle" color="red" size={20} />
                            </Animatable.View>
                    }
                </View>
            </Animatable.View>

        )
    }

    const SubmitBudgetConfig = async () => {

        if (Perguntas.length >= 3) {

            let PerguntasArray = []
            Perguntas.forEach(element => { PerguntasArray.push(element.Pergunta) });

            let quiz = await GetQuiz()

            let request = {
                "Username": await GetUserName(),
                "Perguntas": PerguntasArray,
                "Titulo": Titulo,
                "IdUser": await GetUserID(),
                "IdQuiz": Random(10),
                "DataCadastro": moment()
            }

            let arrayquiz = []
            if (quiz != null) {
                quiz.forEach(element => {
                    arrayquiz.push(element)
                });
                arrayquiz.push(request)
                SetQuiz(arrayquiz)
            }
            else
            {
                arrayquiz.push(request)
                SetQuiz(arrayquiz)            
            }

            navigation.goBack()
            setTitulo('')
            setPerguntas([])
        }
        else {
            setErrorMessageText('O questionário deve conter no mínimo 3 perguntas.')
            setSnackbarVisibility(true)
        }
        
    }

    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor={COLORS.ROXO_APP} barStyle="light-content" />

                <Animated.View style={[styles.header, {}]}>
                    <Animated.Text style={[styles.text_header,
                    {
                        color: ScrollY.interpolate({
                            inputRange: [1, 100],
                            outputRange: [COLORS.BRANCO_APP, COLORS.VERDE_APP],
                            extrapolate: 'clamp'
                        })
                        , fontSize: ScrollY.interpolate({
                            inputRange: [1, 100],
                            outputRange: [25, 20],
                            extrapolate: 'clamp'
                        }),

                    }
                    ]}>Cadastrar questionário</Animated.Text>
                </Animated.View>

                <Animatable.View animation="fadeInUpBig" useNativeDriver={true} style={styles.footer}>

                    <Animated.ScrollView
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: ScrollY } } }])}
                        showsVerticalScrollIndicator={false}
                        ref={ScrollViewRef}
                        style={{ marginBottom: '5%' }} >
                        {

                            Titulo.length === 0 ? NoBudgetTitleJsx()
                                :
                                <View style={{ marginTop: '5%' }}>
                                    <View style={[styles.action, { justifyContent: 'space-between' }]}>
                                        <Text style={styles.text_footer}>{Titulo}</Text>
                                    </View>

                                    <View style={{ marginTop: '5%' }}>
                                        <Text style={styles.text_footer}>Perguntas do seu questionário</Text>
                                        {
                                            Perguntas.map(item => {
                                                return (
                                                    <Animatable.View animation={'fadeIn'} duration={1500} useNativeDriver={true} style={[styles.action, { justifyContent: 'space-between' }]}>
                                                        <Text>{item.Pergunta}</Text>

                                                        <TouchableOpacity onPress={() => RemoverPerguntas(item.Id)}>
                                                            <Animatable.View useNativeDriver={true} animation="bounceIn">
                                                                <Feather name="trash-2" color="red" size={20} />
                                                            </Animatable.View>
                                                        </TouchableOpacity>
                                                    </Animatable.View>
                                                )
                                            })
                                        }
                                    </View>

                                    <Animatable.View animation={'zoomIn'} duration={1000} useNativeDriver={true} style={{ margin: '10%' }}>
                                        <DefaultConfirmButton
                                            useNativeDriver={true}
                                            TextAnimation={'zoomIn'}
                                            TitleText={"Salvar"}
                                            Icon={'arrow-right-circle'}
                                            isLoading={loading}
                                            isError={SnackbarVisibility}
                                            TextError={'Erro'}
                                            onPressPositive={SubmitBudgetConfig}
                                        />
                                    </Animatable.View>
                                </View>

                        }



                    </Animated.ScrollView>

                    {
                        Titulo.length > 0 &&

                        <Animatable.View animation={'fadeInUp'} useNativeDriver={true} duration={1000} style={styles.action}>
                            <FontAwesome name="question" color={COLORS.ROXO_APP} size={20} />

                            <TextInput
                                placeholder="Descreva a pergunta."
                                style={styles.textInput}
                                autoCapitalize="sentences"
                                value={data.Question}
                                onChangeText={(val) => textInputQuestionChange(val)}
                                blurOnSubmit={false}
                                onSubmitEditing={HandleQuestionSubmit}
                            />

                            {
                                data.check_textInputQuestionChange
                                    ?
                                    <TouchableOpacity onPress={AdicionarPergunta}>
                                        <Animatable.View useNativeDriver={true} animation="bounceIn">
                                            <Feather name="check" color="black" size={20} />
                                        </Animatable.View>
                                    </TouchableOpacity>
                                    :
                                    <Animatable.View useNativeDriver={true} animation="bounceIn">
                                        <Feather name="x-circle" color="red" size={20} />
                                    </Animatable.View>
                            }
                        </Animatable.View>

                    }



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
        flex: 1,
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

});
