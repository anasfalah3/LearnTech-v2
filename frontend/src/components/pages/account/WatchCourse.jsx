import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../common/Layout";
import { apiUrl, token } from "../../common/Config";
import { toast } from "react-hot-toast";
import ReactPlayer from "react-player";

import {
    MediaController,
    MediaControlBar,
    MediaTimeRange,
    MediaTimeDisplay,
    MediaVolumeRange,
    MediaPlaybackRateButton,
    MediaPlayButton,
    MediaSeekBackwardButton,
    MediaSeekForwardButton,
    MediaMuteButton,
    MediaFullscreenButton,
} from "media-chrome/react";

function WatchCourse() {
    const [course, setCourse] = useState({});
    const [activeLesson, setActiveLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [progress, setProgress] = useState(0);
    const [openChapter, setOpenChapter] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const params = useParams();

    // Fetch Course
    const fetchCourse = async () => {
        await fetch(`${apiUrl}/enroll/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.status == 200) {
                    setCourse(result.data);
                    setActiveLesson(result.activeLesson);
                    setCompletedLessons(result.completedLessons);
                    setProgress(result.progress);
                }
            });
    };

    // Show Lesson
    const showLesson = async (lesson) => {
        setActiveLesson(lesson);

        const data = {
            course_id: params.id,
            lesson_id: lesson.id,
            chapter_id: lesson.chapter_id,
        };

        await fetch(`${apiUrl}/save-activity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
    };

    // Mark Complete
    const markAsComplete = async (lesson) => {
        const data = {
            course_id: params.id,
            lesson_id: lesson.id,
            chapter_id: lesson.chapter_id,
        };

        await fetch(`${apiUrl}/mark-as-complete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.status == 200) {
                    setCompletedLessons(result.completedLessons);
                    setProgress(result.progress);
                    toast.success(result.message);
                }
            });
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    const isCompleted = (id) => {
        return completedLessons?.includes(id);
    };

    const totalLessons =
        course.chapters?.reduce(
            (acc, chapter) => acc + chapter.lessons.length,
            0
        ) || 0;

    return (
        <Layout>

            {/* TOPBAR */}
            <div className="watch-topbar">
                <Link to="/" className="topbar-brand">
                    LearnTech
                </Link>

                <div className="topbar-title">{course.title}</div>

                <button
                    className="topbar-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? "Hide" : "Show"} Content
                </button>
            </div>

            <div className="watch-layout">

                {/* MAIN */}
                <div className="watch-main">

                    {/* VIDEO */}
                    <div className="video-wrap">
                        {activeLesson && (
                            <MediaController
                                style={{
                                    width: "100%",
                                    aspectRatio: "16/9",
                                }}
                            >
                                <ReactPlayer
                                    slot="media"
                                    src={activeLesson.video_url}
                                    controls={false}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />

                                <MediaControlBar>
                                    <MediaPlayButton />
                                    <MediaSeekBackwardButton seekOffset={10} />
                                    <MediaSeekForwardButton seekOffset={10} />
                                    <MediaTimeRange />
                                    <MediaTimeDisplay showDuration />
                                    <MediaMuteButton />
                                    <MediaVolumeRange />
                                    <MediaPlaybackRateButton />
                                    <MediaFullscreenButton />
                                </MediaControlBar>
                            </MediaController>
                        )}
                    </div>

                    {/* LESSON */}
                    {activeLesson && (
                        <div className="lesson-meta">

                            <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">

                                <div>
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            color: "var(--primary)",
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            marginBottom: "6px",
                                        }}
                                    >
                                        {
                                            course.chapters?.find((chapter) =>
                                                chapter.lessons.some(
                                                    (lesson) => lesson.id === activeLesson.id
                                                )
                                            )?.title
                                        }
                                    </div>

                                    <h2 className="lesson-title">
                                        {activeLesson.title}
                                    </h2>
                                </div>

                                <button
                                    onClick={() => markAsComplete(activeLesson)}
                                    disabled={isCompleted(activeLesson.id)}
                                    className={`btn-complete ${isCompleted(activeLesson.id) ? "done" : ""
                                        }`}
                                >
                                    {isCompleted(activeLesson.id)
                                        ? "Completed"
                                        : "Mark as Complete"}
                                </button>
                            </div>

                            <div
                                className="lesson-desc"
                                dangerouslySetInnerHTML={{
                                    __html: activeLesson.description,
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* SIDEBAR */}
                <div
                    className={`watch-sidebar ${sidebarOpen ? "" : "collapsed"
                        }`}
                >

                    {/* HEADER */}
                    <div className="sidebar-header">
                        <div className="sidebar-course-title">
                            {course.title}
                        </div>

                        <div className="progress-track">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        <div className="progress-label">
                            <span>{progress}% complete</span>
                            <span>
                                {completedLessons.length}/{totalLessons}
                            </span>
                        </div>
                    </div>

                    {/* CHAPTERS */}
                    {course.chapters?.map((chapter, ci) => (
                        <div className="chapter-item" key={ci}>

                            <div
                                className={`chapter-header ${openChapter === ci ? "open" : ""
                                    }`}
                                onClick={() =>
                                    setOpenChapter(openChapter === ci ? null : ci)
                                }
                            >
                                <div className="chapter-name">
                                    {chapter.title}
                                </div>

                                <i
                                    className={`bi bi-chevron-${openChapter === ci ? "up" : "down"
                                        }`}
                                ></i>
                            </div>

                            {openChapter === ci && (
                                <div>
                                    {chapter.lessons?.map((lesson, li) => {
                                        const done = isCompleted(lesson.id);
                                        const current = activeLesson?.id === lesson.id;

                                        return (
                                            <div
                                                key={li}
                                                className={`lesson-item ${current ? "active" : ""
                                                    }`}
                                                onClick={() => showLesson(lesson)}
                                            >

                                                <div
                                                    className={`lesson-check ${done
                                                        ? "done"
                                                        : current
                                                            ? "current"
                                                            : ""
                                                        }`}
                                                >
                                                    {done ? (
                                                        <i className="bi bi-check"></i>
                                                    ) : current ? (
                                                        <i className="bi bi-play-fill"></i>
                                                    ) : null}
                                                </div>

                                                <div className="lesson-title-item">
                                                    {lesson.title}
                                                </div>

                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default WatchCourse;