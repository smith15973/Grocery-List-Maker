import './App.css'
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Recipes } from './pages/recipes/Recipes'
import { Landing } from './pages/Landing'
import { NewRecipe } from './pages/recipes/NewRecipe'
import { Recipe } from './pages/recipes/Recipe'
import { Lists } from './pages/lists/Lists'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="/recipes/new" element={<NewRecipe />} />

        <Route path="/lists" element={<Lists />} />
      </Routes>
    </Router>
  )
}

export default App
