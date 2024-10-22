import React from 'react'
import axios from 'axios'
import { ListItem, Button, Icon, Text } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'




export function ItemInList({ item, baseURL, onListUpdated }) {
  const navigation = useNavigation()

  async function handleDelete() {
    await axios.delete(`${baseURL}/${item._id}`)
    onListUpdated();
  }


  return (
    <ListItem.Swipeable
      onPress={() => navigation.navigate('IngredientDetails', { id: item._id })}
      onLongPress={() => console.log('long press')}
      
      rightContent={(reset) => (
        <Button
          title="Delete"
          onPress={handleDelete}
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
        />
      )}
    >

      <Icon name="shopping-cart" />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.group}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  )
}
