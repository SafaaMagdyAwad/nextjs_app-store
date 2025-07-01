
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Welcome to My App</h1>
      </header>
      <main className="flex flex-col items-center justify-center">
        <p className="text-lg"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus corporis quaerat aliquid amet cumque dolorum cum cupiditate reiciendis vero ducimus alias quae, illum dolor neque nam vel. Quod, odit ad. </p>
      </main>
      <footer className="text-center">
        <p className="text-sm">© 2023 My App</p>
      </footer>
    </div>
  );
}
