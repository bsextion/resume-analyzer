import type {Route} from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Resume Analyzer"},
        {name: "description", content: "Resume Analyzer for job hunting!"},
    ];
}

export default function Home() {
    const {auth, fs,kv} = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/auth?next=/');
        }
    }, [auth.isAuthenticated])

    useEffect(() => {
        const loadResumes = async () => {
            setIsLoading(true);

            const resumes = (await kv.list('resume-*', true)) as KVItem[];

            const parsedResumes = resumes?.map((resume) => (
                JSON.parse(resume.value) as Resume
            ))
            console.log("Resumes: ", parsedResumes);
            setResumes(parsedResumes || []);
            setIsLoading(false);
        }

        loadResumes()
    }, []);


    return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar/>
        <section className="main-section">
            <div className="page-heading py-16">
                <h1>Job Application Tracker & Smart Resume Builder</h1>
                {!isLoading && resumes?.length === 0 ? (
                    <h2>No resumes found. Upload your resume to get feedback</h2>
                ): <h2>Track and review your job submissions & receive AI feedback!</h2>
                }
            </div>

            {isLoading && (
                <div className="flex flex-col items-center justify-center">
                <img src='/images/resume-scan-2.gif' className='w-[200px]'/>
            </div>)}

            {!isLoading && resumes?.length > 0 && (
                <div className="resumes-section">
                    {resumes.map((resume: Resume) => (
                        <ResumeCard key={resume.id} resume={resume}/>
                    ))}
                </div>
            )}
            {!isLoading && resumes?.length > 0 && (
                <div className="flex flex-col items-center justify-center mt-10 gap-4">
                    <Link to="/upload" className="primary-button w-fit text-xl font-semibold">Upload Resume</Link>
                </div>
            )}
        </section>
    </main>
}
