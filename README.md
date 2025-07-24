# [hieudm-7998] Kinobi 3rd Round Fullstack Software Engineer Take-home Assessment

This application is deployed at: [https://kinobi-fileupload-client.vercel.app/](https://kinobi-fileupload-client.vercel.app/)

---



## Client-side instruction

Make sure that your `nodejs` version is `22` or higher than `16`.

You can find `nodejs` install package [here](https://nodejs.org/en/download).

Pull this repository to your local machine, open terminal from this source code folder, then run:

```
npm install
```

Please ignore the vulnerabilities warning (due to old version of dependency packages).

Run this command to open the application on local:

```
npm run dev
```

If you see this log, you are ready to open the application on your browser:

```
╭───────────────────────────────────────────────────────╮
│                                                       │
│   Nuxt @ v2.18.1                                      │
│                                                       │
│   ▸ Environment: development                          │
│   ▸ Rendering:   client-side                          │
│   ▸ Target:      server                               │
│                                                       │
│   Listening: http://localhost:3000/                   │
│                                                       │
│   Tailwind Viewer: http://localhost:3000/_tailwind/   │
│                                                       │
╰───────────────────────────────────────────────────────╯
√ Builder initialized                                                                                   
√ Nuxt files generated
√ Client
  Compiled successfully in 336.49ms
ℹ Waiting for file changes                                                                                   
ℹ Memory usage: 391 MB (RSS: 1 GB)             
ℹ Listening on: http://localhost:3000/
```

**Note**: The deployed version is using deployed API as base URL for API calling. If you ran the server source code before, please add `.env` file in root folder and add this line:

```
API_BASE_URL=http://localhost:3001
```

---



## Breakdowns

* This project is using *Nuxt 2* and *Vuejs 2* (this takes a lot of time for me to find a way to downgrade it without errors 🤕)
* Add *Typescript* also use *defineComponent* across components.
* Add *Vuetify 2* and *TailwindCSS* for styling, the font used in application is *Be Vietnam Pro* (shout out to my country 🇻🇳)
* Add *Zod* to create schema, let it parse through API response before sending data to components.
* Add some global constants such as API base URL, valid file format to easily change it globally.
* The image input only takes `.jpg`, `.jpeg` or `.png` format.
* Handling drag and drop files into the input instead of manually browsing it.
* This is not required, but I can do it to enhance the UX: Add options menu for each image like *View Detail*, *Download*, *Duplicate* and *Delete*.


## Credit

Jake (Hieu Do Minh)

hieudm.7998@gmail.com

[https://jakedo-portfolio.vercel.app/](https://jakedo-portfolio.vercel.app/)
