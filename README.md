# Simple To-Do App

A small, beginner-friendly to-do list built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

## Features

- Add tasks
- Mark tasks complete (and uncheck them)
- Delete tasks
- Tasks are saved in your browser's `localStorage`, so they survive a page refresh
- Responsive layout that works on phones and desktops

## How to run

**Option 1 — just open it:** double-click `index.html` to open it in your browser.

**Option 2 — local server (recommended):**

```bash
# Python 3
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

In VS Code you can also use the **Live Server** extension: right-click `index.html` → *Open with Live Server*.

## Project structure

```
index.html   – page markup
style.css    – styles
script.js    – app logic and localStorage saving
```

## Screenshot

![Screenshot of the to-do app](screenshot.png)

<!-- Replace screenshot.png with a real screenshot of the app -->

## License

[MIT](LICENSE)
