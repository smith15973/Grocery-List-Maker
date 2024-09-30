import Dropdown from 'react-native-input-select';
import { useEffect, useState } from "react"
import axios from "axios";
import { Text, View, Pressable } from "react-native";


export function ListSelect({ onListNameChange, listName }) {

    const [listOptions, setListOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');




    useEffect(() => {
        loadLists()
    }, [])

    async function loadLists() {
        try {
            const response = await axios.get('http://localhost:3000/lists');
            setListOptions(response.data.map(list => ({ label: list.name, value: list._id })));
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View>
            <Dropdown
                dropdownStyle={{ minHeight: 65 }}
                placeholder="Select List"
                options={listOptions}
                selectedValue={listName}
                onValueChange={(value) => { onListNameChange(value) }}
                isSearchable
                primaryColor={'deepskyblue'}
                listEmptyComponent={
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 10,
                        }}>
                        <Pressable
                            onPress={() => {
                                onListNameChange(searchTerm)
                                setListOptions([
                                    ...listOptions,
                                    { label: searchTerm, value: searchTerm },
                                ]);


                            }}
                            style={{
                                backgroundColor: 'red',
                                borderRadius: 5,
                                width: 120,
                                padding: 5,
                            }}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>
                                Create List
                            </Text>
                        </Pressable>
                    </View>
                }
                searchControls={{
                    searchCallback: value => { setSearchTerm(value) },
                    textInputProps: { placeholder: 'Search or Add items' }
                }}
            />
        </View>
    );
}
