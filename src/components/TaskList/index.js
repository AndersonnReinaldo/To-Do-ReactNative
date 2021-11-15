import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';

const index = ({data, deleteItem, editItem}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{marginRight:10}} onPress={() => deleteItem(data.key)}>
                <Feather name="trash" color='#FFF' size={20}/>
            </TouchableOpacity>

            <View style={{ paddingRight:10}}>
                <TouchableWithoutFeedback onPress={() => editItem(data)}>
                    <Text style={{color:'#FFF', paddingRight:10}}>{data.nome}</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

export default index

const styles = StyleSheet.create({

    container:{
        flex:1,
        flexDirection: 'row',
        backgroundColor:'#121212',
        alignItems:'center',
        marginBottom:10,
        padding:10,
        borderRadius:4
    }
})
