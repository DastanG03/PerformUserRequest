export type Lang = "en" | "sw"
export type Page =
  | "home" | "about" | "ministries" | "youth" | "choir"
  | "sermons" | "events" | "prayer" | "resources" | "donate" | "contact" | "admin"

export const TX: Record<Lang, Record<string, string>> = {
  en: {
    churchName: "Kariakoo Seventh-day Adventist Church",
    city: "Dar es Salaam, Tanzania",
    tagline: "Faith · Hope · Service",
    watchLive: "Watch Live",
    prayerReq: "Prayer Request",
    giveBtn: "Give / Donate",
    joinSabbath: "Join Us This Sabbath",
    sabbathSch: "Sabbath School 9:30 AM",
    divineService: "Divine Service 11:00 AM",
    members: "Active Members",
    mins: "Ministries",
    years: "Years of Faith",
    souls: "Souls Won",
    aiGreeting: "Habari! I'm the Kariakoo SDA Church assistant. How can I help you today? / Naweza kukusaidia vipi?",
  },
  sw: {
    churchName: "Kanisa la Wasabato la Kariakoo",
    city: "Dar es Salaam, Tanzania",
    tagline: "Imani · Tumaini · Huduma",
    watchLive: "Tazama Moja kwa Moja",
    prayerReq: "Ombi la Maombi",
    giveBtn: "Toa / Changia",
    joinSabbath: "Jiunge Nasi Sabato",
    sabbathSch: "Shule ya Sabato 9:30 AM",
    divineService: "Ibada ya Asubuhi 11:00 AM",
    members: "Wanachama",
    mins: "Huduma",
    years: "Miaka ya Imani",
    souls: "Roho Zilizokolewa",
    aiGreeting: "Habari! Mimi ni msaidizi wa Kanisa la SDA Kariakoo. Naweza kukusaidia vipi leo?",
  },
}

export const HERO_SLIDES = [
  { bg: "/src/imports/real-gallery-1.jpg",   tag: "Music Ministry",   title: "Voices Lifted in Praise",            sub: "The Hannanims & Disciples Choirs — Kariakoo, Dar es Salaam" },
  { bg: "/src/imports/real-gallery-2.jpg",   tag: "Youth Ministry",   title: "A Generation Rising for Christ",     sub: "Adventurers · Pathfinders · Ambassadors · Adult Youth" },
  { bg: "/src/imports/real-gallery-3.jpg",   tag: "Choir Ministry",   title: "Disciples Choir — Worship in Unity", sub: "Ushirika wa Ibada kupitia Muziki wa Injili" },
  { bg: "/src/imports/real-gallery-4.jpg",   tag: "Fellowship",       title: "Joy in Every Gathering",             sub: "One family, one faith, one mission in Kariakoo" },
  { bg: "/src/imports/real-gallery-5.jpg",   tag: "Community",        title: "Nourishing Body & Soul",             sub: "Health Ministry & Community Service serving Dar es Salaam" },
  { bg: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1600&h=900&fit=crop&auto=format", tag: "Evangelism", title: "Taking the Gospel to All Tanzania", sub: "OneVoice Campaign · Church Outreach · Mission Events" },
]

export const ANNOUNCEMENTS_SEED = [
  { title: "OneVoice Evangelism Campaign", body: "Begins August 23 — All members are warmly invited to participate.", category: "Evangelism" },
  { title: "Pathfinder Camporee 2026", body: "Registration NOW OPEN — Closes September 1, 2026.", category: "Youth" },
  { title: "Hannanims Choir Concert", body: "Saturday Sept 13, 5:00 PM at Main Sanctuary. All welcome.", category: "Music" },
  { title: "Sabbath School Quarterly", body: "New quarterly now available at the Welcome Desk.", category: "Worship" },
  { title: "Church Building Fund Update", body: "TZS 24.5M raised of TZS 50M goal. Thank you for your generous giving!", category: "General" },
]

export const MINISTRIES_DATA = [
  {
    icon: "👶", name: "Children Ministry", slug: "children",
    desc: "Nurturing faith from the very youngest age through story, song and prayer.",
    leaders: "Sis. Grace Kamau",
    activities: ["Cradle Roll", "Kindergarten Sabbath School", "Children's Story Time", "Vacation Bible School"],
    img: "https://images.unsplash.com/photo-1488509082528-cefbba5ad692?w=600&h=400&fit=crop&auto=format",
    gallery: ["https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=280&fit=crop","https://images.unsplash.com/photo-1488509082528-cefbba5ad692?w=400&h=280&fit=crop"]
  },
  {
    icon: "🎒", name: "Adventurers", slug: "adventurers",
    desc: "Character-building, crafts, and fun for children ages 6–9.",
    leaders: "Bro. Samuel Oduya",
    activities: ["Weekly Club Meetings", "Crafts & Awards", "Community Service Projects", "Induction Ceremony"],
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop&auto=format",
    gallery: ["https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=280&fit=crop"]
  },
  {
    icon: "⛺", name: "Pathfinders", slug: "pathfinders",
    desc: "Adventure, camping, honour badges and Christ-centred growth for ages 10–15.",
    leaders: "Bro. Timothy Njoroge",
    activities: ["Honour Badge Program", "Camporee 2026", "Community Outreach", "Nature Study", "First Aid Training"],
    img: "https://images.unsplash.com/photo-1559494017-3d50b3ff3fc1?w=600&h=400&fit=crop&auto=format",
    gallery: ["/src/imports/real-gallery-2.jpg","https://images.unsplash.com/photo-1559494017-3d50b3ff3fc1?w=400&h=280&fit=crop"]
  },
  {
    icon: "🦅", name: "Ambassadors", slug: "ambassadors",
    desc: "Leadership development, evangelism and community impact for ages 16–21.",
    leaders: "Sis. Faith Mwamba",
    activities: ["Leadership Training", "Evangelism Campaigns", "Community Service", "Youth Retreats"],
    img: "/src/imports/real-gallery-3.jpg",
    gallery: ["/src/imports/real-gallery-3.jpg","/src/imports/real-gallery-4.jpg"]
  },
  {
    icon: "🎓", name: "Adult Youth", slug: "adult-youth",
    desc: "Young professionals (22–35) growing together in faith, purpose and community.",
    leaders: "Bro. Joseph Mwangi",
    activities: ["Bible Study Groups", "Professional Networking", "Young Families Support", "Social Events"],
    img: "/src/imports/real-gallery-4.jpg",
    gallery: ["/src/imports/real-gallery-4.jpg"]
  },
  {
    icon: "👨‍👩‍👧‍👦", name: "Family Ministry", slug: "family",
    desc: "Strengthening marriages and homes as the first church of God.",
    leaders: "Pastor & Mrs. Mwenda",
    activities: ["Marriage Enrichment Seminars", "Parenting Classes", "Family Retreats", "Counselling Services"],
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop&auto=format",
    gallery: ["https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=280&fit=crop"]
  },
  {
    icon: "👩‍👩‍👧", name: "Women's Ministry", slug: "womens",
    desc: "Empowering women to lead with grace, wisdom and conviction.",
    leaders: "Sis. Esther Kariuki",
    activities: ["Prayer Circles", "Skills Training", "Health Awareness", "Women's Retreat", "Community Outreach"],
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=400&fit=crop&auto=format",
    gallery: ["https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=280&fit=crop"]
  },
  {
    icon: "👨‍💼", name: "Men's Ministry", slug: "mens",
    desc: "Building disciplined men of God for strong families and communities.",
    leaders: "Elder Peter Makene",
    activities: ["Men's Prayer Breakfasts", "Leadership Development", "Sports Events", "Community Service"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format",
    gallery: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=280&fit=crop"]
  },
  {
    icon: "🎵", name: "Music Ministry", slug: "music",
    desc: "Four choirs lifting Kariakoo in praise every Sabbath and beyond.",
    leaders: "Bro. Daniel Musyoka",
    activities: ["Weekly Rehearsals", "Sabbath Worship", "Concerts & Events", "Recording Projects"],
    img: "/src/imports/real-gallery-1.jpg",
    gallery: ["/src/imports/real-gallery-1.jpg","/src/imports/real-gallery-2.jpg","/src/imports/real-gallery-3.jpg"]
  },
  {
    icon: "❤️", name: "Health Ministry", slug: "health",
    desc: "Whole-person wellness — body, mind and spirit — through NEWSTART principles.",
    leaders: "Dr. Ruth Njau",
    activities: ["Health Screenings", "Cooking Classes", "Marathon Events", "Smoking Cessation", "NEWSTART Seminars"],
    img: "/src/imports/real-gallery-5.jpg",
    gallery: ["/src/imports/real-gallery-5.jpg"]
  },
  {
    icon: "📖", name: "Sabbath School", slug: "sabbath-school",
    desc: "Deep, transformative Bible study every Saturday morning at 9:30 AM.",
    leaders: "Elder James Kiprotich",
    activities: ["Adult Divisions", "Youth Divisions", "Children's Divisions", "Mission Report", "Lesson Study"],
    img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=400&fit=crop&auto=format",
    gallery: ["https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=280&fit=crop"]
  },
  {
    icon: "🤝", name: "Community Services", slug: "community",
    desc: "Feeding, clothing and uplifting vulnerable families across Kariakoo.",
    leaders: "Sis. Mary Otieno",
    activities: ["Food Distribution", "Clothing Drives", "Literacy Programs", "Orphan Care", "Prison Ministry"],
    img: "/src/imports/real-gallery-5.jpg",
    gallery: ["/src/imports/real-gallery-5.jpg"]
  },
  {
    icon: "🌍", name: "Personal Ministries", slug: "personal",
    desc: "Equipping every member to share the gospel with boldness and love.",
    leaders: "Bro. Andrew Kamau",
    activities: ["Bible Studies Training", "Literature Evangelism", "Lay Evangelism", "Visitation Ministry"],
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format",
    gallery: []
  },
  {
    icon: "📣", name: "Evangelism", slug: "evangelism",
    desc: "Coordinated outreach campaigns reaching thousands across Dar es Salaam.",
    leaders: "Pastor Timothy Mwenda",
    activities: ["OneVoice Campaign", "Public Evangelism", "Media Ministry", "Door-to-Door", "Bible Correspondence"],
    img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&h=400&fit=crop&auto=format",
    gallery: []
  },
]

export const RESOURCES_DATA = [
  {
    cat: "Holy Bible",
    icon: "📖",
    color: "#1739a0",
    items: [
      { title: "Holy Bible — King James Version", type: "read", url: "https://www.biblegateway.com/passage/?search=John+3%3A16&version=KJV" },
      { title: "Holy Bible — New International Version", type: "read", url: "https://www.biblegateway.com/passage/?search=John+3%3A16&version=NIV" },
      { title: "Biblia Takatifu — Kiswahili", type: "read", url: "https://www.biblegateway.com/passage/?search=Yohana+3%3A16&version=SYNT" },
      { title: "Bible Study Tools", type: "link", url: "https://www.biblegateway.com" },
    ]
  },
  {
    cat: "Ellen G. White Books",
    icon: "📕",
    color: "#7c3aed",
    items: [
      { title: "The Desire of Ages", type: "pdf", url: "https://media.adventist.org/misc/The-Desire-of-Ages.pdf" },
      { title: "Steps to Christ", type: "pdf", url: "https://media.adventist.org/misc/Steps-to-Christ.pdf" },
      { title: "The Great Controversy", type: "pdf", url: "https://media.adventist.org/misc/The-Great-Controversy.pdf" },
      { title: "Christ's Object Lessons", type: "pdf", url: "https://egwwritings.org" },
      { title: "Education", type: "link", url: "https://egwwritings.org" },
      { title: "Ministry of Healing", type: "link", url: "https://egwwritings.org" },
    ]
  },
  {
    cat: "Sabbath School",
    icon: "🏫",
    color: "#059669",
    items: [
      { title: "Adult Bible Study Guide — Q3 2026", type: "pdf", url: "https://ssnet.org" },
      { title: "Youth Sabbath School Quarterly", type: "pdf", url: "https://ssnet.org" },
      { title: "Children's Division Resources", type: "link", url: "https://ssnet.org" },
      { title: "Lesson Study Online", type: "read", url: "https://ssnet.org" },
    ]
  },
  {
    cat: "Church Manuals",
    icon: "📋",
    color: "#c4880a",
    items: [
      { title: "SDA Church Manual 2022 Edition", type: "pdf", url: "https://www.adventist.org/church-manual/" },
      { title: "Pathfinder Club Manual", type: "pdf", url: "https://www.adventist.org" },
      { title: "Adventurer Club Manual", type: "pdf", url: "https://www.adventist.org" },
      { title: "Stewardship Resource Guide", type: "pdf", url: "https://www.adventist.org" },
    ]
  },
  {
    cat: "Youth Resources",
    icon: "🦅",
    color: "#dc2626",
    items: [
      { title: "Pathfinder Honour Requirements", type: "pdf", url: "https://www.pathfindersonline.org" },
      { title: "Adventurer Award Handbook", type: "pdf", url: "https://www.pathfindersonline.org" },
      { title: "Youth Leadership Training Manual", type: "pdf", url: "https://www.adventist.org" },
      { title: "Camporee Preparation Guide", type: "pdf", url: "https://www.adventist.org" },
    ]
  },
  {
    cat: "Family Life",
    icon: "👨‍👩‍👧‍👦",
    color: "#0891b2",
    items: [
      { title: "Marriage Enrichment Guide", type: "pdf", url: "https://www.adventist.org" },
      { title: "Parenting by Grace", type: "pdf", url: "https://www.adventist.org" },
      { title: "Family Devotional Guide", type: "pdf", url: "https://www.adventist.org" },
      { title: "Home & Family Resource Center", type: "link", url: "https://www.adventist.org" },
    ]
  },
]

export const DONATE_GOALS = [
  { icon: "🏛️", name: "Church Building Fund",    raised: 24500000, goal: 50000000 },
  { icon: "🌍", name: "Evangelism Campaign",      raised: 8200000,  goal: 15000000 },
  { icon: "⛺", name: "Youth Camporee 2026",      raised: 3600000,  goal: 6000000  },
  { icon: "🤝", name: "Community Food Drive",     raised: 1800000,  goal: 3000000  },
]

export const SOCIAL_LINKS = [
  { name: "Facebook",  icon: "facebook",  url: "https://facebook.com/kariakoosdachurch",  color: "#1877f2" },
  { name: "YouTube",   icon: "youtube",   url: "https://youtube.com/@kariakoosdachurch",  color: "#ff0000" },
  { name: "Instagram", icon: "instagram", url: "https://instagram.com/kariakoosdachurch", color: "#e1306c" },
  { name: "X",         icon: "x",         url: "https://x.com/kariakoosdachurch",         color: "#14171a" },
  { name: "TikTok",    icon: "tiktok",    url: "https://tiktok.com/@kariakoosdachurch",   color: "#010101" },
  { name: "WhatsApp",  icon: "whatsapp",  url: "https://wa.me/255756123456",              color: "#25d366" },
]

export const NAV_ITEMS: { label: string; page: Page }[] = [
  { label: "Home",       page: "home"      },
  { label: "About",      page: "about"     },
  { label: "Ministries", page: "ministries"},
  { label: "Youth",      page: "youth"     },
  { label: "Choir",      page: "choir"     },
  { label: "Sermons",    page: "sermons"   },
  { label: "Events",     page: "events"    },
  { label: "Prayer",     page: "prayer"    },
  { label: "Resources",  page: "resources" },
  { label: "Give",       page: "donate"    },
  { label: "Contact",    page: "contact"   },
]
