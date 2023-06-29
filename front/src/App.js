import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PostsRootLayoutPage from "./pages/PostsRootLayoutPage";
import PostsPage from "./pages/PostsPage";
import PostDetailPage from "./pages/PostDetailPage";
import EditPostPage from "./pages/EditPostPage";
import NewPostPage from "./pages/NewPostPage";
import AuthPage from "./pages/AuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        element: <PostsRootLayoutPage />,
        children: [
          {
            index: true,
            element: <PostsPage />,
          },
          {
            path: ":postId",
            id: "post-detail",
            children: [
              {
                index: true,
                element: <PostDetailPage />,
              },
              {
                path: "edit",
                element: <EditPostPage />,
              },
            ],
          },
          {
            path: "new",
            element: <NewPostPage />,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "logout",
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
