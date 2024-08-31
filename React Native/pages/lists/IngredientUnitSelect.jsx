import Dropdown from 'react-native-input-select';

export function IngredientUnitSelect({ onAddIngredientFormUpdated, addIngredientForm }) {

    return (
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
            dropdownStyle={{ width: '30%' }}
        />
    );
}
