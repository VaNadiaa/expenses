import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./app/root";
import { CategoryPage } from "./components/categoryPage/CategoryPage";
import { StatisticsPage } from "./components/statisticsPage/StatisticsPage";
import HomePage from "./components/homePage/HomePage";
import { ExpensePage } from "./components/expensesPage/ExpensePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/expense",
    element: <ExpensePage />,
  },
  {
    path: "/category",
    element: <CategoryPage />,
  },
  {
    path: "/statistics",
    element: <StatisticsPage />,
  },
]);

function App() {
  return (
    <BrowserRouter basename="/expenses">
      <RouterProvider router={router}></RouterProvider>
    </BrowserRouter>
  );
}

export default App;
