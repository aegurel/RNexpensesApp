import { View, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../constants/style';

import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';


function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {

    let content = <Text style={styles.infoText}>{fallbackText}</Text>;

    if(expenses.length > 0){
        content = <ExpensesList expenses={expenses}/>
    }
    return(
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {content}
        </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:GlobalStyles.colors.primary700,
        padding:16
    },
    infoText:{
        textAlign:'center',
        marginTop:16,
        color:'white',
        fontSize:16
    }
})