# CAPSULE-TRUTH

CAPSULE-TRUTH is a Next.js application for creating and preserving memory capsules. It runs its own Kubo IPFS node and pins uploaded images and metadata to that node's persistent storage.

## Requirements

- Node.js 20 or newer
- Docker Engine and Docker Compose for the self-hosted IPFS node

## Getting started

```sh
npm install
cp .env.example .env.local
docker compose up -d ipfs
npm run dev
```

For local development outside Compose, `.env.example` documents the local Kubo API and gateway URLs.

Start the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy with Docker

The app and its IPFS node run together on any Docker Compose host:

```sh
docker compose up --build -d
```

The web app listens on port `3000` by default; set `PORT` to change the host port. Kubo stores pinned data in the persistent `ipfs_data` volume. Its admin API (`5001`) and gateway (`8080`) are bound to host loopback only for local development; the app reaches them through the private Compose network. Only the IPFS peer-to-peer port (`4001/tcp` and `4001/udp`) is public for network participation.

Uploads and content links use the self-hosted node through the app; no Pinata account, analytics service, or external gateway credentials are required.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run Next.js ESLint checks |
| `npm test` | Run unit tests |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |

## Capsule upload

The upload form accepts JPEG, PNG, WebP, or GIF images up to 10 MB, along with a title (up to 120 characters) and description (up to 2,000 characters). `POST /api/capsules` validates the request, pins the image and a JSON metadata document to the local Kubo node, and returns their IPFS hashes. `GET /api/ipfs/:cid` serves content through the local gateway on the app's origin.

The gallery currently uses sample content; uploaded capsules are not yet indexed for gallery listing. The local node keeps its own copy pinned; participation in the public IPFS network does not guarantee that another operator will also pin the content.