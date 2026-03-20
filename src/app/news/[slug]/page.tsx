

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const posts = [
  {
    slug: "season-recap-2025",
    title: "2025 Season Recap",
    content: `Last year wasn’t a season... it was a proving ground. In 2025, this tour became something else. Not just weekend golf. Not just Stableford points. It became a chase—across Glen Mills, Rock Manor, Tamarack, Springfield, Architects, and Bella Vista—for separation. And by the numbers? The gap at the top was real.
THE STANDARD Jamar — 113 total points, averaging 18pts per round. It started at The TWP Opener at Glen Mills CC. Twenty-nine points. A tone-setter. Then it followed him everywhere: Rock Manor: calm, controlled, surgical. La Fiesta de Springfield: survived chaos. Augusta in August at Architects GC: another 29-point statement. Tour Championship at Bella Vista: closed the door. Jamar didnt just win weeks. He controlled scoring environments. When the course opened up? He went low. When others stalled? He stacked birdies like interest. 2026 doesnt ask if hes the favorite. It asks whos brave enough to take it from him.
THE CHASERS Andre — 105 total points, averaging 17pts per round. If Jamar was inevitability, Andre was pressure. At La Fiesta, Andre put up 23 points—the highest round of the season at Springfield. At Bella Vista, he surged late, reminding everyone that championships don’t always belong to the early leader. Andre lives in the danger zone: Not reckless Not safe Always one hole away from flipping the board. In 2026, if anyone can turn a two-week heater into a title run— it’s him.
Jay — 92 total points, averaging 15pts per round. Jay’s season doesn’t show up in highlights. It shows up in absence of collapse. Consistent at Rock Manor Solid at Springfield Dangerous at Architects with 26 points Jay doesn’t need a miracle. He needs one weekend where everyone else blinks.
Erik — 89 total points, averaging 14pts per round. The story no one talks about enough. At Glen Mills? Present. At Rock Manor? Locked in. At Architects? Controlled aggression. At Bella Vista? Hung around. Erik didn’t peak. He hovered. And in 2026, hovering might not be enough—or it might be the smartest place to be when chaos hits.
THE SWING FACTORS Keivon — 72pts. Larry — 69pts. Malcolm — 67pts. These are the guys who decide the season without winning it. Malcolm’s 26-pt round at Architects GC was one of the most explosive single-course performances all year. Larry’s 15 at Tamarack showed what happens when rhythm meets setup. Keivon lived in the middle—dangerous, unpredictable, unfinished. If one of them strings two weekends together? The top gets crowded fast.
This season won’t be about surprises. It’ll be about who can survive being hunted.`
  },
  {
    slug: "rivalries-2026",
    title: "2026 Rivalries",
    content: `RIVALRY #1: Jamar vs. Andre Control vs. Pressure. This isn’t beef. This is proximity. Andre finished 8 points back last season—close enough to feel every Jamar birdie. At Springfield, Andre posted the highest round of the year. At Bella Vista, he made it uncomfortable late. But Jamar? He never flinched. That’s what makes this rivalry lethal in 2026: Andre plays like the season can be stolen. Jamar plays like it already belongs to him. If Andre beats Jamar head-to-head early—especially at Glen Mills or Rock Manor—the psychological shift could be real.This rivalry decides the season.
RIVALRY #2: Jay vs. Erik Consistency vs. Opportunity Jay finished three points ahead of Erik. Three.Same courses. Same weekends. Different styles. Jay waits. Erik presses. At Architects, Jay popped for 26. At Bella Vista, Erik stayed alive but never surged. In 2026, this rivalry is about who takes the risk first: Jay needs to spike once. Erik needs to spike without collapsing. One bold Sunday could flip this matchup for good.
RIVALRY #3: Malcolm vs. Everyone Ceiling vs. Control Malcolm’s 26 at Architects GC wasn’t just a good round. It was a warning shot. The problem? He couldn’t bottle it. Malcolm doesn’t need to beat one guy—he threatens the entire middle tier: Jay, Erik, Keivon, Larry. If Malcolm finds even average consistency, someone in the top 4 gets pushed out. He’s the chaos agent of 2026.`
  },
  {
    slug: "rookies-2025",
    title: "Rookie Class of 2025",
    content: `Rookie of the Year: Malcolm Total Points: 67 | Avg: 13 per round From the opening tee shot of the TWP Opener at Glen Mills, Malcolm set the tone for what would become one of the most dominant rookie seasons in league history. He wasn’t just steady — he was explosive. Big point totals. Strong finishes.And the ability to rise when the course demanded it most. His standout performances included: 26 points at August in August(Architects GC) — the highest single- event rookie total Consistent double - digit finishes across the season. A closing statement at the Tour Championship at Bella Vista. Malcolm didn’t sneak into Rookie of the Year. He ran away with it.
Grecco: Consistency Personified Total Points: 50 | Avg: 8 per round If Malcolm was the hammer, Grecco was the metronome. Week after week, Grecco showed up with the same formula: keep the ball in play, take the points when they’re there, and never implode. His season included strong showings at Rock Manor and Architects GC, keeping him firmly in the ROTY race deep into the year. No flashy collapses. No disappearing acts. Just a smooth swing and dependable golf — and a well-earned second place finish.
Stephon: Quietly Dangerous, but far from quiet Total Points: 43 | Avg: 7 per round Stephon’s rookie season was defined by steady improvement and clutch moments. He didn’t need headlines to stay relevant — his scorecard did the talking. Multiple solid finishes and an ability to hang around the leaderboard made him a threat anytime conditions got tough. The scary part? He’s still just getting started.
The 2025 rookies didn’t come in looking for participation trophies. They came in looking to earn respect — and they did. Malcolm stands alone as Rookie of the Year, but this entire class added depth, competition, and future rivalries to the Stoplee Golf Club. If this was the introduction… Next season is going to be loud. 🏌️‍♂️🔥`


  },
  {
    slug: "jamar-threepeat",
  title: "The Standard: Can Jamar Do It Again?",
  description: "The two-time champ isn’t chasing anymore — he’s the one being hunted.",
  date: "Feb 2026",
  readTime: "3 min read",
  content: `Every league has a measuring stick. In the Stoplee Golf Club, it’s Jamar.

But it didn’t start that way.

In 2023, he finished 6th with 37 points — far from the top, just another name in the field. No pressure. No spotlight. Just potential.

Then everything changed.

2024 — 109 total points. Champion.

2025 — 113 total points. Champion again.

Not a fluke. Not a run. A takeover.

Jamar didn’t just win — he controlled the season. Different courses, different conditions, same result. When the moment called for composure, he delivered. When it demanded aggression, he answered. Week after week, he became the standard everyone else had to measure against.

Now the question isn’t if he’s good.

It’s if anyone can stop him.

Because 2026 is different.

There’s no sneaking up. No underdog story. No surprises. Every round, every swing, every leaderboard — all eyes are on him.

Andre is close. Jay is steady. Erik is lurking. The field is stronger, deeper, and hungry.

But Jamar?

He’s already proven he can rise above it.

The real question is this:

Can he do it again…

Or does the chase finally catch him?`
  }
]

  const post = posts.find(p => p.slug === slug)


  if (!post) return <div>Post not found</div>

  return (
    <div style={{ padding: "16px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
        {post.title}
      </h1>

      <p style={{ marginTop: "16px", lineHeight: "1.6" }}>
        {post.content}
      </p>
    </div>
  )
}