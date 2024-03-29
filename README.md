## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes for Devs, data schema:

    **0** - default schema
    **1** - save all references in an object instead of in two separate arrays

## Notes for QA, how to run app locally

1. Download Node.js from: https://nodejs.org/en/download and install it.
2. Use GitExtensions to pull the repository
   - In GitExtension click start (top left corner) and select "Clone repository"
   - Paste the URL of the repo in the "Repository to clone" input field and click "Clone"
   - Click "Yes" when prompted to open the new repository
3. In the Console tab in GitExtensions type:
   - npm install
   - npm run build
   - npm start
     one after the other, NOT all at once. The app should now run on http://localhost:3000/
4. Create **.env** file in the root directory with the following content:
   ```
   HOST=http://localhost:3000/
   NEXT_PUBLIC_HOST=http://localhost:3000/
   ```
