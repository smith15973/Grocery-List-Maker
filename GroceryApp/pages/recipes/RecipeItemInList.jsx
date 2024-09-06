import React from 'react'
import { ListItem, Button, Icon, Text } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'




export function RecipeItemInList({ recipe }) {
  const navigation = useNavigation()

  

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
          onPress={() => reset()}
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
