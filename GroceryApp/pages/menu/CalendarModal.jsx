import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import { View, StyleSheet, Modal, Button } from 'react-native';


export function CalendarModal({ name, onDateChange, date }) {
  
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Button title={date.toString().slice(0, 16)} color="green" onPress={() => setOpen(true)} />
      <Modal
        style={styles.container}
        animationType="slide"
        transparent={false}
        visible={open}
        onRequestClose={() => {
          setOpen(false);
        }}

      >
        <View style={styles.centered}>
          <DateTimePicker
            mode="single"
            date={date}
            onChange={(params) => { onDateChange(name, params.date), setOpen(false) }}
          />
        </View>
      </Modal>
    </View>

  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    // backgroundColor: '#F5FCFF',
    justifyContent: 'top',
    alignItems: 'center',
    
    marginTop: 80,
  },
});