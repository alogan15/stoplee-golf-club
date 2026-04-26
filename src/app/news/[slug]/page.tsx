import Link from "next/link"

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const posts = [
    {
      slug: "power-rankings-in-motion",
      title: "Power Rankings In Motion",
      content: `
Newcomer <strong>Tyrin </strong> didn’t waste any time making his presence felt, walking away with the lowest stroke play of the day <strong>(93)</strong> the Twp Opener League Trophy and setting the tone for the season. First event, and already putting the league on notice. But that wasn’t the only shake-up. The board looks very different from preseason expectations. Coming into the season, <strong>Andre</strong> held the number 3 spot — but after <strong>Broad Run</strong>, the power rankings have already started shifting as players separate themselves early.
<strong>Jamar</strong>, the two-time champion, reminded everyone why he is the standard, opening the season right where he left off: at the top. <strong>Consistency. Composure. Championship DNA.</strong>

Then there’s the new wave...
First season in the league and already making noise:
• <strong>Tyrin</strong> — winner, #2 in rankings  
• <strong>Aaron</strong> — right behind at #3  
New blood. Real pressure.

And then there’s the other side of the board...
<strong>Jay</strong>... what happened? "Fell from top 10 to not mentioned at all..." - JayZ

It was a tough outing at Broad Run, and it showed on the leaderboard. And just as the season opener was ending <strong>Keivon</strong> found a way to sneak in the top 5 which means <strong>Greeco</strong> spot in the top 10 was short lived. Oh yea, this league doesn’t wait. You either adjust or get left behind. There’s plenty of time to bounce back — but the work starts now.

End of Month Snapshot at Broad Run:
<strong>
• Jamar — 23 pts (95) 
• Tyrin — 21 pts (93)
• Aaron — 20 pts (95)
• Andre — 17 pts (102)
• Keivon - 16 pts (106)
</strong>
The gap is tight.
The competition is real.
And the message is clear:
Nobody is safe this season.
Next stop: <strong>Rock Manor</strong> — where familiarity meets pressure.

Who holds?  
Who folds?  
Who rises?

Stay locked in.

<strong>Stoplee Golf Club </strong>is just getting started.
`
    },
    {
      slug: "twp-opener-recap",
      title: "Twp-Opener: Built From Loss. Driven By Brotherhood",
      author: "by: Ralph Shorty Crawford",
      content: "Waking up later than I anticipated wasn’t a mistake—it was a result of good fellowship. Family, friends, laughter, and a little time to just sit back and enjoy myself. The morning wasn’t cold—just a chill in the air. Perfect. Coffee ready. Cigar lit. A peaceful hour ride ahead of me to a course that wasn’t overly challenging—but one that makes you think. But it wasn’t the course that had my mind racing. It was the anticipation. I hadn’t seen some of the guys since missing last year due to work. New faces. Young energy. Old bonds. And that familiar feeling—trash talk waiting to happen before the first swing even touched the ball. This wasn’t just golf anymore. This was ours. A league built in your honor. A fellowship born out of loss but sustained by love, joy, and camaraderie. Something we didn’t take seriously early in life—but now holds weight, meaning, and legacy. Pulling up to the course—you could feel it. It was already alive. Carts lined up. Names on them. Our logo stamped like pride. Guys on the range. Smiles everywhere—but underneath every smile was that look… that quiet competitiveness. The leaderboard? 0–0. Everybody equal. Everybody ready. I walked in, and it was instant: “Chi Chi Rodriguez is here.” Laughter. Handshakes. Love. “Good to see you, OG.” “Pleasure to meet you.” Then the commissioner stepped in—no choosing your comfort zone. He paired us intentionally. Not for convenience… but for connection. That move alone built new bonds. New friendships. New respect. Because growth doesn’t happen where you’re comfortable. I got paired with Ty from Baltimore. Good energy. Solid dude. Our group started off rocky—not terrible, but we were leaving points out there. Two-putts turning into three. Opportunities slipping. And me? I wasn’t putting like I know I can. But then—something simple changed everything. Somebody I never even played with said: “Every time you talk about that club, it’s negative. Why even use it?” That hit different. Then he added: “That other club you used earlier? That looked right.” That was a dropping dimes moment. A small piece of advice that shifted my entire day. As the course opened up, so did everything else. Trash talk flowing from tee to tee. Crossing groups—quick jokes, quick laughs, keeping the energy alive. We weren’t just playing golf. We were building something. At one point, a new guy—real green to the game—was nervous. You could see it. But earlier that week, I said something in the group chat: “You’re not playing the person—you’re playing the course.” He remembered that. Said it helped him settle in. That right there? That’s bigger than golf. We hit the turn, and you could feel it. Some frustration. Some missed chances. Points left on the board. And this course? It wasn’t a walk in the park. Hills. Elevation. Communities stacked within After the turn, we started heating up. Things got better. I shot eight strokes better on the back nine than the front. I was chilling—until you crossed my mind. I could hear you talking trash, counting scores that weren’t yours, yelling, “Stay on Short’s ass!” That moment hit me hard. I dipped mentally. Ty saw it. He asked if I was good. I tried to show bravado, but truthfully, I was overwhelmed. Ty brought me back, and I finished strong. At the clubhouse, we moved tables, got ready for the trophy. The trash talk started again. That day wasn’t just golf; it was legacy. Stop, we think of you. And we’ll keep building—year after year."
    },
    {
      slug: "twp-opener",
      title: "2026 Twp Opener",
      content: "<strong>The StopLee Golf Club </strong> season kicks off <strong>April 18th</strong> at <strong>Broad Run Golfer’s Club</strong> in <strong>West Chester, Pennsylvania</strong> — a course known for its rolling terrain, elevated tee shots, and fast, unforgiving greens. Designed to challenge every part of a golfer’s game, Broad Run doesn’t offer an easy start. It demands focus from the first swing and punishes anything less than committed play. Five groups. Twenty players. One winner. There’s no easing into the season — this opening round sets the tone for everything that follows. With every shot carrying weight, players will need to manage the course, control their nerves, and stay disciplined through all 18 holes. The pressure is real, and the margin for error is small. This isn’t just about posting a good score — it’s about making a statement. The first name at the top of the leaderboard will carry momentum, confidence, and early bragging rights into the season. The question is simple: who shows up ready, and who will set the tone?"
    },
  {
    slug: "season-recap-2025",
    title: "2025 Season Recap",
    content: `Last year wasn’t a season... it was a proving ground. In 2025, this tour became something else. Not just weekend golf. Not just Stableford points. It became a chase—across Glen Mills, Rock Manor, Tamarack, Springfield, Architects, and Bella Vista—for separation. And by the numbers? The gap at the top was real.
<strong>THE STANDARD Jamar </strong> — 113 total points, averaging 18pts per round. It started at The TWP Opener at Glen Mills CC. Twenty-nine points. A tone-setter. Then it followed him everywhere: Rock Manor: calm, controlled, surgical. La Fiesta de Springfield: survived chaos. Augusta in August at Architects GC: another 29-point statement. Tour Championship at Bella Vista: closed the door. Jamar didnt just win weeks. He controlled scoring environments. When the course opened up? He went low. When others stalled? He stacked birdies like interest. 2026 doesnt ask if hes the favorite. It asks whos brave enough to take it from him.
<strong>THE CHASERS Andre </strong> — 105 total points, averaging 17pts per round. If Jamar was inevitability, Andre was pressure. At La Fiesta, Andre put up 23 points—the highest round of the season at Springfield. At Bella Vista, he surged late, reminding everyone that championships don’t always belong to the early leader. Andre lives in the danger zone: Not reckless Not safe Always one hole away from flipping the board. In 2026, if anyone can turn a two-week heater into a title run— it’s him.
<strong> Jay </strong> — 92 total points, averaging 15pts per round. Jay’s season doesn’t show up in highlights. It shows up in absence of collapse. Consistent at Rock Manor Solid at Springfield Dangerous at Architects with 26 points Jay doesn’t need a miracle. He needs one weekend where everyone else blinks.
<strong> Erik </strong> — 89 total points, averaging 14pts per round. The story no one talks about enough. At Glen Mills? Present. At Rock Manor? Locked in. At Architects? Controlled aggression. At Bella Vista? Hung around. Erik didn’t peak. He hovered. And in 2026, hovering might not be enough—or it might be the smartest place to be when chaos hits.
<strong>THE SWING FACTORS Keivon </strong> — 72pts. <strong>Larry</strong> — 69pts. <strong>Malcolm</strong> — 67pts. These are the guys who decide the season without winning it. Malcolm’s 26-pt round at Architects GC was one of the most explosive single-course performances all year. Larry’s 15 at Tamarack showed what happens when rhythm meets setup. Keivon lived in the middle—dangerous, unpredictable, unfinished. If one of them strings two weekends together? The top gets crowded fast.
This season won’t be about surprises. It’ll be about who can survive being hunted.`
  },
  {
    slug: "rivalries-2026",
    title: "2026 Rivalries",
    content: `<strong>RIVALRY #1: Jamar vs. Andre Control vs. Pressure.</strong>This isn’t beef. This is proximity. Andre finished 8 points back last season—close enough to feel every Jamar birdie. At Springfield, Andre posted the highest round of the year. At Bella Vista, he made it uncomfortable late. But Jamar? He never flinched. That’s what makes this rivalry lethal in 2026: Andre plays like the season can be stolen. Jamar plays like it already belongs to him. If Andre beats Jamar head-to-head early—especially at Glen Mills or Rock Manor—the psychological shift could be real.This rivalry decides the season.
<strong>RIVALRY #2: Jay vs. Erik Consistency vs. Opportunity</strong> Jay finished three points ahead of Erik. Three.Same courses. Same weekends. Different styles. Jay waits. Erik presses. At Architects, Jay popped for 26. At Bella Vista, Erik stayed alive but never surged. In 2026, this rivalry is about who takes the risk first: Jay needs to spike once. Erik needs to spike without collapsing. One bold Sunday could flip this matchup for good.
<strong>RIVALRY #3: Malcolm vs. Everyone Ceiling vs. Control </strong> Malcolm’s 26 at Architects GC wasn’t just a good round. It was a warning shot. The problem? He couldn’t bottle it. Malcolm doesn’t need to beat one guy—he threatens the entire middle tier: Jay, Erik, Keivon, Larry. If Malcolm finds even average consistency, someone in the top 4 gets pushed out. He’s the chaos agent of 2026.`
  },
  {
    slug: "rookies-2025",
    title: "Rookie Class of 2025",
    content: `<strong>Rookie of the Year: Malcolm </strong>Total Points: 67 | Avg: 13 per round From the opening tee shot of the TWP Opener at Glen Mills, Malcolm set the tone for what would become one of the most dominant rookie seasons in league history. He wasn’t just steady — he was explosive. Big point totals. Strong finishes.And the ability to rise when the course demanded it most. His standout performances included: 26 points at August in August(Architects GC) — the highest single- event rookie total Consistent double - digit finishes across the season. A closing statement at the Tour Championship at Bella Vista. Malcolm didn’t sneak into Rookie of the Year. He ran away with it.
<strong>Grecco: </strong>Consistency Personified Total Points: 50 | Avg: 8 per round If Malcolm was the hammer, Grecco was the metronome. Week after week, Grecco showed up with the same formula: keep the ball in play, take the points when they’re there, and never implode. His season included strong showings at Rock Manor and Architects GC, keeping him firmly in the ROTY race deep into the year. No flashy collapses. No disappearing acts. Just a smooth swing and dependable golf — and a well-earned second place finish.
<strong>Stephon: </strong> Quietly Dangerous, but far from quiet Total Points: 43 | Avg: 7 per round Stephon’s rookie season was defined by steady improvement and clutch moments. He didn’t need headlines to stay relevant — his scorecard did the talking. Multiple solid finishes and an ability to hang around the leaderboard made him a threat anytime conditions got tough. The scary part? He’s still just getting started.
The 2025 rookies didn’t come in looking for participation trophies. They came in looking to earn respect — and they did. Malcolm stands alone as Rookie of the Year, but this entire class added depth, competition, and future rivalries to the Stoplee Golf Club. If this was the introduction… Next season is going to be loud. 🏌️‍♂️🔥`


  },
  {
    slug: "jamar-threepeat",
  title: "The Standard: Can Jamar Do It Again?",
  description: "The two-time champ isn’t chasing anymore — he’s the one being hunted.",
  date: "Feb 2026",
  readTime: "3 min read",
  content: `Every league has a measuring stick. In the <strong>Stoplee Golf Club,</strong> it’s Jamar.

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
    <div style={{
      maxWidth: "700px",
      margin: "0 auto",
      padding: "16px"
    }}>
    <div style={{ padding: "16px", maxWidth: "700px", margin: "0 auto" }}>
        <Link
        href="/home"
        style={{
            display: "inline-block",
            marginBottom: "20px",
            fontSize: "14px",
            color: "#1d4ed8"
        }}
        >
        ← Back to News
        </Link>
      <h1 style={{ fontSize: "32px",
                  fontWeight: "700",
                  lineHeight: "1.2",
                  marginBottom: "12px"
                      }}>
        {post.title}
      </h1>
      <h4>
        {post.author}
      </h4>

        <div
        className="whitespace-pre-line"
        style={{ marginTop: "16px",   
                fontSize: "18px",
                lineHeight: "1.8",
                color: "#222",
                marginBottom: "20px"
}}
        dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />")}}
        />
    </div>
    </div>
  )
}