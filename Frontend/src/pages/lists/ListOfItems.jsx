import List from '@mui/material/List';
import { AddItemToList } from './AddItemToList';
import { ListIngredient } from '../../components/ListIngredient';

export function ListOfItems({ list, listId, loadList }) {
    return (
        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
            {list.map((ingredient) => {
                return (
                    <ListIngredient key={ingredient._id} ingredient={ingredient} listId={listId} onListUpdated={loadList} />
                );
            })}
            <AddItemToList onItemAdded={loadList} listId={listId} />

        </List>



    );
}
