import React,{useState, useEffect, useRef} from 'react'
import { 
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Keyboard 
    } from 'react-native';

import Login from './components/Login';
import TaskList from './components/TaskList';
import firebase from './services/firebaseConnection';
import Feather from 'react-native-vector-icons/Feather';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function index() {

    const inputRef = useRef(null);

    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);

    const [newTask, setNewTask] = useState('');
    const [key, setKey] = useState('');


    useEffect(() => {

        function getUser() {
            if(!user){
                return;
            }

           firebase.database().ref('tarefas').child(user).once('value', (snapshot) =>{
            setTasks([]);

                snapshot?.forEach((childItem) => {
                    let data ={
                        key : childItem.key,
                        nome: childItem.val().nome
                    }

                    setTasks(oldTask =>  [...oldTask, data]);
                })

           }) 
        }
        getUser();

    }, [user])

    function handleAdd(){
    
        if(newTask === ''){
            return;
        }
        
        // Usuario quer editar uma tarefa
        if(key !== ''){
            firebase.database().ref('tarefas').child(user).child(key).update({ 
                nome: newTask
            }).then(() => {
                const taskIndex = tasks.findIndex(item => item.key === key);
                let taskClone = tasks;
                taskClone[taskIndex].nome = newTask;

                setTasks([...taskClone]);
            })

            Keyboard.dismiss();
            setNewTask('');
            setKey('');
            return;
        }

        let tarefas = firebase.database().ref('tarefas').child(user);
        let chave = tarefas.push().key;

        tarefas.child(chave).set({
            nome: newTask
        })
        .then(() => {

            const data ={ 
                key: chave,
                nome: newTask
            }

            setTasks(oldTask =>  [...oldTask, data]);

        }).catch(err => {
            console.log(err);
        })

        setNewTask('');
        Keyboard.dismiss();
    }

    function handleDelete(key){
        firebase.database().ref('tarefas').child(user).child(key).remove()
        .then(() => {
            const findTasks = tasks.filter(item => item.key !== key)
            setTasks(findTasks);
        })
    }

    function handleEdit(data){

       setNewTask(data.nome);
       setKey(data.key);
       inputRef.current.focus();

    }

    function cancelEdit(){
        setKey('');
        setNewTask('');
        Keyboard.dismiss(); 
    }

    if(!user)
    {
        return <Login changeStatus={(user) => setUser(user)}/>
    }else
    {
        return (
            <SafeAreaView style={styles.container}>

                {key.length > 0 &&
                <View style={{flexDirection:'row', marginBottom:10}}>
                    <TouchableOpacity onPress={() => cancelEdit()}>
                        <Feather name='x-circle' size={20} color='#FF0000' />
                    </TouchableOpacity>
                    <Text style={{marginLeft:5, color:'#FF0000'}}>
                        Voce esta editando uma tarefa!
                    </Text>
                </View> 
                }

                <View style={styles.containerTask}>
                <TextInput
                    style={styles.input}
                    placeholder="O que vai fazer hoje?"
                    value={newTask}
                    onChangeText={setNewTask}
                    ref={inputRef}
                />

                <TouchableOpacity style={styles.buttonAdd} onPress={() => handleAdd()}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                </View>

                <FlatList
                data={tasks}
                keyExtractor={item => item.key}
                renderItem={ ({item}) => (
                    <TaskList 
                        data={item}
                        deleteItem={handleDelete}
                        editItem={handleEdit}
                        />)}
                />
            </SafeAreaView>
        )
      }
    }


 
const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal:10,
        backgroundColor:'#F2F6FC',
    },
    containerTask:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input:{
        flex:1,
        marginBottom:10,
        padding:10,
        backgroundColor:'#FFF',
        color: '#000',
        borderRadius:4,
        borderWidth:1,
        borderColor: '#141414'
    },
    buttonAdd:{
        backgroundColor:'#141414',
        height:50,
        alignItems: 'center',
        justifyContent:'center',
        marginLeft: 5,
        paddingHorizontal: 14,
        borderRadius:4   
    },
    buttonText:{
        color:'#FFF',
        fontSize:22
    }
})