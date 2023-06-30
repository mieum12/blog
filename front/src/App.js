import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PostsRootLayoutPage from "./pages/PostsRootLayoutPage";
import PostsPage, { loader as postsLoader } from "./pages/PostsPage";
import PostDetailPage, {
  loader as postDetailLoader,
  action as deletePostAction,
} from "./pages/PostDetailPage";
import EditPostPage from "./pages/EditPostPage";
import NewPostPage from "./pages/NewPostPage";
import AuthPage, { action as authAction } from "./pages/AuthPage";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import { action as logoutAction } from "./pages/Logout";
import { action as manipulatePostAction } from "./components/PostForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />,
    loader: tokenLoader,
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
            loader: postsLoader,
          },
          {
            path: ":postId",
            id: "post-detail",
            loader: postDetailLoader,
            children: [
              {
                index: true,
                element: <PostDetailPage />,
                action: deletePostAction,
              },
              {
                path: "edit",
                element: <EditPostPage />,
                loader: checkAuthLoader,
                action: manipulatePostAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewPostPage />,
            loader: checkAuthLoader,
            action: manipulatePostAction,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
