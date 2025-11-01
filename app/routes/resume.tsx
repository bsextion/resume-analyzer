import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router";
import {usePuterStore} from "~/lib/puter";
import Summary from "~/components/Summary";
import Ats from "~/components/Ats";
import ATS from "~/components/Ats";
import Details from "~/components/Details";

export const meta = () => {
    [
        {title: "Resume Analyzer | Review"},
        {name: "description", content: "Detailed feedback on your resume"},
    ]

}

const Resume = () => {
    const {auth, isLoading,fs, kv} = usePuterStore();
    const {id} = useParams();
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    const [resumeUrl, setResumeUrl] = React.useState<string | null>(null);
    const [feedback, setFeedback] = React.useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate(`/auth?next=/resume/${id}`);
        }
    }, [auth.isAuthenticated])

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume-${id}`);

            if(!resume) return;

            const data = JSON.parse(resume);
            const blob = await fs.read(data.resumePath);

            if (!blob) return;

            const pdfBlob = new Blob([blob], {type: 'application/pdf'});
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;

            const imageUrl = URL.createObjectURL(new Blob([imageBlob], {type: 'image/png'}));
            setImageUrl(imageUrl);
            setFeedback(data.feedback);
        }

        loadResume();
    }, [id]);

    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold"> Return to Homepage</span>
                </Link>
            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/images/bg-main.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">`
                    {imageUrl && resumeUrl &&
                        <div className="animate-in fade duration-1000 gradient-border max-sm m-0 h-[90%] max-wxl:h-fit w-fit">
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                <img src={imageUrl} alt="image url from resume" className="w-full h-full object-contain rounded-2xl" title="Resume"/>
                            </a>

                        </div>}
                </section>
                <section className="feedback-section">
                    <h2 className="text-4xl !text-black font-semibold ">Resume Feedback</h2>
                    {feedback ? <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                        <Summary feedback={feedback}/>
                        <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []}/>
                        <Details feedback={feedback}/>

                    </div> : <img src="/images/resume-scan-2.gif" className="w-full" />}
                </section>
            </div>


        </main>
    );
};

export default Resume;