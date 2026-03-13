import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePageMetadata } from "@/hooks/use-page-metadata";
import {
  ArrowRight,
  Download,
  PlayCircle,
} from "lucide-react";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import dropletIcon from "@/assets/Droplet Icon 1024.png";
import dropletMacDemo from "@/assets/droplet-mac-demo.mp4";
import dropletAddCustomIcon from "@/assets/droplet add custom icon.mov";
import dropletCloseupVideo from "@/assets/droplet dash design closeup liquid glass.mov";
import dropletIosDashboard from "@/assets/droplet ios dashboard.png";
import dropletScreenshotBoard from "@/assets/droplet onboarding board type.PNG";
import dropletScreenshotFocusMac from "@/assets/droplet ios screenshot focus mac control restored.PNG";
import dropletScreenshotTapRing from "@/assets/droplet ios screenshot focus tap ring.PNG";
import dropletDashboard from "@/assets/droplet est time saved dashboard.jpg";

const waitlistBenefits = [
  "Early access updates",
  "Launch news",
  "Product demos",
];

const dropletPrimaryButton =
  "bg-[var(--droplet-primary)] text-white hover:bg-[#1D4ED8]";

const dropletSecondaryButton =
  "border border-[#38BDF8]/25 bg-white/5 text-white hover:bg-white/10";

const onboardingSteps = [
  "Open the TestFlight invitation email on your Mac.",
  "Click the TestFlight link in that email to accept the invite.",
  "If prompted, install Apple's TestFlight app for Mac and reopen the invite link.",
  "In TestFlight, choose the macOS version of Droplet and click Install.",
  "Open Droplet from your Applications folder and finish setup.",
];

const setupCues = [
  "Use the invited email",
  "macOS only",
  "Click View in TestFlight from the email",
];

const showcaseShots = [
  {
    title: "Start from a board",
    image: dropletScreenshotBoard,
  },
  {
    title: "Keep your path in view",
    image: dropletScreenshotFocusMac,
  },
  {
    title: "Tap and confirm",
    image: dropletScreenshotTapRing,
  },
];

const Reveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`droplet-reveal ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const PhoneFrame = ({
  src,
  alt,
  className = "",
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <div className={`droplet-phone-frame ${className}`} style={style}>
      <div className="droplet-phone-screen">
        <img src={src} alt={alt} className="block h-full w-full object-cover" />
      </div>
    </div>
  );
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const ScrollScrubVideo = ({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return;
    }

    let rafId = 0;

    const updateFrame = () => {
      if (!video.duration) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const progress = clamp(
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
        0,
        1,
      );
      const targetTime = progress * Math.max(video.duration - 0.05, 0);

      if (Math.abs(video.currentTime - targetTime) > 0.02) {
        video.currentTime = targetTime;
      }
    };

    const requestUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateFrame);
    };

    const handleMetadata = () => {
      setIsReady(true);
      video.pause();
      requestUpdate();
    };

    if (video.readyState >= 1) {
      handleMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleMetadata);
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      video.removeEventListener("loadedmetadata", handleMetadata);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div className="relative mx-auto w-fit">
        <div className="droplet-phone-frame w-[14rem] sm:w-[16rem]">
          <div className="droplet-phone-screen">
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              poster={poster}
              className="block aspect-[1179/2556] w-full object-cover"
            >
              <source src={src} type='video/quicktime; codecs="hvc1"' />
            </video>
          </div>
        </div>
        {!isReady && (
          <div className="absolute inset-x-0 -bottom-8 text-center">
            <p className="droplet-text-soft text-sm">Loading…</p>
          </div>
        )}
      </div>
    </section>
  );
};

const DropletMacInstallPage = () => {
  return (
    <div className="droplet-page-shell min-h-screen">
      <div className="border-b border-white/10 bg-[#0F172A]/70 backdrop-blur">
        <div className="container mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/droplet"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Droplet
          </Link>
          <p className="text-sm text-slate-400">Temporary setup page</p>
        </div>
      </div>

      <main className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="droplet-panel relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.12),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(37,99,235,0.12),_transparent_32%)]" />
            <div className="relative">
              <Reveal delay={20}>
                <div className="mx-auto max-w-[46rem] text-center">
                    <p className="droplet-chip inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]">
                      Mac Setup
                    </p>
                    <h1 className="mx-auto mt-5 max-w-[11ch] text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[4.5rem] lg:leading-[0.96]">
                      Install Droplet on your Mac
                    </h1>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">
                      With TestFlight
                    </p>
                    <p className="droplet-text-muted mx-auto mt-5 max-w-[32rem] text-lg leading-8">
                      Open the invite email on your Mac, accept it in TestFlight, and install the Mac build.
                    </p>

                    <div className="mx-auto mt-8 grid max-w-[34rem] gap-3 sm:grid-cols-[1.2fr_1fr]">
                      <Button asChild size="lg" className={`h-12 w-full rounded-full px-6 ${dropletPrimaryButton}`}>
                        <a href="https://apps.apple.com/us/app/testflight/id899247664" target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                          Get TestFlight
                        </a>
                      </Button>
                      <Button asChild size="lg" variant="outline" className={`h-12 w-full rounded-full px-6 ${dropletSecondaryButton}`}>
                        <a
                          href="https://mail.google.com/mail/?view=cm&fs=1&to=dev@appsarefun.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Message support
                        </a>
                      </Button>
                    </div>

                    <div className="mx-auto mt-5 flex max-w-[34rem] flex-col items-center gap-3">
                      <p className="droplet-text-soft text-sm leading-6">
                        Support: <span className="font-medium text-slate-200">dev@appsarefun.com</span>
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {setupCues.map((cue) => (
                          <div
                            key={cue}
                            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                          >
                            {cue}
                          </div>
                        ))}
                      </div>
                    </div>
                </div>
              </Reveal>

              <Reveal delay={90}>
                <div className="mx-auto mt-10 grid max-w-4xl gap-4">
                  {onboardingSteps.map((step, index) => (
                    <div
                      key={step}
                      className="droplet-panel-subtle group flex items-start gap-4 rounded-[1.45rem] px-5 py-5 transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--droplet-primary)] text-sm font-semibold text-white shadow-[0_10px_30px_-14px_rgba(37,99,235,0.9)]">
                        {index + 1}
                      </div>
                      <p className="droplet-text-muted pt-1 text-base leading-7">{step}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <div className="mx-auto mt-10 grid max-w-4xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <Reveal delay={150} className="h-full">
                  <div className="droplet-panel-subtle flex h-full flex-col rounded-[1.5rem] px-5 py-6">
                    <h2 className="text-xl text-white">If you do not see the email</h2>
                    <ul className="droplet-text-muted mt-4 space-y-3 text-base leading-8">
                      <li>Check spam or promotions.</li>
                      <li>Search your inbox for &quot;TestFlight&quot; or &quot;Droplet&quot;.</li>
                      <li>Make sure you are checking the same email address used for testing.</li>
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={220} className="h-full">
                  <div className="droplet-panel-subtle flex h-full flex-col rounded-[1.5rem] px-5 py-6">
                    <h2 className="text-xl text-white">Need a hand?</h2>
                    <p className="droplet-text-muted mt-4 max-w-md text-base leading-8">
                      If the invitation is missing or the Mac build does not appear in TestFlight, we can help.
                    </p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      <Button asChild size="lg" className={`h-12 w-full rounded-full justify-center ${dropletPrimaryButton}`}>
                        <a href="https://apps.apple.com/us/app/testflight/id899247664" target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                          Get TestFlight
                        </a>
                      </Button>
                      <Button asChild size="lg" variant="outline" className={`h-12 w-full rounded-full justify-center ${dropletSecondaryButton}`}>
                        <a
                          href="https://mail.google.com/mail/?view=cm&fs=1&to=dev@appsarefun.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Message support
                        </a>
                      </Button>
                    </div>
                    <p className="droplet-text-soft mt-4 text-sm leading-6">
                      Support: <span className="text-slate-200">dev@appsarefun.com</span>. We can resend the invite or confirm the Mac build is attached to your tester account.
                    </p>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={260}>
                <p className="droplet-text-soft mt-10 text-sm leading-6">
                  This page is temporary. Once Droplet is live, this link can point straight to the Mac App Store listing instead.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Droplet = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source");
  const isMacSetupRoute = pathname === "/droplet/mac-setup";
  const isLegacyMacSetupRoute = source === "phone_onboarding_finish_setup";
  const isMacSetupPage = isMacSetupRoute || isLegacyMacSetupRoute;
  const isMobile = useIsMobile();
  usePageMetadata(isMacSetupPage ? "/droplet/mac-setup" : "/droplet");
  const [heroParallax, setHeroParallax] = useState(0);
  const dashboardSectionRef = useRef<HTMLDivElement | null>(null);
  const dashboardBackgroundVideoRef = useRef<HTMLVideoElement | null>(null);
  const [dashboardParallax, setDashboardParallax] = useState(0);

  useEffect(() => {
    if (isMacSetupPage || isMobile) {
      setHeroParallax(0);
      return;
    }

    let rafId = 0;

    const updateParallax = () => {
      const nextValue = clamp(window.scrollY * 0.14, 0, 42);
      setHeroParallax(nextValue);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMacSetupPage, isMobile]);

  useEffect(() => {
    if (isMacSetupPage) {
      setDashboardParallax(0);
      return;
    }

    let rafId = 0;

    const updateParallax = () => {
      const section = dashboardSectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const progress = clamp(
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
        0,
        1,
      );

      setDashboardParallax(progress);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMacSetupPage]);

  useEffect(() => {
    if (isMacSetupPage) {
      return;
    }

    const video = dashboardBackgroundVideoRef.current;

    if (!video) {
      return;
    }

    let rafId = 0;

    const updateFrame = () => {
      if (!video.duration) {
        return;
      }

      const targetTime = dashboardParallax * Math.max(video.duration - 0.05, 0);

      if (Math.abs(video.currentTime - targetTime) > 0.02) {
        video.currentTime = targetTime;
      }
    };

    const requestUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateFrame);
    };

    const handleMetadata = () => {
      video.pause();
      requestUpdate();
    };

    if (video.readyState >= 1) {
      handleMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleMetadata);
    }

    requestUpdate();

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", handleMetadata);
    };
  }, [dashboardParallax, isMacSetupPage]);

  if (!isMacSetupRoute && isLegacyMacSetupRoute) {
    return <Navigate replace to="/droplet/mac-setup" />;
  }

  if (isMacSetupPage) {
    return <DropletMacInstallPage />;
  }

  return (
    <div className="droplet-page-shell min-h-screen">
      <div className="border-b border-white/10 bg-[#0F172A]/70 backdrop-blur">
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Apps Are Fun
          </Link>
          <Button asChild variant="ghost" className="text-sm text-white hover:bg-white/10 hover:text-white">
            <a href="#waitlist">
              Join the waitlist
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      <main>
        <section className="relative overflow-hidden px-4 pb-14 pt-16 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
          <div className="droplet-grid-lines absolute inset-0 opacity-30" />
          <div className="absolute left-[-8rem] top-10 h-64 w-64 rounded-full bg-[#38BDF8]/10 blur-3xl" />
          <div className="absolute right-[-6rem] top-24 h-72 w-72 rounded-full bg-[#2563EB]/12 blur-3xl" />

          <div className="container relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal delay={10}>
              <div className="max-w-xl">
                <div className="mb-5 flex items-center gap-4">
                  <img
                    src={dropletIcon}
                    alt="Droplet app icon"
                    className="h-14 w-14 rounded-[1.4rem] shadow-[0_20px_50px_-18px_rgba(37,99,235,0.8)]"
                  />
                  <div>
                    <p className="droplet-chip inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] shadow-sm">
                      Coming Soon
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">
                  Droplet
                </p>
                <h1 className="max-w-[11ch] text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.9rem] lg:leading-[0.94]">
                  Your fastest path to anything.
                </h1>
                <p className="droplet-text-muted mt-5 max-w-lg text-lg leading-8">
                  Droplet turns your phone into a fast, personal launcher for your Mac. Open apps, pages, files, and shortcuts in one tap.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className={`h-12 w-full rounded-full px-7 text-base sm:w-auto ${dropletPrimaryButton}`}>
                    <a href="#waitlist">
                      Join the waitlist
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className={`h-12 w-full rounded-full px-7 text-base sm:w-auto ${dropletSecondaryButton}`}>
                    <a href="#demo">
                      <PlayCircle className="h-4 w-4" />
                      Watch the demo
                    </a>
                  </Button>
                </div>

                <p className="droplet-text-soft mt-5 text-sm leading-6">
                  Works with your Mac and iPhone on the same local connection.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="relative mx-auto flex max-w-[22rem] flex-col items-center gap-4 pt-4 sm:max-w-[25rem] lg:block lg:max-w-none lg:min-h-[34rem]">
                <div className="absolute inset-x-10 top-12 h-44 rounded-full bg-[#38BDF8]/12 blur-3xl" />
                <div className="relative z-30 rounded-full border border-white/10 bg-[#13233F]/80 px-4 py-2 backdrop-blur lg:absolute lg:right-6 lg:top-6">
                  <p className="text-sm font-medium text-slate-100">A board of actions for your Mac</p>
                </div>
                <PhoneFrame
                  src={dropletScreenshotFocusMac}
                  alt="Droplet iPhone screenshot showing focused Mac control"
                  className="droplet-floating relative z-10 w-[12.5rem] self-start rotate-[-5deg] sm:w-[14rem] lg:absolute lg:left-4 lg:top-14 lg:w-[15rem] lg:rotate-[-6deg]"
                  style={{ transform: `translateY(${heroParallax * -0.38}px) rotate(-6deg)` }}
                />
                <PhoneFrame
                  src={dropletScreenshotBoard}
                  alt="Droplet iPhone screenshot showing board setup"
                  className="droplet-floating-delayed relative z-20 -mt-14 w-[14rem] self-end rotate-[5deg] sm:w-[16rem] lg:absolute lg:right-2 lg:top-0 lg:mt-0 lg:w-[17rem] lg:rotate-[6deg]"
                  style={{ transform: `translateY(${heroParallax * -0.16}px) rotate(6deg)` }}
                />

                <div
                  className="droplet-panel-subtle relative z-30 -mt-14 w-[13.5rem] self-center rounded-[1.45rem] p-3 shadow-[0_24px_80px_-36px_rgba(2,8,23,0.9)] sm:w-[15rem] lg:absolute lg:bottom-8 lg:left-[22%] lg:mt-0"
                  style={{ transform: `translateY(${heroParallax * 0.14}px)` }}
                >
                  <img
                    src={dropletDashboard}
                    alt="Droplet dashboard showing estimated time saved"
                    className="block w-full rounded-[1.2rem]"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="demo" className="px-4 pb-12 pt-2 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-[88rem]">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">
                  Watch the demo
                </p>
                <h2 className="mt-4 text-white">Go straight to the thing you need.</h2>
                <p className="droplet-text-muted mt-4 text-lg">
                  Apps. URLs. Files. Folders. Shortcuts. The next step stays right in front of you.
                </p>
              </div>
            </Reveal>

            <Reveal delay={70} className="mt-8">
              <div className="droplet-laptop-frame mx-auto max-w-[88rem]">
                <div className="droplet-laptop-screen">
                  <video
                    src={dropletMacDemo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="block aspect-video w-full object-contain"
                  />
                </div>
                <div className="droplet-laptop-base">
                  <div className="droplet-laptop-trackpad" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="how-it-works" className="py-16 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl px-4 sm:px-0">
            <Reveal>
              <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">
                    Less friction. More flow.
                  </p>
                  <h2 className="mt-4 max-w-[12ch] text-white">Your quickest and clearest path to the next step.</h2>
                </div>
                <div className="lg:pb-1">
                  <p className="droplet-text-muted max-w-2xl text-lg leading-8">
                    Droplet removes the small delays between deciding what you want and getting there. The board keeps the next step in front of you, and the dashboard helps you see which paths are actually saving time.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="container mx-auto mt-8 max-w-6xl px-4 sm:px-0">
            <Reveal delay={40}>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Speed",
                    body: "Get to apps, links, files, and actions faster.",
                  },
                  {
                    title: "Directness",
                    body: "Skip searching, switching, digging, and repeating.",
                  },
                  {
                    title: "Flow",
                    body: "Stay moving instead of breaking focus.",
                  },
                ].map((item) => (
                  <div key={item.title} className="droplet-panel-subtle rounded-[1.5rem] px-5 py-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#38BDF8]">
                      {item.title}
                    </p>
                    <p className="droplet-text-muted mt-3 text-base leading-7">{item.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={80} className="mt-8">
            <div className="w-full sm:container sm:mx-auto sm:max-w-6xl sm:px-0">
              <div
                ref={dashboardSectionRef}
                className="droplet-panel relative w-full overflow-hidden rounded-none border-x-0 p-5 sm:rounded-[2.4rem] sm:border-x sm:p-6 lg:p-8"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <video
                    ref={dashboardBackgroundVideoRef}
                    src={dropletCloseupVideo}
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.2] blur-[1px] [object-position:55%_50%]"
                    style={{
                      transform: `translate3d(0, ${dashboardParallax * -56}px, 0) scale(${1.32 + dashboardParallax * 0.08})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.88),rgba(15,23,42,0.56)_38%,rgba(15,23,42,0.78))]" />
                </div>

                <div className="relative grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-center">
                  <div className="space-y-6">
                    <div className="max-w-lg">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#38BDF8]">
                        Build the board around your day
                      </p>
                      <h3 className="mt-3 text-2xl text-white sm:text-3xl">
                        Add what matters. Keep it in reach.
                      </h3>
                      <p className="droplet-text-muted mt-4 text-base leading-7 sm:text-lg sm:leading-8">
                        Droplet works best when the board feels like your own. Shape it around the apps, links, files, and shortcuts you repeat.
                      </p>
                    </div>

                    <div className="flex justify-center xl:justify-start">
                      <ScrollScrubVideo src={dropletAddCustomIcon} poster={dropletScreenshotBoard} />
                    </div>
                  </div>

                  <div className="grid gap-5">
                    <div className="droplet-panel-subtle rounded-[2rem] p-4 sm:p-5">
                      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
                        <div className="flex justify-center lg:justify-start">
                          <PhoneFrame
                            src={dropletIosDashboard}
                            alt="Droplet iOS dashboard screenshot"
                            className="w-[13.5rem] sm:w-[14.5rem]"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#38BDF8]">
                            Why the dashboard exists
                          </p>
                          <h3 className="mt-3 text-xl text-white">It shows what’s actually helping.</h3>
                          <p className="droplet-text-muted mt-3 text-base leading-7">
                            Small saved moments are easy to miss. The dashboard makes them legible by showing the boards you rely on, the actions you repeat, and the time Droplet is quietly giving back.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="droplet-panel-subtle rounded-[1.8rem] p-4 sm:p-5">
                      <div className="grid gap-5 lg:grid-cols-[0.98fr_1.02fr] lg:items-start">
                        <img
                          src={dropletDashboard}
                          alt="Droplet estimated time saved card"
                          className="block w-full rounded-[1.35rem] border border-white/10"
                        />
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#38BDF8]">
                            Flow snapshot
                          </p>
                          <h3 className="mt-3 text-xl text-white">A clearer path adds up.</h3>
                          <p className="droplet-text-muted mt-3 text-base leading-7">
                            The dashboard is not there to add another view. It is there to reflect the value you are already getting back from the paths you repeat.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-[1.2rem] border border-white/8 bg-white/5 px-4 py-4">
                    <p className="text-sm font-medium text-white">Open apps instantly</p>
                    <p className="droplet-text-soft mt-2 text-sm leading-6">
                      Launch the tools you use most without hunting through your Dock or tabs.
                    </p>
                  </div>
                  <div className="rounded-[1.2rem] border border-white/8 bg-white/5 px-4 py-4">
                    <p className="text-sm font-medium text-white">Jump to pages and URLs</p>
                    <p className="droplet-text-soft mt-2 text-sm leading-6">
                      Keep exact destinations ready instead of reopening and navigating back.
                    </p>
                  </div>
                  <div className="rounded-[1.2rem] border border-white/8 bg-white/5 px-4 py-4">
                    <p className="text-sm font-medium text-white">Trigger useful actions</p>
                    <p className="droplet-text-soft mt-2 text-sm leading-6">
                      Run shortcuts and workflows without breaking your rhythm.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">
                  Built for the paths you repeat
                </p>
                <h2 className="mt-4 text-4xl text-white sm:text-5xl">
                  Start work faster. Move between contexts. Keep key destinations close.
                </h2>
                <p className="droplet-text-muted mx-auto mt-4 max-w-2xl text-lg leading-8">
                  The value is simple: you already know where you want to go. Droplet gets you there.
                </p>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Start work faster",
                  body: "Open the apps, docs, and links you need to begin the day.",
                },
                {
                  title: "Move between contexts",
                  body: "Jump from design to email to docs without the usual shuffle.",
                },
                {
                  title: "Keep key destinations close",
                  body: "Save the pages, folders, and tools you reach for again and again.",
                },
                {
                  title: "Control your setup simply",
                  body: "Use your phone as a focused board of actions for your Mac.",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delay={40 + index * 40}>
                  <div className="droplet-panel-subtle h-full rounded-[1.5rem] px-5 py-5">
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="droplet-text-soft mt-3 text-sm leading-6">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1fr_0.9fr] lg:items-end">
              {showcaseShots.map(({ title, image }, index) => (
                <Reveal key={title} delay={60 + index * 50}>
                  <div className="flex flex-col items-center gap-4">
                    <PhoneFrame
                      src={image}
                      alt={title}
                      className={index === 1 ? "w-[16rem] sm:w-[18rem]" : "w-[14rem] sm:w-[16rem]"}
                    />
                    <p className="text-sm font-medium text-slate-200">{title}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <Reveal>
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="droplet-panel rounded-[2rem] p-8 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">
                    Set it up once. Use it constantly.
                  </p>
                  <h2 className="mt-4 max-w-[10ch] text-white">Faster than searching. Simpler than automation.</h2>
                  <p className="droplet-text-muted mt-4 max-w-lg text-lg leading-8">
                    Droplet is for the moments when you already know what you want. Not more complexity. Just a quicker way to get there.
                  </p>
                  <div className="mt-7 grid gap-3">
                    {[
                      "Connect your Mac and iPhone.",
                      "Add the things you use most.",
                      "Tap from your phone to open the right thing at the right moment.",
                    ].map((item, index) => (
                      <div key={item} className="flex items-start gap-4 rounded-[1.35rem] border border-white/8 bg-white/5 px-4 py-4">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#38BDF8]/25 bg-[#38BDF8]/10 text-sm font-semibold text-[#7DD3FC]">
                          {index + 1}
                        </div>
                        <p className="droplet-text-muted pt-0.5 text-base leading-7">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-10 rounded-full bg-[#38BDF8]/10 blur-3xl" />
                  <div className="relative flex justify-center">
                    <PhoneFrame
                      src={dropletScreenshotFocusMac}
                      alt="Droplet screenshot showing focused Mac control"
                      className="w-[17rem] sm:w-[20rem] lg:w-[22rem]"
                    />
                  </div>
                  <div className="droplet-panel-subtle relative mx-auto mt-5 max-w-md rounded-[1.5rem] px-5 py-5 text-center">
                    <p className="text-xl text-white">Your next step, one tap away.</p>
                    <p className="droplet-text-soft mt-2 text-sm leading-6">
                      Built to feel like a natural extension of the way you already work.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="waitlist" className="px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="container mx-auto max-w-5xl">
            <div className="droplet-panel rounded-[2.2rem] p-6 sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
                <div className="text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#38BDF8]">
                    Waitlist
                  </p>
                  <h2 className="mt-4 max-w-[10ch] text-white">Stay in the loop.</h2>
                  <p className="droplet-text-muted mt-4 max-w-md text-lg leading-8">
                    Join the list for launch news, early looks, and the App Store release.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {waitlistBenefits.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <form
                  action="https://soulyftaudio.us22.list-manage.com/subscribe/post?u=e20db523506a8b99ef83ab7d2&id=b4674a065d&f_id=0039e2e1f0"
                  method="post"
                  target="_blank"
                  noValidate
                  className="relative rounded-[1.8rem] border border-white/10 bg-[#0F172A]/35 p-6 backdrop-blur"
                >
                  <div className="space-y-2">
                    <label htmlFor="mce-EMAIL" className="text-sm font-medium text-slate-200">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      name="EMAIL"
                      id="mce-EMAIL"
                      required
                      className="h-12 w-full rounded-2xl border border-white/10 bg-[#0F172A]/80 px-4 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-[#38BDF8] focus:bg-[#0F172A] focus:ring-4 focus:ring-[#38BDF8]/15"
                      placeholder="you@company.com"
                    />
                  </div>

                  <input type="hidden" name="tags" value="27596" />
                  <div aria-hidden="true" className="absolute left-[-5000px]">
                    <input
                      type="text"
                      name="b_e20db523506a8b99ef83ab7d2_b4674a065d"
                      tabIndex={-1}
                      defaultValue=""
                    />
                  </div>

                  <Button type="submit" size="lg" className={`mt-5 h-12 w-full rounded-full text-base ${dropletPrimaryButton}`}>
                    Join the waitlist
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <p className="droplet-text-soft mt-5 text-sm leading-6">
                    No spam. Just Droplet updates. You can also subscribe directly through{" "}
                    <a
                      href="https://eepurl.com/dyilnX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#38BDF8] underline-offset-4 hover:underline"
                    >
                      this Mailchimp signup link
                    </a>
                    .
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Droplet;
