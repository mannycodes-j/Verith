"use client";

import { useQuery } from "@tanstack/react-query";
import { CalendarDays, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import PublicNavbar from "@/components/public/PublicNavbar";
import { accountService } from "@/services/account";

export default function PublicUserProfilePage() {
  const params = useParams<{ username: string }>();
  const username = decodeURIComponent(params.username);
  const profile = useQuery({ queryFn: () => accountService.publicProfile(username), queryKey: ["public-profile", username], retry: false });

  return (
    <main className="min-h-svh bg-[#08090A] px-5 pb-20 pt-32" id="main-content">
      <PublicNavbar />
      <section className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/[.07] bg-white/[.025] p-[clamp(1.5rem,6vw,5rem)] shadow-[0_45px_120px_rgba(0,0,0,.5)] before:absolute before:-top-48 before:right-0 before:size-96 before:rounded-full before:bg-violet-500/15 before:blur-[100px]">
        {profile.isPending ? <div className="relative animate-pulse text-sm text-white/40">Opening public profile…</div> : profile.isError ? <div className="relative"><span className="text-[10px] font-semibold uppercase tracking-[.16em] text-violet-300">Private or unavailable</span><h1 className="mt-5 text-4xl font-semibold tracking-tight">This profile is not public.</h1><p className="mt-4 text-sm leading-7 text-white/45">The member may have disabled public-profile visibility, or the username does not exist.</p><button className="mt-5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black" onClick={() => void profile.refetch()} type="button">Try again</button></div> : <div className="relative grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center"><div className="grid size-28 place-items-center overflow-hidden rounded-[2rem] border border-white/10 bg-violet-500/10 text-4xl font-bold text-violet-200">{profile.data.avatar ? <Image alt="" className="size-full object-cover" height={112} src={profile.data.avatar} unoptimized width={112} /> : (profile.data.displayName || profile.data.username).slice(0, 1).toUpperCase()}</div><div><span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.16em] text-emerald-300"><ShieldCheck size={13} /> Public Verith member</span><h1 className="mt-4 text-5xl font-semibold tracking-[-.05em]">{profile.data.displayName || profile.data.username}</h1><p className="mt-2 text-sm text-white/35">@{profile.data.username}</p><p className="mt-6 max-w-2xl text-base leading-8 text-white/55">{profile.data.bio || "This member has not added a public biography."}</p>{profile.data.createdAt && <p className="mt-6 flex items-center gap-2 text-xs text-white/35"><CalendarDays size={14} /> Member since {new Date(profile.data.createdAt).toLocaleDateString(undefined, { month: "long", year: "numeric" })}</p>}</div></div>}
      </section>
    </main>
  );
}
