import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_USERID = '@QUESTIONAPPUSERID'
const STORAGE_USERNAME = '@QUESTIONAPPUSERNAME'
const STORAGE_QUIZ = '@QUESTIONAPPQUIZ'
const STORAGE_ANWSERQUIZ = '@QUESTIONAPPANWSERQUIZ'

export async function SetLocation(endereco)
{
    AsyncStorage.setItem(STORAGE_LOCATION, JSON.stringify(endereco), (err)=> 
    {
        if(err) { throw err; }

    }).catch((err)=> 
    {
        console.log(err)
    });
}

export async function GetLocation() 
{
    try 
    {
        const value = await AsyncStorage.getItem(STORAGE_LOCATION);
        
        if (value !== null) 
        { 
            return JSON.parse(value)
        }
        
    }
    catch (error) {}
}

export async function SetUserID(UserID)
{
    AsyncStorage.setItem(STORAGE_USERID, JSON.stringify(UserID), (err)=> 
    {
        if(err) { throw err; }

    }).catch((e)=> 
    {
        console.log(e)
    });
}

export async function GetUserID() 
{
    try 
    {
        const value = await AsyncStorage.getItem(STORAGE_USERID);
        
        if (value !== null) 
        { 
            
            return (value)
        }
        
    }
    catch (e) 
    {
        console.log(e)
    }
}

export async function SetUserName(username)
{
    AsyncStorage.setItem(STORAGE_USERNAME, JSON.stringify(username), (err)=> 
    {
        if(err) { throw err; }

    }).catch((err)=> 
    {
        
    });
}

export async function GetUserName() 
{
    try 
    {
        const value = await AsyncStorage.getItem(STORAGE_USERNAME);
        
        if (value !== null) 
        { 
            return (value)
        }
        
    }
    catch (error) {console.log(error)}
}

export async function SetQuiz(quiz) 
{
    AsyncStorage.setItem(STORAGE_QUIZ, JSON.stringify(quiz), (err)=> 
    {
        if(err) { throw err; }

    }).catch((err)=> 
    {
        console.log(err)
    })
}

export async function GetQuiz() 
{
    try 
    {
        const value = await AsyncStorage.getItem(STORAGE_QUIZ);
        
        if (value !== null) 
        { 
            return JSON.parse(value)
        }
        
    }
    catch (error) {console.log(error)}
}

export async function SetAnwserQuiz(quiz) 
{
    AsyncStorage.setItem(STORAGE_ANWSERQUIZ, JSON.stringify(quiz), (err)=> 
    {
        if(err) { throw err; }

    }).catch((err)=> 
    {
        console.log(err)
    })
}

export async function GetAnwserQuiz() 
{
    try 
    {
        const value = await AsyncStorage.getItem(STORAGE_ANWSERQUIZ);
        
        if (value !== null) 
        { 
            return JSON.parse(value)
        }
        
    }
    catch (error) {console.log(error)}
}


export default {SetLocation,GetLocation,SetUserID,GetUserID,SetUserName,GetUserName,SetQuiz,GetQuiz,SetAnwserQuiz,GetAnwserQuiz};
