# EBUDDY monorepo

## Installation

### 1. **Clone the repo**

```bash
git clone https://github.com/alfredlouisw8/ebuddy-monorepo.git
cd ebuddy-monorepo
yarn install
```

### 2. **Setup Firebase**

Login using `firebase login` if not already logged in.
Create `.firebaserc` inside `apps/backend`

```bash
{
  "projects": {
    "default": "YOUR_PROJECT_ID"
  }
}
```

### 3. **Run the project**

```bash
yarn dev
```

### 4. **Put the Firebase Function URL inside .env in `apps/frontend`**

```bash
NEXT_PUBLIC_API_URL=YOUR_FUNCTION_URL
```

### 5. **Open localhost:3002**

Create new user inside Firebase Auth Emulator, fill Email and password, and Login
