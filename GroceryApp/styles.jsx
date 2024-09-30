import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    meal: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 4,
        width: 100,
        margin: 5,
        flexDirection: "row",
    },
    mealSelected: {
        backgroundColor: 'red',
        borderColor: 'blue',
        borderWidth: 3,
        borderRadius: 10,
        padding: 4,
        width: 100,
        margin: 5,
        flexDirection: "row",
    },
    menuDay: {
        padding: 10,
        margin: 5,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        width: '15%',
        height: 100,
        flexDirection: "row",
    },
    menuDaySelected: {
        padding: 10,
        margin: 5,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        width: '15%',
        height: 100,
        flexDirection: "row",
        borderColor: 'blue',
        borderWidth: 3, 
    },
});

export default styles;