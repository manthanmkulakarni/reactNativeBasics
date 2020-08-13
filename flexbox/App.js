/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends Component{

  constructor(){
    super()
    this.changeHandler=this.changeHandler.bind(this)
    this.handleButtonEvent=this.handleButtonEvent.bind(this)
  
    this.state={
      text1:"",
      text2:"",
      text1Disp:"",
      textipval:"Enter here",
      flg1:false,
      flg2:true,
      flexToggle1:{
        backgroundColor:'blue',
      },
      flexToggle2:{
        backgroundColor:'green',
      },
    }

    setInterval(()=>{
      var temp1=this.state.flg1^true
      var temp2=this.state.flg2^true
      this.setState({
        flg1:temp1,
        flg2:temp2,
      })
    },1000)
  }

  changeHandler=function(textval){
    this.state.textipval=textval
  }
  handleButtonEvent=function(){
    console.log(this.textDisp)
    console.log(this.state.text1)
    this.setState({text1Disp:this.state.text1})
  }

  render(){
    //Note : Style Property in array indicates multiple values are applied to it
    //By default flex direction in column wise
    return (
      <>
        <View style={styles.flexColProp}>
          <View style={[styles.flex1,styles.flexProp]}>
            <Text style={styles.flexTextProp}>Enter value is {this.state.textipval}</Text>
            <TextInput defaultValue={this.state.textipval} onChangeText={this.changeHandler}></TextInput>
            <Button onPress={this.handleButtonEvent} title="Click"></Button>
          </View>
          <View style={styles.flexRowProp}>
            <View style={[this.state.flg1&&this.state.flexToggle1,this.state.flg2&&this.state.flexToggle2,styles.flexProp]}>  
              <Text style={styles.flexTextProp}>Controled input {this.state.text1Disp}</Text>
              <TextInput 
              onChangeText={input => this.setState({text1:input})}
              ></TextInput>
              
            </View>
            <View style={[this.state.flg2&&this.state.flexToggle1,this.state.flg1&&this.state.flexToggle2,styles.flexProp]}>
              <Text style={styles.flexTextProp}>Uncontroled input</Text>
              <TextInput 
              ref={input => this.textDisp=input}
              ></TextInput>
              
            </View>
          </View>
        </View>
      </>
    );
  }
};
const styles = StyleSheet.create({
  flexColProp:{
    flex:1,
    
  },
  flexRowProp:{
    flex:2,
    flexDirection:"row",
  },
  flexProp:{
    flex:1,
    alignContent:"center",
    
  },
  flexTextProp:{
    color:"white",
    fontSize:30,
    textAlign:"center",
    
  },
  flex1:{
   backgroundColor:"red", 
  },

});

export default App;
