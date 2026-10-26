# Sanity import package — Plum Tree Tours

Contents
- `gallery.ndjson` – 23 gallery photos with captions (published).
- `blog.ndjson` – 3 blog drafts (NOT published; `isPublished` is false so nothing shows on the site until you switch it on).
- `images/gallery/`, `images/tours/olumo-rock/`, `images/tours/zuma-rock/` – optimised photos.

## Import (Windows, one line at a time)
1. Open Command Prompt in the project folder (the one with package.json).
2. `cd sanity-import`
3. `npx sanity dataset import gallery.ndjson production`
4. `npx sanity dataset import blog.ndjson production`
   - Log in if asked (use the same login you use for Sanity Studio).
   - If it says documents already exist, add `--replace` at the end.
5. `cd ..`
6. Run `npx sanity dev`, open http://localhost:3333 and check Gallery Image and Blog Post.

## Blog drafts
Open each post in Studio, read it, fix anything you disagree with, then tick "Published (visible on site)" and Publish.

## Add the Olumo Rock and Zuma Rock tours
1. `npx sanity dataset import tours.ndjson production`  (run from inside `sanity-import`)
2. This creates two published, featured tours with cover photo and gallery: "Olumo Rock, Abeokuta" (Cultural Journeys) and "Zuma Rock, Abuja" (Wildlife and Safari).
3. Duration is set to 1 day only because Studio requires a number. Price is blank, so the site shows "Price on request". Edit both in Studio when you have real details.
4. You already had an Olumo Rock tour in Studio. Open it and untick "Published" (or delete it) so Olumo doesn't appear twice.
5. Category can be changed in Studio if you prefer another one for Zuma Rock.
