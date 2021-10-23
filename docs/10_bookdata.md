# Book Data

[Back to index](index.md)

---

This page is mostly a summary page, but also a hub to access further functionality.

In the middle of the view you will see a card displaying title, author and number of chapters. If you want to see more information on the chapters, clicking "show" will display the titles and links of the chapters below. The title of the book is linked to the source of the book, i.e. the wiki page or post where data was initially extracted from.

The button "Find more" can be used to include more chapters in the book: If you click this, the app will download the latest chapter in the list and see if it can find a "Next chapter" button[^1]. This is repeated until no more new chapters can be found.

Below the card, you will see two buttons. If you came from [Search](01_search.md), you should also see a link "Back to Search" to get back to the results page.

The first of the buttons is either "Fetch chapter contents" or "Generate EPUB". You will see the former if at least one chapter still needs to be downloaded. This only happens if you generate the book from a series page or search, since only the links to the chapters are gathered at that point, or if you enable "fetch contents" during editing. If using a post, the content already had to be downloaded. *Tip*: You can mix series page/search and "Find more". The app will automatically download the last chapter and fetch more chapters from there. This can be useful if the wiki isn't up-to-date.

Note that a big advantage of using wiki pages over posts (with "Fetch more") is that the series page contains *all* links. This means that chapters can be downloaded in parallel, so this way is much faster.

If you see "Generate EPUB", your book is ready to be exported. After clicking here, you will see a "Download" button. The library used will also try to download included images and embed them into the book. Currently, no title page is generated, this will change in a future update.

Last but no least, the button "Edit book" will take you to [Edit Book](11_editbook.md).


[^1]: As there is no consensus on how to format chapter links, this app implements some fallback. It first tries to find a link starting with "Next". If it does not find one, it will use the last comment link (post) that does not start with "First", "Index" or "Prev" (Previous), all case-insensitive.