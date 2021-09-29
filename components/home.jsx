import React, { useEffect, useState } from 'react';
import {FlatList,Text, View,TextInput, SafeAreaView,StyleSheet,ScrollView} from 'react-native'
import { ListItem, Image, Button } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Users from './users';
import firebase from './firebase';
const Home = ({navigation}) =>{
    const [title,setTitle] = useState(' ')
    const [todo,setTodo] = useState([])
    
    const createTodo = () =>{
        const todo = {
            title:title
        }
        Users.createUsers(todo)
        .then(()=> console.log('task created'))
        .catch(err=> console.log(err))
        setTitle(' ')
    }
    
 useEffect(()=>{
     Users.getData().on('value',snapshot => {
         const Todo =[]
         snapshot.forEach(action=>{
             const key = action.key
             const data = action.val()
             Todo.push({
                key:key,
                title:data.title
             })
            setTodo(Todo)
         })
         console.log(Todo)
     })
 },[])

 const displaytodo = ({item,index}) =>{
     return(
        <ScrollView>
            <ListItem key = {index}  >
                <ListItem.Content>
                    <ListItem.Title>
                        {item.title} 
                    </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron onPress={()=> navigation.navigate('about',{
                    itemId: item.key
                })} />
            </ListItem>
        </ScrollView>
     )
 }
 const DeleteAll = () =>{
    const db = firebase
    db.ref('/todo').remove()
    .then(alert('Your Task List Has been Cleared'))
    setTitle('')
    displaytodo()
    
 }
    return(
        <SafeAreaView>
            <ScrollView style={styles.viewCover}>
             <View style={{margin:8,height:1000}} >   
                <Image source={require('../assets/pic.jpg') } style={{width:180,height:160,marginLeft:58,borderRadius:10}}>
                    </Image>
                    <Text style={{padding:4,margin:4,color:'black',fontSize:45,width:800}}>
                        Todo Application
                    </Text>
                <View style={{margin:4,flexDirection:'row'}}>
                    <TextInput value={title} onChangeText={(e)=>setTitle(e)} placeholder={'Create A New Task'} style={styles.textbox} />
                    <MaterialCommunityIcons name ={'plus'} size={35} color={'white'} style={{borderRadius:10,backgroundColor:'purple',padding:4,width:40,padding:4,marginTop:4,}}  onPress={createTodo} />
               </View>
               <View >
                   {
                       todo && todo.length ? (
                        <FlatList
                           
                        data={todo} renderItem={displaytodo}
                        keyExtractor={item=> item.key}
                        removeClippedSubviews={true}
                        
                        />
                       ):(
                           <View>
                               <Text style={{fontSize:25,padding:4,fontWeight:'600'}} >
                                   Nothing scheduled for now
                               </Text>
                            </View>
                       )
                   }
                   <View>
                        <Text style={{padding:4,fontWeight:'500',margin:4,fontSize:20,color:'red'}}>
                            You have {todo.length} pending tasks
                        </Text>
                        <Button title={'Clear All'} onPress={DeleteAll} />
                   </View>
                </View>
              </View>  
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    home:{
       borderColor:'black'
    },
    textbox:{
        backgroundColor:'gainsboro',
        padding:11,
        width:300,
        height:50,
        borderRadius:10,
        margin:4,
    },
    viewCover:{
        borderBottomColor: 'gainsboro',
        borderBottomWidth: 0.5,
        borderWidth:4,
        borderColor:'#3ab2bd',
        height:800,
       
    },
    button:{
        color:'black',
        padding:4,
        width:400,
        margin:4,
    },
})
export default Home