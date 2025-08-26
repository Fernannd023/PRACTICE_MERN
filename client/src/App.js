import './App.css';
import Recipe from './components/getrecipe/Recipe';
import AddRecipe from './components/addrecipe/AddRecipe';
import UpdateRecipe from './components/updaterecipe/UpdateRecipe';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Recipe/>
    },
    {
      path: "/add",
      element: <AddRecipe/>
    },
    {
      path: "/update/:id",
      element: <UpdateRecipe/>
    }
  ])

    
  return (
    <div className="App">
      
      <header className="App-header">
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>
          Recetas de Cocina 🍳
        </h1>

        <RouterProvider router={route}></RouterProvider>
      </header>
    </div>
    
  );
}



export default App;

