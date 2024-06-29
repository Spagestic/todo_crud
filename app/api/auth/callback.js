// app/api/auth/callback.js
import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { redirectTo: "/" });
      // Here, you can call your /api/user route to update the database
      // For example, by fetching /api/user with the user's email and name
      // Ensure the fetch URL is absolute when calling from server-side in Next.js
      const absoluteUrl = new URL(
        "/api/user",
        `http://${req.headers.host}`
      ).toString();
      await fetch(absoluteUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: req.user.name,
          email: req.user.email,
        }),
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
