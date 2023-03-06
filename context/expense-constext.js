import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
    expenses:[],
    addExpense:({ description, amount, date }) => {},
    setExpense:(expenses) => {},
    updateExpense:(id, { description, amount, date }) => {},
    deleteExpense:(id) => {}
});

function ExpensesReducer(state,action){
    switch(action.type){
        case 'ADD':
            return [action.payload,...state];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;    
        case 'UPDATE':
            const updatebleExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updateblaExpense = state[updatebleExpenseIndex];
            const updatedItem = {...updateblaExpense, ...action.payload.data};
            const updatedExpense = [...state];
            updatedExpense[updatebleExpenseIndex] = updatedItem;
            return updatedExpense;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;            
    }
}

function ExpensesContextProvider({children}){

    const [expensesState,dispatch] = useReducer(ExpensesReducer,[]);

    function addExpense(expenseData){
        dispatch({type:'ADD',payload:expenseData});
    }
    function setExpense(expenses){
        dispatch({type:'SET',payload:expenses});
    }
    function updateExpense( id, expenseData ){
        dispatch({type:'UPDATE',payload:{id:id,data:expenseData}})
    }
    function deleteExpense(id){
        dispatch({type:'DELETE',payload:id})
    }

    const value = {
        expenses:expensesState,
        setExpense:setExpense,
        addExpense:addExpense,
        updateExpense:updateExpense,
        deleteExpense:deleteExpense
    }
    return(
        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    );
}

export default ExpensesContextProvider;
