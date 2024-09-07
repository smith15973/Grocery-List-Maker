import axios from 'axios'
import { ScrollView, Button } from 'react-native';
import { useEffect, useState } from 'react'
import { IngredientSelect } from '../lists/IngredientSelect';
import { IngredientQuantityInput } from '../lists/IngredientQuantityInput';
import { IngredientUnitSelect } from '../lists/IngredientUnitSelect';
import { ListItem } from '@rneui/themed'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from '@rneui/base';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';




export function NewRecipe() {
  const navigation = useNavigation();

  navigation.setOptions({ headerRight: () => <Button title="Save" onPress={handleSubmit} /> });

  const [recipeForm, setRecipeForm] = useState({
    name: '',
    description: '',
    type: '',
    ingredients: [],
  });

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    loadIngredients();
  }, []);

  async function loadIngredients() {
    const response = await axios.get('http://localhost:3000/ingredients');
    setIngredients(response.data);
  }

  function handleChange(name, value) {
    setRecipeForm({ ...recipeForm, [name]: value });
  }

  function handleIngredientChange(index, e) {
    const { name, value } = e.target;
    const newIngredients = [...recipeForm.ingredients];
    newIngredients[index] = { ...newIngredients[index], [name]: value };
    setRecipeForm({ ...recipeForm, ingredients: newIngredients });
  }

  function handleRemoveIngredient(index) {
    const newIngredients = [...recipeForm.ingredients];
    newIngredients.splice(index, 1); // Remove the ingredient at the given index
    setRecipeForm({ ...recipeForm, ingredients: newIngredients });
  }

  function addIngredient() {
    setRecipeForm({
      ...recipeForm,
      ingredients: [...recipeForm.ingredients, { item: '', quantity: '', unit: '' }],
    });
  }

  async function handleSubmit(e) {
    try {
      const response = await axios.post('http://localhost:3000/recipes', recipeForm);
      navigation.navigate('Recipe', { id: response.data._id })
    } catch (e) {
      console.log(e);
    }
  }


  const [addIngredientForm, setAddIngredientForm] = useState({ item: '', quantity: '', unit: '' })

  function handleAddIngredientFormChange(name, value) {
    setAddIngredientForm({ ...addIngredientForm, [name]: value });
  }

  function handleAddIngredient() {
    if (addIngredientForm.item === '' || addIngredientForm.quantity === '' || addIngredientForm.unit === '') {
      return
    }
    setRecipeForm({ ...recipeForm, ingredients: [...recipeForm.ingredients, addIngredientForm] })
    setAddIngredientForm({ item: '', quantity: '', unit: '' })
  }

  return (

    <ScrollView>
      <TextInput
        type="text"
        name="name"
        placeholder="Recipe Name"
        value={recipeForm.name}
        required
        onChangeText={text => handleChange("name", text)}
        
      />
      {recipeForm.ingredients.map(ingredient => {
        return (
          <ListItem.Swipeable bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{ingredient.item}</ListItem.Title>
              <ListItem.Subtitle>{ingredient.quantity} {ingredient.unit}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem.Swipeable>
        )
      })}
      <ListItem bottomDivider>

        <ListItem.Content style={{ width: '100%', flexDirection: 'row', alignItems: 'top', height: 64 }}>

          <IngredientSelect
            onAddIngredientFormUpdated={handleAddIngredientFormChange}
            addIngredientForm={addIngredientForm}
            style={{ width: '40%' }}
          />
          <IngredientQuantityInput
            onAddIngredientFormUpdated={handleAddIngredientFormChange}
            addIngredientForm={addIngredientForm}
            style={{
              backgroundColor: '#F7F7F7',
              marginLeft: 0,
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 8,
              padding: 23,
              width: '25%',
            }}
          />
          <IngredientUnitSelect
            onAddIngredientFormUpdated={handleAddIngredientFormChange}
            addIngredientForm={addIngredientForm}
            style={{ width: '35%' }}
          />
        </ListItem.Content>

        <Icon
          name='plus'
          type='material-community'
          size={20}
          onPress={handleAddIngredient}
        />
      </ListItem>



      {/* <NewIngredient onIngredientAdded={loadIngredients} />
      <a href="#/recipes">Back to Recipes</a>
      <h2>New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={recipeForm.name}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={recipeForm.description}
          onChange={handleChange}
        />
        <select
          onChange={handleChange}
          value={recipeForm.type}
          name="type">
          <option value="">Select...</option>
          <option value="Main">Main</option>
          <option value="Side">Side</option>
          <option value="Dessert">Dessert</option>
          <option value="Snack">Snack</option>
          <option value="Drink">Drink</option>
        </select>
        <br />
        <AddIngredient
          ingredients={ingredients}
          recipeIngredients={recipeForm.ingredients}
          onIngredientChange={handleIngredientChange}
          onRemoveIngredient={handleRemoveIngredient}
          onAddIngredient={addIngredient} />
        <br />
        <button type="submit">Add Recipe</button>
      </form> */}
    </ScrollView>


  );
}
