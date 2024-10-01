import React from 'react'
import axios from 'axios'
import { ListItem, Button, Icon, Text } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'




export function ListItemInList({ list, baseURL, onListUpdated }) {
  const navigation = useNavigation()

  async function handleDelete() {
    await axios.delete(`${baseURL}/${list._id}`)
    onListUpdated();
  }

  const numberOfItems = list.ingredients.length;
  const numberOfItemsComplete = list.ingredients.filter((item) => item.complete).length;

  return (
    <ListItem.Swipeable
      onPress={() => navigation.navigate('List', { id: list._id })}
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
      <Icon name="receipt-long" />
      <ListItem.Content>
        <ListItem.Title>{list.name}</ListItem.Title>
        <ListItem.Subtitle>{`${numberOfItemsComplete}/${numberOfItems}`}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  )
}
