# Settings

The app exposes some configuration to customize the behavior.


## Editor

The most basic option to edit chapters is to use a `textedit`.
This displays the raw HTML.

A more advanced editor on the form of TinyMCE is available with the click of a checkbox.
This checkbox is also available in the footer of the application.


## Next chapter

The "Find more"-button on the book overview attempts to extract more chapters by finding a link via heuristic.
The default option uses a fairly involved algorithm; it attempts to find one of those in order:

1. Link with plain "Next" text
1. Last reddit-comment link that is not "Prev", "First" or "Index"
1. Link with non-plain "Next" text (can include HTML styling)
1. Last link that is not "Prev", "First" or "Index"

Other options allow to specify a Regex (with the first capture group capturing the URL) or a custom function.

Each option is run first on the transformed content (see next section), and if that fails, on the original content.

### Function

The function mode allows to enter a generic JS function.
Return the URL with the `return`-keyword.
As globals, `document` (type `HTMLDocument`) and `html` (type `string`) are available to extract the link.


## Chapter transform

Often, not the entire page is interesting.
For reddit posts, only the post content itself is stored, but for other links, only part may be stored.

### Function

Similarly to above, this mode allows to use JS function to transform the chapter.
In addition to `document` and `html` (as above), here also `title` and `url` are available.
Modify the chapter by changing these variables (except `document`).
If you wish to modify the DOM, please remember to update the `html` variable.