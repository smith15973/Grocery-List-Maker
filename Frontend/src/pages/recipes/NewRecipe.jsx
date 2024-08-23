import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { NewIngredient } from '../../components/NewIngredient';
import { AddIngredient } from './AddIngredient';



export function NewRecipe() {
  const navigate = useNavigate();

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

  function handleChange(e) {
    const { name, value } = e.target;
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
    e.preventDefault();
    try {
      console.log(recipeForm)
      const response = await axios.post('http://localhost:3000/recipes', recipeForm);
      navigate(`/recipes/${response.data._id}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <a href="#/recipes">Back to Recipes</a>
      <NewIngredient onIngredientAdded={loadIngredients} />
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
      </form>
    </>
  );
}
