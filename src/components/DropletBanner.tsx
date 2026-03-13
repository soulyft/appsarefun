import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import dropletIcon from "@/assets/Droplet Icon 1024.png";
import dropletScreenshotBoard from "@/assets/droplet onboarding board type.PNG";
import dropletDashboard from "@/assets/droplet est time saved dashboard.jpg";

const DropletBanner = () => {
  return (
    <section className="px-4 pt-6 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="droplet-panel relative overflow-hidden rounded-[2rem] px-6 py-8 text-white sm:px-10 sm:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_32%),linear-gradient(135deg,_rgba(15,23,42,0.92),_rgba(30,41,59,0.92))]" />
          <div className="absolute right-[-3rem] top-[-4rem] h-36 w-36 rounded-full border border-white/10 bg-[#38BDF8]/10 blur-2xl" />
          <div className="absolute bottom-[-5rem] left-1/4 h-40 w-40 rounded-full bg-[#2563EB]/15 blur-3xl" />
          <div className="droplet-grid-lines absolute inset-0 opacity-50" />

          <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="max-w-xl">
              <p className="droplet-chip mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]">
                Coming Soon
              </p>
              <div className="mb-5 flex items-center gap-3">
                <img
                  src={dropletIcon}
                  alt="Droplet app icon"
                  className="h-12 w-12 rounded-2xl shadow-[0_18px_40px_-18px_rgba(37,99,235,0.8)]"
                />
                <span className="text-sm font-medium text-slate-300">Droplet for Mac</span>
              </div>
              <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Go straight to the thing you need.
              </h2>
              <p className="droplet-text-muted mt-4 max-w-lg text-base leading-7 sm:text-lg">
                Droplet turns your phone into a focused board of actions for your Mac. Open apps, links, files, and shortcuts in one tap.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Speed", "Directness", "Flow"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-3 lg:hidden">
                <Button
                  asChild
                  size="lg"
                  className="h-12 w-full justify-center rounded-full bg-[var(--droplet-primary)] text-white hover:bg-[#1D4ED8]"
                >
                  <Link to="/droplet">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 w-full justify-center rounded-full border border-[#38BDF8]/25 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link to="/droplet#demo">
                    Watch the demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <p className="droplet-text-soft text-sm leading-6">
                  See the product visuals, demo, and waitlist.
                </p>
              </div>
            </div>

            <div className="relative pt-2 lg:min-h-[22rem]">
              <div className="mx-auto flex max-w-[20rem] flex-col items-center lg:block lg:max-w-none">
                <div className="droplet-floating relative z-20 self-end droplet-phone-frame w-[13rem] rotate-[4deg] sm:w-[15rem] lg:absolute lg:right-0 lg:top-0 lg:rotate-[7deg]">
                  <div className="droplet-phone-screen">
                    <img
                      src={dropletScreenshotBoard}
                      alt="Droplet board setup screen"
                      className="block h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="droplet-floating-delayed relative z-10 -mt-10 w-full max-w-[18rem] self-start rounded-[1.8rem] border border-white/10 bg-[#13233F]/95 p-3 shadow-[0_24px_80px_-40px_rgba(2,8,23,0.9)] sm:max-w-[20rem] lg:absolute lg:bottom-0 lg:left-0 lg:mt-0 lg:w-[18rem]">
                  <img
                    src={dropletDashboard}
                    alt="Droplet estimated time saved dashboard"
                    className="block w-full rounded-[1.2rem]"
                  />
                </div>
              </div>

              <div className="hidden lg:absolute lg:left-4 lg:top-4 lg:flex lg:flex-col lg:gap-3 xl:left-6 xl:top-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-[var(--droplet-primary)] text-white hover:bg-[#1D4ED8]"
                >
                  <Link to="/droplet">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border border-[#38BDF8]/25 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link to="/droplet#demo">
                    Watch the demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <p className="droplet-text-soft max-w-[14rem] text-sm">
                  See the product visuals, demo, and waitlist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DropletBanner;
