import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router";
import { usePuterStore } from "~/lib/puter";

const ClearData = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        files.forEach(async (file) => {
            await fs.delete(file.path);
        });
        await kv.flush();
        loadFiles();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error {error}</div>;
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover !pt-0">
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold"> Return to Homepage</span>
                </Link>
            </nav>
            <section className="main-section">
                <div className="page-heaing py-16">
                        <h1>
                            Delete Uploaded Resumes
                        </h1>
                    <p className="pt-1">Logged In as: {auth.user?.username}</p>
                    <div className="page-heaing py-16">

                        <h2>Existing files:</h2>
                        <div className="flex flex-col gap-4">
                            {files.map((file) => (
                                <div key={file.id} className="flex flex-row gap-2">
                                    <p>{file.name}</p>
                                </div>
                            ))}
                    </div>

                    </div>
                    <div>
                        <button
                            className="primary-button text-white px-4 py-2 rounded-md cursor-pointer w-50"
                            onClick={() => handleDelete()}
                        >
                            Clear App Data
                        </button>
                    </div>
                </div>
            </section>

        {/*<div>*/}
        {/*    Logged In as: {auth.user?.username}*/}
        {/*    <div>Existing files:</div>*/}
        {/*    <div className="flex flex-col gap-4">*/}
        {/*        {files.map((file) => (*/}
        {/*            <div key={file.id} className="flex flex-row gap-4">*/}
        {/*                <p>{file.name}</p>*/}
        {/*            </div>*/}
        {/*        ))}*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*        <button*/}
        {/*            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"*/}
        {/*            onClick={() => handleDelete()}*/}
        {/*        >*/}
        {/*            Clear App Data*/}
        {/*        </button>*/}
        {/*    </div>*/}
        {/*</div>*/}

        </main>
    );
};

export default ClearData;