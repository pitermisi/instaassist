# Instagram AI Dashboard

A minimal but production-ready MVP for Instagram account management. Users can connect their Instagram account via OAuth and view their profile information.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Frontend**: React 19
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Server-side sessions with secure cookies
- **Instagram API**: Meta Instagram Login (OAuth 2.0)

## Local Installation

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Meta Developer App (with Instagram Login configured)

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd dastyar-insta
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` with your values (see Environment Variables section below).

5. Generate Prisma client:
```bash
npx prisma generate
```

6. Run database migrations:
```bash
npx prisma migrate dev --name init
```

7. Start the development server:
```bash
npm run dev
```

8. Open http://localhost:3000

## Environment Variables

| Variable | Description |
|----------|-------------|
| `META_APP_ID` | Your Meta App ID from developers.facebook.com |
| `META_APP_SECRET` | Your Meta App Secret from developers.facebook.com |
| `INSTAGRAM_REDIRECT_URI` | OAuth callback URL (e.g., `http://localhost:3000/api/auth/instagram/callback`) |
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL (e.g., `http://localhost:3000`) |
| `SESSION_SECRET` | Random string for session security (min 32 chars) |
| `TOKEN_ENCRYPTION_KEY` | 64-character hex string for encrypting Instagram tokens |

Generate secrets:
```bash
# SESSION_SECRET
openssl rand -base64 32

# TOKEN_ENCRYPTION_KEY
openssl rand -hex 32
```

## Meta Developer Configuration

1. Go to [Meta Developers](https://developers.facebook.com/)
2. Create a new app (or use existing)
3. Add **Instagram** product to your app
4. In Instagram > API Setup with Instagram Login:
   - Set **Valid OAuth Redirect URIs** to your callback URL:
     - Local: `http://localhost:3000/api/auth/instagram/callback`
     - Production: `https://your-domain.up.railway.app/api/auth/instagram/callback`
5. Copy your **App ID** and **App Secret** to `.env`
6. Required permissions (minimal for MVP):
   - `instagram_business_basic`

## Build & Run

```bash
# Development
npm run dev

# Production build
npm run build

# Production start
npm start
```

## Deploy to Railway

1. Push your code to GitHub
2. Go to [Railway](https://railway.app)
3. Create a new project from your GitHub repo
4. Add a PostgreSQL database (Railway plugin)
5. Set environment variables in Railway:
   - `META_APP_ID`
   - `META_APP_SECRET`
   - `INSTAGRAM_REDIRECT_URI` (use your Railway domain)
   - `DATABASE_URL` (provided by Railway PostgreSQL)
   - `NEXT_PUBLIC_APP_URL` (your Railway domain)
   - `SESSION_SECRET`
   - `TOKEN_ENCRYPTION_KEY`
6. Railway will auto-deploy on push

Railway build command (if needed):
```
npm run build
```

Railway start command:
```
npm start
```

## Security Notes

- Instagram access tokens are encrypted before database storage
- Sessions use HTTP-only, secure cookies
- OAuth state parameter prevents CSRF attacks
- No secrets are exposed to the frontend
- All Meta API calls happen server-side
- `.env` is gitignored and never committed

## Future Roadmap

This MVP is the foundation for a full Instagram management platform. Future features:

- **Analytics**: Followers, reach, impressions, engagement, growth tracking
- **Content Management**: Posts, reels, stories, scheduling, publishing
- **Comments**: Read, classify, AI-generated replies, moderation
- **Direct Messages**: Webhooks, AI assistant, automated replies, conversation history
- **AI Assistant**: Account analysis, content strategy, performance insights
- **Webhooks**: Real-time Instagram event processing

## Project Structure

```
app/
  page.tsx                    # Home / Login page
  dashboard/
    page.tsx                  # Dashboard (protected)
  api/
    auth/
      instagram/
        route.ts              # OAuth initiation
      instagram/
        callback/
          route.ts            # OAuth callback
      logout/
        route.ts              # Logout
lib/
  prisma.ts                   # Prisma client singleton
  instagram.ts                # Instagram API helpers
  auth.ts                     # Session management
  crypto.ts                   # Token encryption
prisma/
  schema.prisma               # Database schema
components/
  LoginButton.tsx             # Instagram login button
  InstagramProfile.tsx        # Profile display card
  LogoutButton.tsx            # Logout button
types/
  instagram.ts                # TypeScript types
```
