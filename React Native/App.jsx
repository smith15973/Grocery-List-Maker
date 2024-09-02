// In App.js in a new project

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Recipes } from './pages/recipes/Recipes';
import { Lists } from './pages/lists/Lists';
import { Menu } from './pages/menu/Menu';
import { ShowList } from './pages/lists/ShowList';



function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Menu"
        onPress={() => navigation.navigate('Menu')}
      />
      <Button
        title="Go to Recipes"
        onPress={() => navigation.navigate('Recipes')}
      />
      <Button
        title="Go to Lists"
        onPress={() => navigation.navigate('Lists')}
      />
    </View>
  );
}






const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Recipes" component={Recipes} />
        <Stack.Screen name="Lists" component={Lists} />
        <Stack.Screen name="List" component={ShowList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;