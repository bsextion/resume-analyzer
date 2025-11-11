import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');
    // const navigate = useNavigate();

    const handleViewResume = () => {

    }

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    return (
           <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
               <div className="resume-card-header">
           <div className="flex flex-col gap-2">
               {companyName &&
                   <div className="flex items-center gap-2">
                   <img
                       src="/icons/office.svg"
                       alt="score"
                       className="size-8"
                   />
                   <h2 className="!text-black break-words"> {companyName} </h2>
                   </div>}
               {jobTitle && <div className="flex items-center gap-2 pl-10"> <h3 className="text-lg break-words text-gray-500"> {jobTitle} </h3> </div>}
               {!companyName && !jobTitle && <h2 className="!text-black font-bold"></h2>}
               {companyName && jobTitle && <div className="flex ml-10 p-2 bg-badge-green text-green-600 w-fit rounded-full ">
                   <p>Tailored Feedback</p>
               </div>}
           </div>
               <div className="flex-shrink-0">
                   <ScoreCircle score={feedback.overallScore}/>
               </div>
               </div>

               {resumeUrl && <div className="gradient-border animate-in fade-in duration-1000">

                   <div className="w-full h-full">
                       <img src={resumeUrl}
                            alt="Resume Image"
                            className="w-full h-[380px] max-sm:h-[280px] object-cover object-top"/>
                   </div>

               </div>
               }
           </Link>
    );
};

export default ResumeCard;