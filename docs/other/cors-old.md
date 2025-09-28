# CORS

[Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Glossary/CORS) is a security mechanism browsers employ.
It prevents one webpage from reading the contents of another page unless explicitly allowed.
This, for example, disallows a phishing site to read your bank details.

Since many book-hosting sites are not built with content sharing in mind, they do not usually expose their data to us.
Thus, for many pages it is impossible to read the chapters.
For reddit, there is an API which exposes this, and this app uses the API to get around the limit (but the API request limit applies).

## Workarounds

For now, please use a generic extension for your browser to add CORS headers.

My recommended plugin is "[cors-plugin](https://addons.mozilla.org/en-US/firefox/addon/cors-plugin)" (Firefox only) for fine-grained control or "Allow CORS: Access-Control-Allow-Origin" ([Firefox](https://addons.mozilla.org/en-US/firefox/addon/access-control-allow-origin), [Chrome/Edge/Opera](https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)) for a general toggle.

The former plugin allows to only enable CORS for a selected range of pages, e.g. only give access to RoyalRoad.
This mitigates the security impact of using these plugins.

### Cors-Plugin

After installing the plugin, click on the new icon in your browser toolbar.
In the new window, remove `<all_urls>` on the bottom (this would allow access to all pages).
In the textbox above, add your allowed pages, e.g. to allow all RoyalRoad access add `https://www.royalroad.com/*`, that is, simply take the homepage and append `*`.
Don't forget to click the `+`-button.

At the end, use the toggle at the top to enable access.
It is recommended to disable the toggle again once you are done.

### Allow CORS plugin

After installing the plugin, click on the new icon in your browser toolbar.
Press the big `C:` on the left of the popup.

Once you are done, **make sure to disable CORS again** by pressing the `C:` again.
Leaving the toggle enabled is a serious security risk!