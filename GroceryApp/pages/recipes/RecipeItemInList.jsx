import React from 'react'
import axios from 'axios'
import { ListItem, Button, Icon, Text } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'




export function RecipeItemInList({ recipe, onRecipeListUpdated }) {
  const navigation = useNavigation()

  async function handleDelete() {
    await axios.delete(`http://localhost:3000/recipes/${recipe._id}`)
    onRecipeListUpdated();
  }

  const numberOfItems = recipe.ingredients.length;

  return (
    <ListItem.Swipeable
      onPress={() => navigation.navigate('Recipe', { id: recipe._id })}
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
          onPress={handleDelete}
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
        />
      )}
    >
      <Icon name="menu-book" />
      <ListItem.Content>
        <ListItem.Title>{recipe.name}</ListItem.Title>
        <ListItem.Subtitle>{`${numberOfItems} total Ingredients`}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  )
}
