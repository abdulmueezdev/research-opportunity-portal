export default function App() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center p-8 bg-[var(--color-sky-wash)] text-[var(--color-carbon)]">
      <div className="bg-[var(--color-paper)] border border-[var(--color-carbon)] rounded-[var(--radius-card)] p-8 max-w-lg w-full text-center">
        <h1 className="font-[var(--font-display)] text-4xl mb-4 text-balance">
          Research Opportunities
        </h1>
        <p className="font-[var(--font-sans)] text-base text-pretty mb-6">
          Find and apply for research projects across departments.
        </p>
        <button
          type="button"
          className="inline-flex items-center justify-center px-6 py-3 font-[var(--font-sans)] font-semibold bg-[var(--color-electric-blue)] text-[var(--color-carbon)] border border-[var(--color-carbon)] rounded-[var(--radius-pill)] hover:opacity-90 transition-opacity cursor-pointer"
        >
          Explore Opportunities
        </button>
      </div>
    </main>
  );
}
