import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "Resume Analyzer for job hunting!" },
  ];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar/>
      <section className="main-section">
          <div className="page-heading">
              <h1>Job Application Tracker & Smart Resume Builder</h1>
              <h2>Track and review your job submissions & receive AI feedback!</h2>
          </div>
      </section>

  </main>;
}
