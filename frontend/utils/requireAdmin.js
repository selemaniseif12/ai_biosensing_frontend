import { getAdminToken } from "./auth";

export default function requireAdmin(router) {
  const token = getAdminToken();

  if (!token) {
    router.push("/admin/login");
    return false;
  }

  return true;
}
