import Dropdown from 'react-native-input-select';
import { View } from 'react-native';

export function IngredientUnitSelect({ onAddIngredientFormUpdated, addIngredientForm, style }) {

    return (
        <View style={style}>
            <Dropdown
                placeholder="Units"
                options={[
                    { value: 'lbs', label: 'lbs' },
                    { value: 'cups', label: 'cups' },
                    { value: 'oz', label: 'oz' }
                ]}
                selectedValue={addIngredientForm.unit}
                onValueChange={(value) => onAddIngredientFormUpdated('unit', value)}
                primaryColor={'black'}
            />
        </View>
    );
}
