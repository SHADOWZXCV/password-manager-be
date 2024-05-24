# Password manager server
## Functionality & Purpose
A password manager system built for managing passwords. The user can add new passwords to their account, organize them in categories and sub-categories, and search for a specific password. The user can also import and export passwords.

#### Features:

- **Adding passwords:** The user can add new passwords to their account.

- **Organizing passwords:** The user can organize their passwords in categories and sub-categories.

- **Searching passwords:** The user can search for a specific password.

- **Importing passwords:** The user can import passwords from a file.

- **Exporting passwords:** The user can export passwords to a file.

#### TODO:
- [ ] Lots
- [ ] And lots of features.

## Architecture
### Folder structure:
<pre>
|- route
    |-- index.js
    |-- {specific_route_folder}/index.js
|- controller 
    |-- authentication
    |-- protected
|- middleware
|- config
|- model
    |-- schema.js
    |-- {models}.js
|- index.js 
</pre>

### Connections & interactions:
![Alt text](public/image.png)
The server runs like so:
<pre>index.js -> route/index.js -> route/{right_folder}/index.js -> controller ( or middleware folder ) -> <- {model}</pre>


## How to use
1. Install the server:
    ```bash
    npm install
    ```
2. Setup your .env file in root directory:
    ```bash
    NODE_ENV = 'development or production'
    DBUri = 'DBUri'
    SS = 'session_secret(use-a-128-bit-good-secret)'
    dbName = 'dbName'
    origin = 'the_front_end_uri_of_the_system'
    googleEmailPass = 'google_email_pass_for_sending_emails'
    # 3 hrs session time for school in ms
    sessionTTLSchool = 10800000 #put school account session timeout in here in `ms`
    ```
3. Run the server:
    ```bash
    npm run dev
    ```