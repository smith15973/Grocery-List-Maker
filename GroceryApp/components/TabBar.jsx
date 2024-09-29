import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import Menu from '../pages/menu/Menu';
import Lists from '../pages/lists/';
import Recipes from '../pages/recipes/Recipes';

const Tab = createBottomTabNavigator();

export default function TabBar() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="list" type="font-awesome" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Lists"
                component={Lists}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="clipboard-list" type="font-awesome-5" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Recipes"
                component={Recipes}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="book" type="font-awesome" color={color} size={size} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="cog" type="font-awesome" color={color} size={size} />
                    ),
                }}
            /> */}
        </Tab.Navigator>
    )
};
