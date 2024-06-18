# Password manager server
## Functionality & Purpose
A password manager system built for managing passwords. The user can add new passwords to their account, organize them in vaults and workspaces, and search for specific passwords. The user can also import and export passwords.

#### Features:
- **Adding passwords:** The user can add new passwords to their account.

- **Organizing passwords:** The user can organize their passwords in vaults & workspaces, also, they can pin it and unpin it.

- **Searching passwords:** The user can search for a specific password by name.

- **Importing passwords:** The user can import passwords from a file.

- **Exporting passwords:** The user can export passwords to a file.

#### TODO:
- [x] User can sign in using google & github.
- [x] Users cannot add to a vault unless it is opened by the key during the session.
- [/] Ability to add - view - update or delete passwords encrypted by AES-256 algorithm.
- [ ] User can create workspaces, and invite users to them via: invitation links, or via account names.
- [ ] Add subscription plans ( free - pro individual: > 100 passwords 
- [ ] Pro workspace features ( >5 users per workspace, > 10 passwords per workspace ) ).
- [ ] Lots
- [ ] And lots of features.

## Architecture
### Folder structure:
<pre>
|- controller 
    |-- authentication
    |-- protected
|- config           # config functions & variables
|- middleware
    |-- config      # middlewares required to run libraries
    |-- joi         # middlewares for joi router validation
    |-- custom      # middlewares with manual logic
    |-- etc..       # middlewares required for server functions
|- prisma           # database schema
|- route
    |-- index.js
    |-- {specific_route_folder}/index.js
    |-- protected/{specific_route_folder}/index.js
|- services         # prisma model services
    |-- {model}
        |--- index.js
|- index.js
</pre>

### Connections & interactions:
![Alt text](public/image.png)
The server runs like so:
<pre>index.js -> route/index.js -> route/{right_folder}/index.js -> controller ( or middleware folder ) -> <- {service}</pre>


## Installation
1. Install the server:
    ```bash
    npm install
    ```
2. Setup your .env file in the root directory:
    ```bash .env
    NODE_ENV = 'development or production'
    DBUri = 'DBUri'
    SS = 'session_secret(use-a-128-bit-good-secret)'
    dbName = 'dbName'
    origin = 'the_front_end_uri_of_the_system'
    googleEmailPass = 'google_email_pass_for_sending_emails'
    GOOGLE_CLIENT_ID = 'insert_yours'
    GOOGLE_CLIENT_SECRET ='insert_yours'
    GOOGLE_CALLBACK_URL = 'http://localhost:3000/auth/google/callback'
    GITHUB_CLIENT_ID = 'insert_yours'
    GITHUB_CLIENT_SECRET = 'insert_yours'
    GITHUB_CALLBACK_URL = 'http://localhost:3000/auth/github/callback'
    AES_KEY = 'generate-a-256-bit-key'
    ```
3. Run the server:
    ```bash
    npm run dev
    ```
