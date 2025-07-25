import TaskFilter from "./components/tasks/task-filter";
import TaskForm from "./components/tasks/task-form";
import TaskList from "./components/tasks/task-list";

function App() {
  return (
    <div className="font-sans container mx-auto bg-background min-h-screen px-4 py-8 max-w-6xl animate-in fade-in slide-in-from-top-8 duration-500">
      <header>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">📚 Task Management App</h1>
          <p className="text-muted-foreground">
            Stacks : React - Typescript - Zodv4 - React-hook-form - Shadcn
          </p>
        </div>
      </header>

      <main className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <TaskForm />
          <TaskFilter />
        </div>

        <div className="lg:col-span-2">
          <TaskList />
        </div>
      </main>

      <footer className="mt-12 text-sm text-muted-foreground">
        <p>Task management app by @rayzordev 2025</p>
      </footer>
    </div>
  );
}

export default App;
