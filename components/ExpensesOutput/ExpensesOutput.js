import { View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/style';

import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

const DUMMY_EXPENSES = [
    {
        id:'e1',
        description:'A pair of shoes',
        amount:49.99,
        date:new Date('2022-12-19')
    }, 
    {
        id:'e2',
        description:'A pair of socks',
        amount:4.69,
        date:new Date('2022-12-25')
    },
    {
        id:'e3',
        description:'A book',
        amount:13.19,
        date:new Date('2023-01-04')
    },
    {
        id:'e4',
        description:'Another book',
        amount:16.79,
        date:new Date('2023-01-12')
    },
    {
        id:'e5',
        description:'A new Laptop',
        amount:499.99,
        date:new Date('2022-12-01')
    },{
        id:'e6',
        description:'A pair of shoes',
        amount:49.99,
        date:new Date('2022-12-19')
    }, 
    {
        id:'e7',
        description:'A pair of socks',
        amount:4.69,
        date:new Date('2022-12-25')
    },
    {
        id:'e8',
        description:'A book',
        amount:13.19,
        date:new Date('2023-01-04')
    },
    {
        id:'e9',
        description:'Another book',
        amount:16.79,
        date:new Date('2023-01-12')
    },
    {
        id:'e10',
        description:'A pair of shoes',
        amount:49.99,
        date:new Date('2022-12-19')
    }, 
    {
        id:'e11',
        description:'A pair of socks',
        amount:4.69,
        date:new Date('2022-12-25')
    },
    {
        id:'e12',
        description:'A book',
        amount:13.19,
        date:new Date('2023-01-04')
    },
    {
        id:'e13',
        description:'Another book',
        amount:16.79,
        date:new Date('2023-01-12')
    },];

function ExpensesOutput({ expenses, expensesPeriod }) {
    return(
        <View style={styles.container}>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
            <ExpensesList expenses={DUMMY_EXPENSES}/>
        </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:GlobalStyles.colors.primary700,
        padding:16
    }
})