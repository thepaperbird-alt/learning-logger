# 🚀 Deployment Guide (Vercel)

Your app is ready to go public! Follow these steps to host it for free.

## Phase 1: Push to GitHub
1.  **Create a new Repository** on [GitHub](https://github.com/new).
    -   Name it `learning-logger`.
    -   Make it **Public** (or Private).
    -   **DO NOT** add README, .gitignore, or License (we have them).
2.  **Push your code**:
    Copy the commands GitHub gives you under "…or push an existing repository from the command line" and run them in your terminal here:
    ```bash
    git remote add origin https://github.com/[YOUR_USERNAME]/learning-logger.git
    git branch -M main
    git push -u origin main
    ```

## Phase 2: Deploy on Vercel
1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Select your `learning-logger` repo and click **Import**.

## Phase 3: Connect Database (CRITICAL!)
Before clicking "Deploy", you used configure the Environment Variables so Vercel can talk to Supabase.
1.  Open the **"Environment Variables"** section (it's a dropdown in the deploy screen).
2.  Add these two variables (Copy them from your `.env` file):
    *   `VITE_SUPABASE_URL`: `https://psfdrqksjmnhhebtfnwh.supabase.co`
    *   `VITE_SUPABASE_ANON_KEY`: (Your long key starting with `ey...`)
3.  Click **Deploy**.

## Phase 4: Share!
Vercel will give you a link (e.g., `learning-logger.vercel.app`).
-   Open it on your phone.
-   Open it on your laptop.
-   **It all syncs!** ✨
