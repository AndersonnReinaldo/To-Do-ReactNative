import React,{useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView,TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import firebase from '../../services/firebaseConnection'
const Login = ({changeStatus}) => {
    const [type, setType] = useState('login');
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] =  useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(){

        if(type === 'login')
        {
            // Aqui fazemos o login
            const user = firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                changeStatus(user.user.uid)
            }).catch((err) => {
                console.log(err);
                alert('Ops! parece que algo deu errado.');
                return;
            })
        }else
        {
            const user = firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                changeStatus(user.user.uid);
            }).catch((err) => {
                console.log(err);
                alert('Ops! parece que algo deu errado.');
                return;
            })
        }
            
    }

    return (
        <SafeAreaView style={styles.container}>

            {type !== 'login' ? 

            <TextInput 
            style={styles.input}
            placeholder="Digite seu nome"
            onChangeText={setName}
            value={name}
            /> : null}

            <TextInput 
                style={styles.input}
                placeholder="Seu email"
                onChangeText={setEmail}
                value={email}
                />

            <TextInput 
                style={styles.input}
                placeholder="******"
                onChangeText={setPassword}
                value={password}

                />

             <TouchableOpacity 
                style={[styles.areaBtn,{backgroundColor:type === 'login' ? '#3ea6f2' : '#141414' }]} 
                onPress={handleLogin}>
             {loading ? 
                <ActivityIndicator 
                    color='#FFF'
                    size={30}/> : 
                <Text
                 style={styles.textBtn}>
                     {type === 'login' ? 'Acessar' : 'Cadastrar'}
                     </Text>
                 } 
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>  setType(type => type === 'login' ? 'Cadastrar' : 'login')}>
                <Text style={{textAlign: 'center'}}>
                    {type === 'login' ? 'Criar uma conta' : 'Ja tenho uma conta!'}
                </Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({

    container:{
        flex: 1,
        paddingTop:40,
        backgroundColor:'#F2F6FC',
        paddingHorizontal:10

    },
    input:{
        width:'100%',
        marginBottom:10,
        backgroundColor:'#FFF',
        padding:10,
        borderRadius:4,
        height:45,
        borderWidth:1,
        borderColor:'#141414'
    },
    areaBtn:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#141414',
        height:45,
        marginBottom:10,
    },
    textBtn:{
        fontSize:17,
        color:'#FFF'
    }

})
