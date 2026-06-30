# Ben L Torres — personal site

A finished Astro site, built from the design prototypes. You do not need to install
anything. Everything below happens in the browser.

## Put it online (browser only, ~10 minutes)

1. Go to **github.com**, create a new empty repository (e.g. `ben-torres-site`).
2. On the repo page, click **Add file → Upload files**. Drag in *the contents of this
   folder* (the `src` folder, `public`, `package.json`, etc. — not the outer folder
   itself). Commit.
3. Go to **vercel.com**, sign in with GitHub, click **Add New → Project**, and import
   the repo. Vercel detects Astro automatically. Click **Deploy**.
4. You get a live URL in about a minute. Point your domain at it from Vercel's
   dashboard whenever you're ready (same idea as tampasma.com).

Cloudflare Pages works identically if you prefer it (build command `npm run build`,
output directory `dist`).

## Add a post (also browser only)

1. On github.com, open `src/content/posts/` and the folder for the section you want
   (`longform`, `short-articles`, `collaborations`, or `musings`).
2. Click **Add file → Create new file**. Name it something like `my-post.md`.
3. Paste this at the top, edit it, then write your post below:

   ```
   ---
   title: "Your title"
   date: 2026-07-01
   section: longform
   category: "Opinion Paper"
   dek: "One line that shows up in the list and under the title."
   ---

   Your writing starts here. Plain text. ## makes a heading.
   ```

4. Commit. Vercel rebuilds and the post is live in a minute. It shows up in the right
   list, gets its own page, and the filters update on their own. Musings can skip the
   `category` line.

Projects work the same way under `src/content/projects/` (use `domain: professional`
or `domain: personal`).

## Drop these in when you have them

- `public/Ben-Torres-Resume.pdf` — your real résumé (the button already points here).
- A real photo for the hero, in place of the `BLT` monogram (in `src/pages/index.astro`).
- A name and link for the "Coming soon" button (also in `index.astro`).

## If a build fails

Astro updates often. If the deploy throws an error, copy the error text and send it
to Claude — these are almost always a one-line fix. Common one: if it complains about
the content config location, move `src/content/config.ts` to `src/content.config.ts`.
