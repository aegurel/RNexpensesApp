import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import { GlobalStyles } from './constants/style';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import ManageExpenses from './screens/ManageExpenses';
import IconButton from './components/UI/IconButton';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview(){
  return(
  <BottomTabs.Navigator screenOptions={({navigation}) => ({
    headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
    headerTintColor:'white',
    tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
    tabBarActiveTintColor:GlobalStyles.colors.accent500,
    headerRight:({tintColor}) => 
    ( <IconButton 
        icon="add" 
        size={24} 
        color={tintColor} 
        onPress={()=>{
          navigation.navigate('ManageExpenses');
        }} 
    />),
  })}>
    <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} //icon with Ionicons
    options={{
      title:"Recent Expenses",
      tabBarLabel:"Recent",
      tabBarIcon:({color,size}) =>(
        <Ionicons name="hourglass" color={color} size={size}/>
      )
    }}/>
    <BottomTabs.Screen name="AllExpenses" component={AllExpenses} //icon without Ionicons
    options={{
      title:"All Expenses",
      tabBarLabel:"All Expenses",
      tabBarIcon:({focused,color,size}) =>(
        <Image
        source={
          focused
          ?require('./assets/expensesy.png')
          :require('./assets/expenses.png')
        } 
          style={{width: size,height: size}}
      />
      )
    }}/>
  </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light"/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{headerShown:false}}/>
          <Stack.Screen name="ManageExpenses" component={ManageExpenses}/>
        </Stack.Navigator>
      </NavigationContainer>      
    </>
  );
}

