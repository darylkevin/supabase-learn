import { crud } from "./lib/definition";

export default function Home() {
  return (
    <div className="h-[100vh] flex justify-center items-center gap-4">
      {crud.map((method, i) => (
        <a
          href={method.href}
          key={i}
          className="text-5xl h-[200px] w-[200px] border-2 border-red-700 rounded-lg flex items-center justify-center hover:bg-red-700 hover:scale-105 transition-all"
        >
          {method.title}
        </a>
      ))}
    </div>
  );
}
