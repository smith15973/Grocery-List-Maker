import { FlatList, SafeAreaView, Text} from 'react-native';
import { ListIngredient } from './ListIngredient';
import { AddItemToList } from './AddItemToList';

export function ListOfItems({ list, listId, loadList, baseURL }) {
    return (
        <>
            <SafeAreaView>
                <FlatList
                    data={list.map(ingredient => ingredient)}
                    renderItem={({ item }) => <ListIngredient key={item._id} ingredient={item} listId={listId} onListUpdated={loadList} baseURL={baseURL} />}
                    ListHeaderComponent={<AddItemToList onItemAdded={loadList} listId={listId} baseURL={baseURL} />} />
                

            </SafeAreaView>

        </>


    );
}
