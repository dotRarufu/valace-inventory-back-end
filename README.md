<h1 id="title" align="center">ValAce Inventory Back-end</h1>

<p id="description">a server application for Valenzuela City Library inventory system</p>

<h2>🔨 Installation</h2>

<p>Install packages</p>

```
npm install
```

<h2>⚙️ Setup</h2>

<p>Create <code>.env</code> file in root with these:</p>

| Keys               | Example                   | Description                         |
| ------------------ | ------------------------- | ----------------------------------- |
| POCKETBASE_ADDRESS | http://170.10.31.175:8090 | Address of pocketbase instance      |
| IP                 | 172.17.0.1                | IP to be used by client-side app    |
| PORT               | 3002                      | Port to be used by client-side app  |
| ADMIN_EMAIL        | admin1@email.com          | Admin email for generating types    |
| ADMIN_PASSWORD     | admin1password            | Admin password for generating types |

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
