import ItemQuantityInput from "./ItemQuantityInput";
import ItemSelect from "./ItemSelect";
import ItemUnitSelect from "./ItemUnitSelect";



export function ItemInput({ form, onFormUpdate }) {

    return (
        <>
            <ItemSelect onFormUpdated={onFormUpdate} form={form} />
            <ItemQuantityInput onFormUpdated={onFormUpdate} form={form} />
            <ItemUnitSelect onFormUpdated={onFormUpdate} form={form} />
        </>
    )
}