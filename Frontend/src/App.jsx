import './App.css'
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Recipes } from './pages/recipes/Recipes'
import { Landing } from './pages/Landing'
import { NewRecipe } from './pages/recipes/NewRecipe'
import { Recipe } from './pages/recipes/Recipe'
import { Lists } from './pages/lists/Lists'
import { Menu } from './pages/menus/Menu'
import { Layout } from './components/Layout'
import { ListMaterial } from './pages/lists/List'

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/recipes/new" element={<NewRecipe />} />

          <Route path="/lists" element={<Lists />} />
          <Route path="/lists/:id" element={<ListMaterial />} />

          <Route path="/menus" element={<Menu />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
