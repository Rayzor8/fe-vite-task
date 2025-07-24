function App() {
  return (
    <div className="container mx-auto bg-background min-h-screen px-4 py-8 max-w-6xl ">
      <header className="animate-in fade-in slide-in-from-top-8 duration-500">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">📚 Task Management App</h1>
          <p className="text-muted-foreground">
            Stacks : React - Typescript - Zodv4 - React-hook-form - Shadcn
          </p>
        </div>
      </header>

      <main className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <div className="bg-red-300">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
            atque, iure numquam vitae ratione expedita sequi tempore excepturi
            provident consequuntur! Eum maxime illum voluptate sint sed nemo, in
            aliquid saepe earum alias ratione suscipit dolorum consequatur
            placeat porro a quod itaque, odio, odit dolorem quidem quo
            repellendus sunt laudantium! Dolorem!
          </div>
          <div className="bg-green-300">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
            atque, iure numquam vitae ratione expedita sequi tempore excepturi
            provident consequuntur! Eum maxime illum voluptate sint sed nemo, in
            aliquid saepe earum alias ratione suscipit dolorum consequatur
            placeat porro a quod itaque, odio, odit dolorem quidem quo
            repellendus sunt laudantium! Dolorem!
          </div>
        </div>

        <div className="bg-amber-300">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
          atque, iure numquam vitae ratione expedita sequi tempore excepturi
          provident consequuntur! Eum maxime illum voluptate sint sed nemo, in
          aliquid saepe earum alias ratione suscipit dolorum consequatur placeat
          porro a quod itaque, odio, odit dolorem quidem quo repellendus sunt
          laudantium! Dolorem!
        </div>
      </main>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Task management app by @rayzordev 2025</p>
      </footer>
    </div>
  );
}

export default App;
