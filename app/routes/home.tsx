import type {Route} from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Resume Analyzer"},
        {name: "description", content: "Resume Analyzer for job hunting!"},
    ];
}

export default function Home() {
    const {auth} = usePuterStore();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/auth?next=/');
        }
    }, [auth.isAuthenticated])
    const {init} = usePuterStore();

    useEffect(() => {
        init();
    }, [init]);

    return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar/>
        <section className="main-section">
            <div className="page-heading py-16">
                <h1>Job Application Tracker & Smart Resume Builder</h1>
                <h2>Track and review your job submissions & receive AI feedback!</h2>
            </div>

            {resumes.length > 0 && (
                <div className="resumes-section">
                    {resumes.map((resume: Resume) => (
                        <ResumeCard key={resume.id} resume={resume}></ResumeCard>
                    ))}
                </div>
            )}
        </section>
    </main>
}
