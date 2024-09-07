import axios from 'axios';
import { ListItem, Icon, Button } from '@rneui/themed';

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
        <ListItem.Swipeable bottomDivider
        
        // onPress={() => navigation.navigate('List', { id: list._id })}
      onLongPress={() => console.log('long press')}
      leftContent={(reset) => (
        <Button
          title="Info"
          onPress={() => reset()}
          icon={{ name: 'info', color: 'white' }}
          buttonStyle={{ minHeight: '100%' }}
        />
      )}
      rightContent={(reset) => (
        <Button
          title="Delete"
          onPress={() => handleDelete(ingredient._id)}
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
        />
      )}
        
        
        
        >
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
        </ListItem.Swipeable>
    );
}
