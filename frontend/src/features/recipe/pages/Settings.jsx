import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faBroom,
  faRightFromBracket,
  faBell,
  faCircleExclamation,
  faCalendarDays,
  faUtensils,
  faBookmark,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../store/features/auth/authSlice";
import { auth } from "../../../config/firebase";
import { deleteAccount } from "../../auth/services/auth.api";
import { flushAllHistory } from "../services/recipe.api";
import { clearRecipes } from "../../../store/features/recipe/recipeSlice";

const Settings = () => {
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isFlushing, setIsFlushing] = useState(false);

  const { user, token } = useSelector((state) => state.auth);
  const { recipes } = useSelector((state) => state.recipe);
  const dispatch = useDispatch();

  // --- Mock Handlers ---

  const handleLogout = async () => {
    await auth.signOut();
    dispatch(setLogout());
    navigate("/login");
  };

  const handleFlushData = async () => {
    if (
      !window.confirm(
        "Are you sure you want to clear all your saved recipes and generation history? This cannot be undone.",
      )
    )
      return;

    try {
      setIsFlushing(true);
      const response = await flushAllHistory(token);

      if (response.success) {
        dispatch(clearRecipes());
        toast.success(response.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error("Failed to flush data");
    } finally {
      setIsFlushing(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmationText = window.prompt(
      "Type 'DELETE' to confirm you want to permanently delete your account.",
    );

    if (confirmationText !== "DELETE") {
      if (confirmationText !== null) toast.error("Account deletion cancelled.");
      return;
    }

    try {
      setIsDeleting(true);

      const response = await deleteAccount(token);

      if (response.success) {
        dispatch(setLogout());
        toast.success(response.message);
        navigate("/signup");
      }
    } catch (error) {
      toast.error("Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 min-h-[calc(100vh-100px)]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Settings</h1>
        <p className="text-gray-500">
          Manage your account preferences and data.
        </p>
      </div>

      <div className="space-y-6">
        {/* Account Details Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-900">Account Details</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-auto">
              <div>
                <p className="text-sm font-semibold text-gray-500">Full Name</p>
                <p className="text-gray-900 font-medium mt-1">
                  {user?.fullname}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Username</p>
                <p className="text-gray-900 font-medium mt-1">
                  @{user?.username}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Email Address
                </p>
                <p className="text-gray-900 font-medium mt-1">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Activity & Stats Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-900">
              Activity & Stats
            </h3>
          </div>
          <div className="px-6 py-6 space-y-5">
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3 text-gray-500 group-hover:text-gray-700 transition-colors">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-lg w-5 text-center"
                />
                <span className="font-medium text-sm">Member Since</span>
              </div>
              <span className="font-semibold text-gray-800 text-sm">
                {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}
              </span>
            </div>

            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3 text-gray-500 group-hover:text-gray-700 transition-colors">
                <FontAwesomeIcon
                  icon={faUtensils}
                  className="text-lg w-5 text-center"
                />
                <span className="font-medium text-sm">Total Recipes</span>
              </div>
              <span className="font-semibold text-gray-800 text-sm">
                {recipes.length}
              </span>
            </div>
          </div>
        </div>

        {/* Preferences Section */}

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
          <div className="p-6 border-b border-red-100 bg-red-50/30">
            <h3 className="flex items-center gap-2 text-lg font-bold text-red-600">
              <FontAwesomeIcon icon={faCircleExclamation} />
              Danger Zone
            </h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Flush Data */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">Flush Recipe Data</p>
                <p className="text-sm text-gray-500">
                  Clear all your saved recipes and generation history. Your
                  account remains active.
                </p>
              </div>
              <button
                onClick={handleFlushData}
                disabled={isFlushing}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg text-sm font-bold transition-colors whitespace-nowrap disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faBroom} />
                {isFlushing ? "Flushing..." : "Flush Data"}
              </button>
            </div>

            <div className="border-t border-gray-100"></div>

            {/* Delete Account */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">Delete Account</p>
                <p className="text-sm text-gray-500">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-bold transition-colors whitespace-nowrap disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faTrash} />
                {isDeleting ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
