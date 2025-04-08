"use client";

export const LogoutBtn = () => {
  //const router = useRouter();
  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <button type="button" onClick={logout}>
      logout
    </button>
  );
};
