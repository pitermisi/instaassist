"use client";

export default function LogoutButton() {
  return (
    <form action="/api/auth/logout" method="POST">
      <button
        type="submit"
        className="px-6 py-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium"
      >
        Logout
      </button>
    </form>
  );
}
