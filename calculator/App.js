/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,

} from 'react-native/Libraries/NewAppScreen';

class App extends Component {
  constructor(){
    super()
    this.handlenInputUpdate=this.handlenInputUpdate.bind(this)
    this.clearInput=this.clearInput.bind(this)
    this.calculateResult=this.calculateResult.bind(this)
    this.state={
      resultText:"",
      inputText:"",
    }
  }
  handlenInputUpdate =(s) =>{
    if(s.length+this.state.inputText.length>=70){
      return
    }
    if(s==='clr'){
      var temp=''
      for(var i=0;i<this.state.inputText.length-1;i++){
        temp+=this.state.inputText[i]
      }
      
      this.setState({
        inputText:temp
      })
    }
    else{
      s=this.state.inputText+s
      this.setState({
        inputText:s
      })
  }
  }
  clearInput =()=>{
    
    this.setState({
      inputText:'',
      resultText:'',
    })
  }
  calculateResult=()=>{
    var eflg=0                                    //Error flg
    var saperated=[]
    var i=0
    var s=this.state.inputText
    while(i<s.length){
      var j=i
      var temp=''
      
      while(j<s.length&& (s[j]!='+' && s[j]!='-'&&s[j]!='*'&& s[j]!='/')){
        temp+=s[j]
        j+=1
      }
      if(temp==''){
        temp=s[j]
      }
      saperated.push(temp)
      if(j>i){
        i=j
      }
      else{
        i+=1
      }
    }
    var inside=[]
    inside['+']=1
    inside['-']=1
    inside['*']=3
    inside['/']=3

    var outside=[]
    outside['+']=2
    outside['-']=2
    outside['/']=4
    outside['*']=4

    i=0
    var numS=[]
    var opS=[]
    var p1=-1,p2=-1
   
    while(i<saperated.length){
      if(saperated[i]=='+'|| saperated[i]=='-'||saperated[i]=='*'||saperated[i]=='/'){
        if(p2==-1){
          opS.push(saperated[i])
          p2+=1
        }
        else if(inside[opS[p2]]<=outside[saperated[i]]){
          opS.push(saperated[i])
          p2+=1
        }
        else{
          while(inside[opS[p2]]>outside[saperated[i]]){

            //Error checking
            if(p2<0){
              this.setState({
                resultText:'Error',
                inputText:''
              })
              return              
            }
            var n2=numS[p1]
            var tresult=0
            
            p1-=1
            var n1=numS[p1]

            //Error checking
            if(numS.length<=0){
              this.setState({
                resultText:'Error',
                inputText:''
              })
              return
            }
            numS.pop()

            //Error checking
            if(numS.length<=0){
              this.setState({
                resultText:'Error',
                inputText:''
              })
              return
            }
            numS.pop()
            p1=-1
            
              if(opS[p2]=='+')
                tresult=(n1+n2)

              else if(opS[p2]=='-')
                tresult=(n1-n2)
  
              else if(opS[p2]=='*')
                tresult=(n1*n2)
              
              else if(opS[p2]=='/')
                tresult=(n1/n2)
              
            opS.pop()
            p2-=1
            
            numS.push(tresult)
            p1=numS.length-1
            
          }
          opS.push(saperated[i])
          p2+=1
        }
      }
      else{
        numS.push(parseFloat(saperated[i]))
        p1+=1
      }
      i+=1
      
    }
  
    while(p2>-1){
      var n2=numS[p1]
      var tresult=0
      
      p1-=1
      var n1=numS[p1]

      //Error checking
      if(numS.length<=0){
        this.setState({
          resultText:'Error',
            inputText:''
          })
        return
      }
      numS.pop()

      //Error checking
      if(numS.length<=0){
        this.setState({
          resultText:'Error',
            inputText:''
          })
        return
      }
      numS.pop()
      p1=-1

        if(opS[p2]=='+')
          tresult=(n1+n2)

        else if(opS[p2]=='-')
          tresult=(n1-n2)

        else if(opS[p2]=='*')
          tresult=(n1*n2)
        
        else if(opS[p2]=='/')
          tresult=(n1/n2)
        
      opS.pop()
      p2-=1
      numS.push(tresult)
      p1=numS.length-1
      
    }
    var result=numS.pop()
    this.setState({
      resultText:result.toString()
    })
    
  }
  render(){
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.Container}>
          <View style={styles.DispContainer}>
            <View style={styles.EditText}>
              <Text style={styles.EditTextStyle} >{this.state.inputText}</Text>
            </View>
            <View style={styles.DispContainer}> 
              <Text style={styles.ResultTextStyle}>{this.state.resultText}</Text>
            </View>
          </View>

          <View style={styles.Container}>
            <View style={styles.ButtonContainer}>
              <View style={styles.NumberButton}>
                <View style={styles.NumberButtonRow}>
                  <TouchableOpacity style={styles.ButtonStyle} onPress={()=>this.handlenInputUpdate('1')}>
                    <Text style={styles.ButtonText}>1</Text>
                  </TouchableOpacity >
                  <TouchableOpacity style={styles.ButtonStyle} onPress={()=>this.handlenInputUpdate('2')}>
                    <Text style={styles.ButtonText}>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ButtonStyle} onPress={()=>this.handlenInputUpdate('3')}>
                    <Text style={styles.ButtonText}>3</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.NumberButtonRow}>
                  <TouchableOpacity style={styles.ButtonStyle} onPress={()=>this.handlenInputUpdate('4')}>
                    <Text style={styles.ButtonText}>4</Text>
                  </TouchableOpacity >
                  <TouchableOpacity style={styles.ButtonStyle} onPress={()=>this.handlenInputUpdate('5')}>
                    <Text style={styles.ButtonText}>5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ButtonStyle} onPress={()=>this.handlenInputUpdate('6')}>
                    <Text style={styles.ButtonText}>6</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.NumberButtonRow}>
                  <TouchableOpacity style={styles.ButtonStyle} onPress={()=>this.handlenInputUpdate('7')}>
                    <Text style={styles.ButtonText}>7</Text>
                  </TouchableOpacity >
                  <TouchableOpacity style={styles.ButtonStyle} onPress={()=>this.handlenInputUpdate('8')}>
                    <Text style={styles.ButtonText}>8</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ButtonStyle} onPress={()=>this.handlenInputUpdate('9')}>
                    <Text style={styles.ButtonText}>9</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.NumberButtonRow}>
                  <TouchableOpacity style={styles.ButtonStyle} onPress={()=>this.handlenInputUpdate('0')}>
                    <Text style={styles.ButtonText}>0</Text>
                  </TouchableOpacity >
                  <TouchableOpacity style={styles.ButtonStyle} onPress={()=>this.handlenInputUpdate('.')}>
                    <Text style={styles.ButtonText}>.</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ButtonStyle} onPress={()=>this.calculateResult()}>
                    <Text style={styles.ButtonText}>=</Text>
                  </TouchableOpacity>
                </View>

              </View>
              <View style={styles.OppButton}>
              <TouchableOpacity  style={styles.ButtonStyle} onLongPress={this.clearInput}   onPress={()=>this.handlenInputUpdate('clr')} >
                  <Text style={styles.ButtonText} >clr</Text>
                </TouchableOpacity >
                <TouchableOpacity  style={styles.ButtonStyle} on onPress={()=>this.handlenInputUpdate('+')} >
                  <Text style={styles.ButtonText} >+</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.ButtonStyle} onPress={()=>this.handlenInputUpdate('-')}>
                  <Text style={styles.ButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonStyle} onPress={()=>this.handlenInputUpdate('/')}>
                  <Text style={styles.ButtonText}>/</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonStyle} onPress={()=>this.handlenInputUpdate('*')}>
                  <Text style={styles.ButtonText}>*</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  Container:{
    flex:1,
    
  },
  ButtonContainer:{
    flex:1,
    flexDirection:'row',
  },
  DispContainer:{
    flex:1,
  },
  NumberButton:{
    flex:3,
    backgroundColor:'#00aaff',
  },
  OppButton:{
    flex:1,
    backgroundColor:'#6495ed',
  },
  EditText:{
    flex:3,
    backgroundColor:'#f0f8ff',
  },
  ResultView:{
    flex:1,
    backgroundColor:'#f0ffff',
  },
  NumberButtonRow:{
    flex:1,
    flexDirection:"row",
    
  },
  ButtonStyle:{
    flex:1,
   alignContent:'stretch',
   
    
  },
  ButtonText:{
    textAlign:'center',
    fontSize:30,
    color:'white',
    
  },
  EditTextStyle:{
    fontSize:40,
    textAlign:'right',
    padding:20,
  
  },
  ResultTextStyle:{
    fontSize:30,
    textAlign:'right',
    padding:20,
  },
});

export default App;
