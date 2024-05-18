import {
    createBrowserRouter,

} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import App from "./App";
import BookDetails from "./pages/BookDetails/BookDetails";
import ManageBooks from "./pages/ManageBooks/ManageBooks";
import AddBooks from "./pages/ManageBooks/AddBooks";
import UpdateBooks from "./pages/ManageBooks/UpdateBooks";
import History from "./pages/HistoryBooks/History";
import Request from "./pages/RequestsBooks/Request";
import Add from "./pages/ManageChapters/Add";
import Update from "./pages/ManageChapters/Update";
import Managechapter from "./pages/ManageChapters/Managechapter";
import AddReader from "./pages/ManageReaders/AddReader";
import Guest from "./middleware/Guest";
import Admin from "./middleware/admin";
import UpdateReader from "./pages/ManageReaders/UpdateReader";


export const routes = createBrowserRouter([

    {
        path: "",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: ":id",
                element: <BookDetails />,
            },
            {
                element: <Guest />,
                children: [

                    {
                        path: "/Login",
                        element: <Login />,
                    },

                ]
            },



            {
                path: "/Register",
                element: <Register />,

            },





            {

            },

            {
                path: "/ManageBooks",
                element: <Admin />,
                children: [
                    {
                        path: '',

                        element: <ManageBooks />
                    },
                    {
                        path: 'add',
                        element: <AddBooks />
                    },
                    {
                        path: ':id',
                        element: <UpdateBooks />
                    },


                ],

            },

            {
                path: "Managechapter/:id",
                element: <Managechapter />,



            },


            {
                path: 'Add',
                element: <Add />

            },

            {
                path: 'AddReader',
                element: <AddReader />

            },
            {
                path: "Update/:id",
                element: <Update />

            },

            {
                path: "UpdateReader/:id",
                element: <UpdateReader />

            },


            {
                path: "/History",
                element: <History />

            },



            {
                path: "/Request",
                element: <Request />

            },






        ],
    },
]);