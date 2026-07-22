import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import router from "./app.routes";
import { RouterProvider } from "react-router";
import { useDispatch } from "react-redux";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, setLogout } from "./store/features/auth/authSlice";
import { signIn } from "./features/auth/services/auth.api";
import { history } from "./features/recipe/services/recipe.api";
import { setRecipes } from "./store/features/recipe/recipeSlice";

const App = () => {
  const dispatch = useDispatch();
  const [isCheckingAuth, setisCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const data = await signIn(token);
        const recipeData = await history(token);
        dispatch(
          setUser({
            user: {
              email: firebaseUser.email,
              username: firebaseUser.displayName,
              fullname: data.user.fullname,
              joinDate: data.user.joinDate,
            },
            token: token,
          }),
        );
        dispatch(setRecipes(recipeData.recipes));
      } else {
        dispatch(setLogout());
      }
      setisCheckingAuth(false);
    });
    return unsubscribe;
  }, [dispatch]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold text-[#539144]">
          Loading RecipeAI...
        </h2>
      </div>
    );
  }

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
