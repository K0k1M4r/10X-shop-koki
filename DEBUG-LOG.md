# DEBUG-LOG

Bug 1: "Missing script: dev"
Symptom: npm run dev said Missing script "dev".
How I reproduced it: ran the command from the wrong folder.
Tool: the terminal error, then dir.
Cause: I ran my installs one folder too high, so the outer folder had its own package.json and node_modules but no Vite project.
Fix: moved into 10x-shop-koki and installed there. (no commit, setup mistake)
What I learned: check the folder with dir before running npm commands.

Bug 2: Blank page, "Invalid hook call"
Symptom: the page was blank and the console said "Invalid hook call" and "Cannot read properties of null (reading 'useRef')".
How I reproduced it: npm run dev after adding the router.
Tool: browser console (F12), then npm ls react.
Cause: two copies of React, because of the extra install in the outer folder.
Fix: deleted node_modules and reinstalled inside the project, then installed tailwindcss, @tailwindcss/vite and react-router-dom there. Commit: ____
What I learned: two copies of React make hooks break.

Bug 3: Import warning in main.tsx
Symptom: yellow underline on the AuthProvider import.
How I reproduced it: opened main.tsx.
Tool: hovering over it in VS Code and the Problems tab.
Cause: wrong path (../src/context/... instead of ./context/...), and AuthProvider was imported but not used yet.
Fix: corrected the path and wrapped <App /> in <AuthProvider>. Commit: ____
What I learned: paths are relative to the current file.

Bug 4: Lint errors from .history
Symptom: npm run lint showed 16 errors, 15 of them in a .history folder.
How I reproduced it: ran npm run lint.
Tool: lint output and git status.
Cause: a VS Code extension saved backup copies of my files and git add . committed them.
Fix: added .history to .gitignore, ran git rm -r --cached .history, and added it to globalIgnores in eslint.config.js. Commit: ____
What I learned: check git status before git add .

Bug 5: Fast refresh lint error
Symptom: lint said "Fast refresh only works when a file only exports components" in AuthContext.tsx.
How I reproduced it: npm run lint.
Tool: lint output.
Cause: the file exports both the context and the provider component.
Fix: added an eslint-disable-next-line comment on the context line. This only affects hot reload while coding, but it is a shortcut. Commit: ____
What I learned: moving the context to its own file would be the proper fix.

Bug 6: Error Boundary test crashed the app
Symptom: the whole app broke when I tested the Error Boundary.
How I reproduced it: added useLocation and a test throw, then opened the app.
Tool: browser console.
Cause: I put useLocation() and the test throw outside their functions, so they ran when the file loaded.
Fix: moved both inside App() and Cart(), then removed the test throw. Commit: ____
What I learned: hooks must be called inside a component.