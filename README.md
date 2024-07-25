# JibChain PoC

Built using:

- Next.js
- Watsonx.ai
- LangChain
- Shadcn
- Tailwind

## Getting Started Locally

As a prequisite you will need to start by instantiating a `.env.local` file at the project root with values like so:

```txt
# news api values
NEWS_API_KEY=
NEW_API_TOPIC_URI=

# watsonx.ai values
WATSONX_AI_AUTH_TYPE=iam
WATSONX_AI_APIKEY=
WATSONX_AI_PROJECT_ID=
WATSONX_AI_SERVICE_URL=https://us-south.ml.cloud.ibm.com
```

> **Note**: There should be a filled in version in the shared Box folder.

Then you can install dependencies via:

```bash
npm ci
```

After that you can run the development server locally with:

```bash
npm run dev
```

Finally open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
