import { Image } from 'native-base';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ChatBot from '../../../components/ChatBot/ChatBot';
import Loading from '../../../components/StandardActivityIndicator/Loading';
import { COLORS } from '../../../constants/colors';
import { GetAnwserQuiz, GetUserID, SetAnwserQuiz, GetQuiz } from '../../../utils/AsyncUtil';
import GetLocation from 'react-native-get-location'
import moment from 'moment';

const { height, width } = Dimensions.get('window')

export const AnwserForm = ({ navigation, route }) => {


    //Rotas
    const { Quiz } = route.params;

    //Erros
    const [ErrorMessageText, setErrorMessageText] = React.useState('')
    // const [SnackbarVisibility, setSnackbarVisibility] = React.useState(false)

    //Referências
    const ScrollViewRef = useRef(null);
    const [ScrollY, SetScrollY] = React.useState(new Animated.Value(0))

    //Perguntas
    const [Perguntas, setPerguntas] = React.useState([])
    const [PerguntasLoading, setPerguntasLoading] = React.useState(true)

    const [TextTitle, ChangeTextTitle] = React.useState('Responder Questionário')

    const [JaRespondido, setJaRespondido] = React.useState(false)
    const [QuestionarioJaRespondido, setQuestionarioJaRespondido] = React.useState([])

    const [DynamicSteps, setDynamicSteps] = React.useState([])

    const [Location, setLocation] = React.useState()

    // const onDismissSnackBar = () => { setSnackbarVisibility(false) }

    const GetPosition = async () => {
        
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })

        .then(location => {
            console.log(location);
            setLocation(location)
        })

        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }

    useEffect(() => {GetJaRespondido();GetPosition()}, [])

    const GetJaRespondido = async () => {
        let oldanswer = await GetAnwserQuiz()
        let infoquiz = await GetQuiz()
        
        if (oldanswer != null)
        {
            let IdUser = await GetUserID()
            let QuestionarioRespondido = oldanswer.filter(item => item.IdQuiz === Quiz.IdQuiz && item.IdUser === IdUser)
            if(QuestionarioRespondido.length > 0)
            {
                setQuestionarioJaRespondido(
                    QuestionarioRespondido[0]
                )
                setJaRespondido(true)
                setPerguntasLoading(false)
                ChangeTextTitle('Questionário Respondido')
            }
            else
            {
                GetQuestions()
            }
        }
        else
        {
            GetQuestions()
        }
    }

    const GetQuestions = async () => {
        let response = Quiz.Perguntas

            setPerguntas(response)

            let steps = []
            let Contador = 1;

            response.forEach((element, index) => 
            {
                let newObject = {}
                let UserAnswers = {}
                let TheEnd = {}

                newObject =
                {
                    id: Contador,
                    message: element,
                    trigger: Contador + 1
                }

                Contador++;

                UserAnswers =
                {
                    id: Contador,
                    user: true,
                    trigger: Contador + 1
                }

                Contador++;

                //Quando for a última
                if (index === response.length - 1) {

                    TheEnd = { id: Contador, message: 'Parabéns, você finalizou o questionário!', end: true }
                }
                

                if (Object.keys(newObject).length > 0) { steps.push(newObject) }
                if (Object.keys(UserAnswers).length > 0) { steps.push(UserAnswers) }
                if (Object.keys(TheEnd).length > 0) { steps.push(TheEnd) }

            });
            setDynamicSteps(steps)
        setTimeout(() => {
            setPerguntasLoading(false)
        }, 2000 ); 
       
    }



    const HandleSubmit = async (values) => {

        let PerguntasRespostas = []
        let oldanswer = await GetAnwserQuiz()
        let arrayquiz = []
        Perguntas.forEach((element, index) => {
            PerguntasRespostas.push({Pergunta: element ,Resposta: values[index]})
        });

        let request = {
            "Respostas": PerguntasRespostas,
            "IdUser": await GetUserID(),
            "IdQuiz": Quiz.IdQuiz,
            "Latitude": Location.latitude,
            "Longitude": Location.longitude,
            "DataCadastro": moment()
        }
        console.log("Respostas",request)
        if (oldanswer != null) {
            oldanswer.forEach(element => {
                arrayquiz.push(element)
            });
            arrayquiz.push(request)
            SetAnwserQuiz(arrayquiz)
        }
        else
        {
            arrayquiz.push(request)
            SetAnwserQuiz(arrayquiz)            
        }

        navigation.goBack()

        
    }

    const handleEnd = ({ steps, values }) => {
        let respostas = []

        HandleSubmit(values)
    }

    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor={COLORS.ROXOAPP} barStyle="light-content" />

                <Animated.View style={[styles.header, {}]}>
                    <Animated.Text style={[styles.text_header,]}>{TextTitle}</Animated.Text>
                </Animated.View>

                <Animatable.View animation="fadeInUpBig" useNativeDriver={true} style={styles.footer}>
                    {
                        PerguntasLoading
                            ? <Loading />
                            :
                            JaRespondido ? 
                            
                            <View>
                                {
                                !!QuestionarioJaRespondido.Respostas ?<>
                                <Text style={{color:COLORS.PRETO_APP, fontSize:20, marginTop:'5%',alignSelf:'center'}} numberOfLines={1}>{Quiz.Titulo}</Text>
                                {
                                    QuestionarioJaRespondido.Respostas.map(item => {
                                            return (<>
                                                <Animatable.View animation={'flipInX'} duration={1500} useNativeDriver style={styles.RowContainer}>
                                                    <View style={{backgroundColor:COLORS.ROXO_APP, borderRadius:17 , borderTopLeftRadius:1, padding:'3%'}}>
                                                        <Text style={{color:COLORS.BRANCO_APP, fontSize:10, marginBottom:'5%'}} numberOfLines={4}>{Quiz.Username}</Text>
                                                        <Text style={{color:COLORS.BRANCO_APP}} numberOfLines={4}>{item.Pergunta}</Text>
                                                    </View>
                                                </Animatable.View>

                                                <Animatable.View animation={'flipInX'} duration={1500} useNativeDriver style={styles.RowContainerUser}>
                                                    <View style={{borderRadius:17 ,borderColor:COLORS.ROXO_APP,borderWidth:1, borderTopRightRadius:1, padding:'3%'}}>
                                                        <Text style={{color:COLORS.ROXO_APP}} numberOfLines={4}>{item.Resposta}</Text>
                                                    </View>
                                                </Animatable.View>
                                            </>
                                            )
                                        })
                                    }
                                    </>
                                    : null
                                }
                            </View>

                            :
                            <ChatBot
                                handleEnd={handleEnd}
                                botBubbleColor={COLORS.ROXO_APP}
                                submitButtonContent={'Enviar'}
                                // inputStyle={}
                                // submitButtonStyle={}
                                steps={DynamicSteps}
                                style={{ marginTop: '5%', paddingBottom: '5%', width: width, borderRadius: 20 }}
                                scrollViewProps={{ style: { backgroundColor: '#fff', paddingTop: 5, } }}
                                placeholder={'Escreva sua resposta'}
                            />
                    }

                    {/* <Animated.ScrollView
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: ScrollY } } }])}
                        showsVerticalScrollIndicator={false}
                        ref={ScrollViewRef}
                        style={{ marginBottom: '5%' }} >

                        




                    </Animated.ScrollView> */}
                </Animatable.View>
            </View>

            {/* <SnackBar
                Erro={ErrorMessageText}
                Visible={SnackbarVisibility}
                onDismissSnackBar={onDismissSnackBar}
            /> */}

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
        flex: Platform.OS === 'ios' ? 3 : 6,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 0,

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
    ChatThumbnail:
    {
        width: 30
        , height: 30
        , borderRadius: 100
    },
    RowContainerUser:
    {
        flexDirection: 'row'
        , maxWidth: '99%'
        , marginTop: '5%'
        , marginRight: '5%'
        , alignSelf: 'flex-end'

    },
    RowContainer:
    {
        flexDirection: 'row'
        , maxWidth: '99%'
        , marginTop: '5%'
        , marginLeft: '5%'
    },
    textInput:
    {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        fontSize: 12,
        color: COLORS.ROXO_APP
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
        fontSize: 18
    }
    , DescriptionContainer:
    {
        marginTop: '10%'
        , padding: "5%"
        , marginHorizontal: "-2%"
    }
    ,textPrivate:
    {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
        , alignItems: 'center'
        , justifyContent: 'center',

    }
    , color_textPrivate:
    {
        color: 'grey'
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
    , BudgetTitle: { color: COLORS.ROXO_APP, marginTop: '5%' }
    
});
