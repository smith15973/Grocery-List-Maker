import { FlatList, Text, View } from 'react-native';
import { ListIngredient } from './ListIngredient';
import { AddItemToList } from './AddItemToList';

export function ListOfItems({ list, listId, loadList, baseURL }) {
    return (
        <>
            <View>
                <FlatList
                    data={list.map(ingredient => ingredient)}
                    renderItem={({ item }) => <ListIngredient key={item._id} ingredient={item} listId={listId} onListUpdated={loadList} baseURL={baseURL} />}
                    ListHeaderComponent={<Text>TOP LIST COMPONENT</Text>} />
                <AddItemToList onItemAdded={loadList} listId={listId} baseURL={baseURL} />

            </View>

        </>


    );
}
