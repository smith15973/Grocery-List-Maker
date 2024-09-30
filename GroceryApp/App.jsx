// In App.js in a new project
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Recipes } from './pages/recipes/Recipes';
import { Lists } from './pages/lists/Lists';
import { Menu } from './pages/menu/Menu';
import { AddToMenu } from './pages/menu/AddToMenu';
import { ShowList } from './pages/lists/ShowList';
import { ShowRecipe } from './pages/recipes/ShowRecipe';
import { NewRecipe } from './pages/recipes/NewRecipe';
import { Icon } from '@rneui/themed';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function MenuStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Add to Menu" component={AddToMenu} />
    </Stack.Navigator>
  )
}

function ListsStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Lists" component={Lists} />
      <Stack.Screen name="List" component={ShowList} />
    </Stack.Navigator>
  )
}

function RecipesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recipes" component={Recipes} />
      <Stack.Screen name="Recipe" component={ShowRecipe} />
      <Stack.Screen name="New Recipe" component={NewRecipe} />
    </Stack.Navigator>
  )
}


function TabBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MenuTab"
        component={MenuStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" type="font-awesome" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ListsTab"
        component={ListsStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="clipboard-list" type="font-awesome-5" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="RecipesTab"
        component={RecipesStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" type="font-awesome" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}




function App() {
  return (
    <NavigationContainer>
      <TabBar />
    </NavigationContainer>
  );


}

export default App;