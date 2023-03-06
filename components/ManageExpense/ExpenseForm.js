import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/style";
function ExpenseForm( { onCancel, onSubmit, submitButtonLabel, defaultValues } ){

    const [inputValues, setInputValue] = useState({
        amount:{ value : defaultValues ? defaultValues.amount.toString():'' , isValid:true},
        date:{ value : defaultValues ? getFormattedDate(defaultValues.date):'' , isValid:true},
        description:{ value : defaultValues ? defaultValues.description:'' , isValid:true}
    });

    function inputChangeHandler(inputIdentifier,enteredValue){
        setInputValue((curInputValues)=>{
            return {
            ...curInputValues,
            [inputIdentifier]:{ value : enteredValue , isValid:true}
            }
        });
    }

    function submitHandler(){
        const expenseData={
            amount:+inputValues.amount.value,
            date:new Date(inputValues.date.value),
            description:inputValues.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount>0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid){

            setInputValue((currInputs) =>{
                return{
                    amount:{value:currInputs.amount.value , isValid:amountIsValid},
                    date:{value:currInputs.date.value , isValid:dateIsValid},
                    description:{value:currInputs.description.value , isValid:descriptionIsValid}
                }
            })
            return;
        }
        
        onSubmit(expenseData);
    }
    const formIsInvalid = !inputValues.amount.isValid || !inputValues.date.isValid || !inputValues.description.isValid;

    return(
        <View style={styles.form}>
        <View style={styles.inputsRow}>
            <Input 
            label="Amount" 
            style={styles.rowInput}
            Invalid={!inputValues.amount.isValid}
            textInputConfig={{
                keyboardType:'decimal-pad',
                onChangeText:inputChangeHandler.bind(this,'amount'),
                value:inputValues.amount.value
            }}/>
            <Input 
            label="Date" 
            style={styles.rowInput}
            Invalid={!inputValues.date.isValid}
            textInputConfig={{
                placeholder:'YYYY-MM-DD',
                maxLength:10,
                onChangeText:inputChangeHandler.bind(this,'date'),
                value:inputValues.date.value
            }}/>
            </View>
            <Input label="Description" 
            Invalid={!inputValues.description.isValid}
            textInputConfig={{
                multiline:true,
                autoCorrect:false,
                onChangeText:inputChangeHandler.bind(this,'description'),
                value:inputValues.description.value
            }}/>
            {formIsInvalid && <Text style={styles.errorText}>Invalid Inputs - Please check your inputs!</Text>}
            <View style={styles.buttonContainer}>
            <Button mode={'flat'} onPress={onCancel} style={styles.buttonStyle}>Cancel</Button>
            <Button onPress={submitHandler} style={styles.buttonStyle}> {submitButtonLabel} </Button>
           </View> 
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    inputsRow:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    rowInput:{
        flex:1
    },
    form:{
        marginTop:24
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center',
        marginTop:16
    },
    buttonStyle:{
        marginHorizontal:8,
        minWidth:120
    },
    errorText:{
        color:GlobalStyles.colors.error500,
        marginHorizontal:16,
        marginTop:4
        
    }
})