import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/style";

function ExpensesSummary({ expenses, periodName }) {
    const expensesSum = expenses.reduce((sum,expense)=>{
        return sum + expense.amount;
    },0);
    return (
        <View style={styles.container}>
            <Text style={styles.period}> {periodName} </Text>
            <Text style={styles.sum}> ${expensesSum.toFixed(2)} </Text>
        </View>
    );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container:{
        padding:12,
        borderRadius:8,
        backgroundColor:GlobalStyles.colors.primary50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:8
    },
    period:{
        fontSize:14,
        color:GlobalStyles.colors.primary400
    },
    sum:{
        fontSize:14,
        fontWeight:'bold',
        color:GlobalStyles.colors.primary400
    }
});