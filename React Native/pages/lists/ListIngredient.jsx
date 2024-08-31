import axios from 'axios';
import { ListItem, Icon } from '@rneui/themed';

export function ListIngredient({ ingredient, listId, onListUpdated, baseURL }) {
    const handleToggle = (ingredientId) => async () => {
        await axios.put(`${baseURL}/${listId}/toggleCheck`, { ingredientId });
        onListUpdated();
    };

    const handleDelete = async (ingredientId) => {
        await axios.delete(`${baseURL}/${listId}/${ingredientId}`);
        onListUpdated();
    };

    return (
        <ListItem bottomDivider>
            {ingredient.complete !== undefined ? (
                <ListItem.CheckBox
                    iconType="material-community"
                    checkedIcon="checkbox-outline"
                    uncheckedIcon="checkbox-blank-outline"
                    checked={ingredient.complete}
                    checkedColor="green"
                    onPress={handleToggle(ingredient._id)}
                />
            ) : null}

            <ListItem.Content>
                <ListItem.Title>{ingredient.item.name}</ListItem.Title>
                <ListItem.Subtitle>
                    {ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit}` : ''}
                </ListItem.Subtitle>
            </ListItem.Content>
            <Icon
                name="trash-can-outline"
                type="material-community"
                onPress={() => handleDelete(ingredient._id)}
            />
        </ListItem>
    );
}
