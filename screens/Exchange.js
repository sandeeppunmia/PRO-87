import React,{Component} from 'react';
import {View,Text,TextInput,KeyboardAvoidingView,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class ExchangeScreen extends Component{
constructor(){
    super();
    this.state={
        userId : firebase.auth().currentUser.email,
        itemName:"",
        description:""
    }
}

createUniqueId(){
    return Math.random().toString(36).substring(7);
}

addItem = (itemName,description)=>{
    var userId = this.state.userId
    exchangeId = this.createUniqueId()
    db.collection('requested_items').add({
        "user_id":userId,
        "item_name":itemName,
        "description":description,
        "exchangeId":exchangeId,
    })

    this.setState({
        itemName:'',
        description:''
    })
    return Alert.alert("Item Requested Succesfully",'',[{text:'Ok', onPress:()=>{
        this.props.navigation.navigate('HomeScreen')
    }}
  ]
 );
}

getIsItemRequestActive(){
    db.collection('users')
    .where('email_id','==',this.state.userId)
    .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            this.setState({
               isItemRequestActive:doc.data().isItemRequestActive
            })
        }) 
    })
}

    render(){
            if(this.state.isItemRequestActive === true){
                return(
                    <View>
                       <View style= {{flex:1,justifyContent:'center'}}>
                           <View style={{borderColor:'orange',borderWidth2,justifyContent:'center',alignItems:'center'}}>
                                <Text>Item Name</Text>
                                <Text>{this.state.requestedItemName}</Text>
                           </View>
                           <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center'}}>
                               <Text>Item Status</Text>
                               <Text>{this.state.itemStatus}</Text>
                           </View>
                       </View>
                    </View>
                )
            }else{
                return(
                    <View style={{flex:1}}>
                    <MyHeader title="Request Item"/>
                        <KeyboardAvoidingView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <TextInput
                              style={styles.formTextInput}
                              placeholder={"Enter item name"}
                              onChangeText={(text)=>{
                                this.setState({
                                    itemName:text
                                })  
                              }}
                            value={this.state.itemName}/>
                        
                            <TextInput
                            multiline
                            numberOfLines = {8}
                            style={[styles.formTextInput,{height:300}]}
                            placeholder={"Description"}
                            onChangeText={(text)=>{
                                this.setState({
                                    description:text
                                })
                            }}
                            value={this.state.description}/>
                       
                            <TouchableOpacity
                            style={styles.button,{marginTop:10}}
                            onPress={()=>{this.addItem(this.state.itemName,this.state.description)}}
                            >
                            <Text style={{color:'#ffff',fontSize:18,fontWeight:'bold'}}>Add Item</Text>
                           </TouchableOpacity>
                        </KeyboardAvoidingView>
                </View>
                )
            }
           
        
    }
}

const styles = StyleSheet.create({
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    button:{
       width:"75%",
       height:50,
       justifyContent:'center',
       alignItems:'center',
       borderRadius:10,
       backgroundColor:"#ff5722",
       shadowColor:"#000",
       shadowOffset:{
           width:0,
           height:8
       },
       shadowOpacity:0.44,
       shadowRadius:10.32,
       elevation:16
    }
})