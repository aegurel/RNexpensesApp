import { Pressable, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/style";
import { getFormattedDate } from "../../util/date";

function ExpenseItem({ description, date, amount }){
    const navigation = useNavigation();
    function expenseItemPressHandler(){
        navigation.navigate('ManageExpenses');
    }

    return(
        <Pressable onPress={expenseItemPressHandler} style={({pressed})=> pressed && styles.pressed}>
            <View style={styles.container}>
                <View>
                    <Text style={[styles.description,styles.textBase]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default ExpenseItem;

const styles = StyleSheet.create({
    pressed:{
        opacity:0.75
    },
    container:{
        padding:12,
        backgroundColor:GlobalStyles.colors.primary500,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:8,
        marginBottom:12
    },
    textBase:{
        color:GlobalStyles.colors.primary50
    },
    description:{
        fontSize:16,
        fontWeight:'bold'
    },
    amountContainer:{
        paddingHorizontal:12,
        paddingVertical:4,
        marginHorizontal:12,
        backgroundColor:'white',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        minWidth:80
    },
    amount:{
        color:GlobalStyles.colors.primary500,
        fontWeight:'bold'
    }  
});