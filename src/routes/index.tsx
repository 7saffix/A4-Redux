import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "@/pages/Home";
import AddBook from "@/pages/AddBook";
import AllBooks from "@/pages/AllBooks";
import BorrowList from "@/pages/BorrowList";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/add-book",
        Component: AddBook,
      },
      {
        path: "/books",
        Component: AllBooks,
      },
      {
        path: "/borrow-summary",
        Component: BorrowList,
      },
    ],
  },
]);

export default router;
