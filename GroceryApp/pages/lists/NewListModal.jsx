import React, { useState } from 'react';
import { Button, Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';

export function NewListModal({ onListCreated }) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [list, setList] = useState({ name: '', notes: '' });

    async function createList() {
        const response = await axios.post('http://localhost:3000/lists', list)
        setModalVisible(false);
        onListCreated()
        setList({ name: '', notes: '' })
        navigation.navigate('List', { id: response.data._id })
    }

    function handleChange(name, text) {
        setList({ ...list, [name]: text });
    }
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(false);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput autoFocus={true} style={styles.input} width="100%" onChangeText={text => handleChange("name", text)} value={list.name} multiline={false} placeholder="List Title" />
                        <TextInput style={styles.input} onChangeText={text => handleChange("notes", text)} value={list.notes} multiline={true} placeholder="Notes" />
                        <View style={styles.buttonContainer} >
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(false)}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                            <Pressable

                                style={[styles.button, styles.buttonOpen]}
                                onPress={createList}>
                                <Text style={styles.textStyle}>Create List</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Button onPress={() => setModalVisible(true)} title="Create New List"></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 8,
        width: '100%',
        borderBottom: 0,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});