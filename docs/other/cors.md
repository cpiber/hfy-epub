# CORS

*[old version](./cors-old.md)*

[Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Glossary/CORS) is a security mechanism browsers employ.
It prevents one webpage from reading the contents of another page unless explicitly allowed.
This, for example, disallows a phishing site to read your bank details.

Since many book-hosting sites are not built with content sharing in mind, they do not usually expose their data to us.
Thus, for many pages it is impossible to read the chapters.
For reddit, there is an API which exposes this, and this app uses the API to get around the limit (but the API request limit applies).

---

To safely allow access to such pages, the app supports a extension to bypass these limits.
The extension is supported since version 0.4.0.

The extension is available for Chrome (link to be added) and Firefox (link to be added).
It is known to work in Firefox for Android.

Using the extension, the user may try to load any URL.
Upon doing so, the extension asks for consent before allowing access, due to the security implications.
Remember that doing this allows the app to view the page as *you*, including log-in etc.
Do not use this on sensitive content if you are unsure.

Some pages additionally require JavaScript to load content fully.
This is usually visible if the page has a custom loading animation, even after the browser claims the page has loaded.
In such situations, the feature "Use tab to fetch chapters" of the extension can be used to access the page like a regular user.
Additionally, you may specify a [custom query selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors); the extension will wait until the specified element exists (e.g. if the page inserts text after it is done loading).