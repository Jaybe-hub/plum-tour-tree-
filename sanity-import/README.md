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
Create tours in Studio and upload `cover.jpg` as the Tour image and the other photos in the folder as Gallery. Fill in the real duration, price and dates yourself, as these were not provided. Choose the category (e.g. Cultural Journeys for Olumo Rock, City Explorers or Wildlife and Safari for Zuma Rock), then tick Featured and Published.
