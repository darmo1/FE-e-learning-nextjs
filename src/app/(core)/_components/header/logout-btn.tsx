"use client";

export const LogoutBtn = () => {
  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <button
      type="button"
      onClick={logout}
      className="ml-1 rounded-md border border-white/20 px-3.5 py-1.5 text-sm text-gray-300 transition-colors hover:border-white/40 hover:text-white"
    >
      Salir
    </button>
  );
};
