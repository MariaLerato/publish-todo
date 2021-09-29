import React, { useState,useEffect } from 'react';
import {Text, View, SafeAreaView, TextInput,ImageBackground, StyleSheet} from 'react-native'
import { Button } from 'react-native-elements';
import Users from './users';

const About = ({navigation,route}) =>{
    const [title,setTitle] = useState(' ')
    const [todo,setTodo] = useState([])
    const {itemId} = route.params
    const id = itemId

    useEffect(()=>{
        Users.getDataById(id).once('value',snapshot=>{
            const data = snapshot.val()
            setTitle(data.title)

        })
    },[])

    const edit = () =>{
        const Todo = []
        Users.updateTodo(id,{
            title:title
        })
        .then(()=> console.log('updated'))
        .catch(err =>console.log(err))
        navigation.goBack()
        setTodo(Todo)
    }
    const deleteTask = () =>{
        Users.deleteTodo(id)
        .then(()=> console.log('delete complete'))
        .catch(err=> console.log(err))
        navigation.goBack()
    }
    return(
        <SafeAreaView style={{padding:4}}>
            <ImageBackground source={require('../assets/flowers.jpg')} style={{width:400,height:800}} >
                <Text style={{padding:4,margin:4,color:'black',fontSize:45,width:800}}>
                    About Todo
                </Text>
                
                <View>
                     <TextInput style={{height:70,padding:18,margin:8,borderRadius:10,backgroundColor:'gainsboro',width:300}} onChangeText={(text)=>setTitle(text)} value={title} />
                </View>
                <View style={styles.button}>
                    <Button title={'Remove Task'} onPress={deleteTask} style={styles.single} />
                    <Button title={'Update Task'} onPress={edit}  style={styles.single} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    button:{
        padding:20,
        margin:8,
        flex:1,
        flexDirection:'row',
        width:300
    },
    single:{
        padding:10,
        margin:10,borderRadius:20
    }
})
export default About