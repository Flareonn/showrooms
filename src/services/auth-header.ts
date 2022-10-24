export default function authHeader(): { Authorization: string } | {} {
  const token = localStorage.getItem("user");
  if (token) {
    let user = JSON.parse(token);

    if (user && user.auth_token) {
      // for Node.js Express back-end
      return { Authorization: `Token ${user.auth_token}` };
    }
  }
  return {};
}
