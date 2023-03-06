import { useContext, useLayoutEffect, useState } from "react";
import {Text, View, StyleSheet} from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOvelay";
import { GlobalStyles } from "../constants/style";
import { ExpensesContext } from "../context/expense-constext";
import { deleteExpense, postExpense, updateExpense } from "../util/http";

function ManageExpenses({route,navigation}){
    const expensesCtx = useContext(ExpensesContext);
    const [isSubmitted,setIsSubmitted] = useState(false);

    const editedExpensesId = route.params?.expenseId;//? check the value whether is valid or not if its not, not throw an exception
    const isEdited = !!editedExpensesId;//!! convert the value to boolean

    const selectedExpense = expensesCtx.expenses.find((expenses) => expenses.id === editedExpensesId);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isEdited?'Edit Expense':'Add Expense'
        });
    },[isEdited,navigation]);
    
    function deleteHandler(){
        expensesCtx.deleteExpense(editedExpensesId);
        setIsSubmitted(true);
        deleteExpense(editedExpensesId);
        navigation.goBack();
    }
    function cancelHandler(){
        navigation.goBack();
    }
    async function confirmHandler(expenseData){
        setIsSubmitted(true);
        if(isEdited){
            expensesCtx.updateExpense(editedExpensesId,expenseData);
            updateExpense(editedExpensesId,expenseData);
        }else{
            const id = await postExpense(expenseData);
            expensesCtx.addExpense({...expenseData,id:id});
        }
        navigation.goBack();
    }

    if(isSubmitted){
        return <LoadingOverlay />
    }

    return (
        <View style={styles.container}>
           <ExpenseForm 
            onCancel={cancelHandler} 
            onSubmit={confirmHandler}
            submitButtonLabel={isEdited?'Edit':'Add'}
            defaultValues={selectedExpense}
            />
            {isEdited&&(
                <View style={styles.iconContainer}>
                    <IconButton icon={'trash'} color={GlobalStyles.colors.error500} size={36} onPress={deleteHandler} />
                </View>
            )}
        </View>
    );
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:GlobalStyles.colors.primary800,
    },
    iconContainer:{
        marginTop:24,
        marginHorizontal:24,
        borderTopWidth:2,
        borderTopColor:GlobalStyles.colors.primary700,
        alignItems:"center"
    },
});