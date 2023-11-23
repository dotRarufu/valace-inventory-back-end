<h1 id="title" align="center">ValAce Inventory Back-end</h1>

<p id="description">a server application for Valenzuela City Library inventory system</p>

<h2>🔨 Installation</h2>

<p>1. Install packages</p>

```
npm install --force
```

<p>2. Download <a href="https://github.com/pocketbase/pocketbase/releases">PocketBase v0.16.7 or up </a></p>
<p>Put it in <code>pocketbase</code> folder</p>

<h2>⚙️ Setup</h2>

<p>1. Create <code>.env</code> file in root with these:</p>

| Key                | Example          | Description                     |
| ------------------ | ---------------- | ------------------------------- |
| POCKETBASE_ADDRESS | 192.168.1.8:8090 | Address of pocketbase instance  |
| IP                 | 172.17.0.1       | IP to be used by back-end app   |
| PORT               | 3002             | Port to be used by back-end app |

<p>2. Start Pocketbase instance</p>

```
npm run pb
```

<p>3. Setup Pocketbase </p>
<p>a. In you browser, go to <code>{POCKETBASE_ADDRESS}/_</code> and setup an admin account</p>
<p>b. Load <code>pocketbase/pb_schema.json</code> in <code>Settings > Import collections </code> </p>

<p>4. Update environmental variables </p>

| Key                | Example                                              | Description                                                    |
| ------------------ | ---------------------------------------------------- | -------------------------------------------------------------- |
| ADMIN_EMAIL        | <div style="display: inline">admin1@email.com </div> | Admin email for generating types and service authentication    |
| ADMIN_PASSWORD     | admin1password                                       | Admin password for generating types and service authentication |

<p>Put these variables in <code>.env</code></p>

<h2>🏃 Run</h2>

<p>1. Build</p>

```
npm run build
```

<p>2. Run</p>

```
npm run start
```

<h2>💻 Built with</h2>

- React
- Pocketbase
- Tailwind
- DaisyUI
