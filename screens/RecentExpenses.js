import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../context/expense-constext";
import { getMinusDate } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOvelay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses(){
    const expensesCtx = useContext(ExpensesContext);
    const [isFetching,setIsFetching] = useState(true);
    const [error,setError] = useState();
    useEffect(() =>{
        async function getData(){
            setIsFetching(true);
            try{
                const expenses = await fetchExpenses();
                expensesCtx.setExpense(expenses);
            }catch(error){
                setError('Could not get data! Please check your connection and try again')
            }
            setIsFetching(false);
        }
        getData();
    },[]);

    if(error && !isFetching){
        return <ErrorOverlay message={error}/>
    }

    if(isFetching){
        return <LoadingOverlay/>
    }

    const recentExpense = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getMinusDate(today,7);
        return expense.date > date7DaysAgo;
    })

    return(
       <ExpensesOutput expenses={recentExpense} expensesPeriod={"Last 7 Days"} fallbackText={'No registered expenses found for last 7 days!'} />
    );
}

export default RecentExpenses;