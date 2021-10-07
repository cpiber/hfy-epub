# r/HFY epub

This is an EPUB-generator for the popular subreddit [r/HFY](https://reddit.com/r/HFY).

---

Planned features:
- Support other subreddits
- Edit book chapters
- Title page, cover
- Companion browser extension for non-reddit content
- Maybe bot (reddit, discord?)

Completed features:
- Faster chapter download
- Build book from "Next" links


## How it works

Everything is right in your browser, data is gathered using the reddit API.

This web app fetches all the data from reddit directly in your browser and converts it to an epub there using [epub-gen-memory](https://github.com/cpiber/epub-gen-memory).

None of the data is saved anywhere on the internet. In the future, parts of the data will be saved locally in your browser to allow navigation and reloads without data loss.
