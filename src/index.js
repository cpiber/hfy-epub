import App from "./App.svelte";
let app;
try {
  app = new App({
    target: document.body,
  });
} catch (err) {
  const errorNode = document.createElement('div');
  errorNode.className = 'fatal-error';
  errorNode.ariaLabel = 'error';
  errorNode.appendChild(document.createElement('h1')).textContent = 'Something went wrong:';
  errorNode.appendChild(document.createElement('code')).textContent = err;
  document.body.appendChild(errorNode);
}
export default app;
