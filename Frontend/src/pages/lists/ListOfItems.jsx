import List from '@mui/material/List';
import { AddItemToList } from './AddItemToList';
import { ListIngredient } from '../../components/ListIngredient';

export function ListOfItems({ list, listId, loadList, baseURL }) {
    return (
        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
            {list.map((ingredient) => {
                return (
                    <ListIngredient key={ingredient._id} ingredient={ingredient} listId={listId} onListUpdated={loadList} baseURL={baseURL} />
                );
            })}
            <AddItemToList onItemAdded={loadList} listId={listId} baseURL={baseURL} />

        </List>



    );
}
