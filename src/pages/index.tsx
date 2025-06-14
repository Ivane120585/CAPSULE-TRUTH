import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>GuardianChain | Truth Capsule Network</title>
        <meta name="description" content="Sovereign memory capsule economy for ethical truth yield and proof of experience." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold">💎 GuardianChain</h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto">
            Launching the world's first AI-powered sovereign memory capsule economy.
            Submit truth, earn yield, mint ownership.
          </p>
          <button className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-opacity-90">
            Enter the Chain
          </button>
        </div>
      </main>
    </>
  )
}
