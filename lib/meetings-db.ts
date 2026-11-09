import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Ward temple night: May 10"],
    openingHymn: {
      number: 2,
      title: "The Spirit of God",
    },
    openingPrayer: "Sister Williams",
    wardBusiness: [
      {
        description: "Sustaining of new Primary president",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "As Now We Take the Sacrament",
    },
    speakers: [
      {
        name: "Sister Brown",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Youth Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 31,
      title: "O God, Our Help in Ages Past",
    },
    closingPrayer: "Brother Davis",
  },
  {
    id: 2,
    date: "2026-05-10",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Davis",
    announcements: ["Ward activity: May 16"],
    openingHymn: {
      number: 136,
      title: "I Know That My Redeemer Lives",
    },
    openingPrayer: "Sister Johnson",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 172,
      title: "In Humility, Our Savior",
    },
    speakers: [
      {
        name: "Bishop Smith",
        topic: "Opening testimony",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 152,
      title: "God Be with You Till We Meet Again",
    },
    closingPrayer: "Brother Wilson",
  },
  {
    id: 3,
    date: "2026-05-17",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Youth activity: May 20", "Ward conference: May 24"],
    openingHymn: {
      number: 6,
      title: "Redeemer of Israel",
    },
    openingPrayer: "Brother Taylor",
    wardBusiness: [
      {
        description: "Release of Sunday School teacher",
      },
      {
        description: "Calling of new Sunday School teacher",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 170,
      title: "God, Our Father, Hear Us Pray",
    },
    speakers: [
      {
        name: "Brother Miller",
        topic: "The power of prayer",
        type: "speaker",
      },
      {
        name: "Sister Anderson",
        topic: "Following the Savior",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 301,
      title: "I Am a Child of God",
    },
    closingPrayer: "Sister Thompson",
  },
  {
    id: 4,
    date: "2026-05-24",
    meetingType: "stake",
    presiding: "President Clark",
    conducting: "Bishop Smith",
    announcements: ["Stake conference: June 7"],
    openingHymn: {
      number: 5,
      title: "High on the Mountain Top",
    },
    openingPrayer: "Brother Garcia",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 173,
      title: "While of These Emblems We Partake",
    },
    speakers: [
      {
        name: "President Clark",
        topic: "Strengthening families",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "",
        type: "musical-number",
      },
      {
        name: "Sister Martinez",
        topic: "Serving with love",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 220,
      title: "Lord, I Would Follow Thee",
    },
    closingPrayer: "Sister Lopez",
  },
  {
    id: 5,
    date: "2026-05-31",
    meetingType: "general",
    presiding: "Bishop Smith",
    conducting: "Brother Davis",
    announcements: ["General conference broadcast available online"],
    openingHymn: {
      number: 85,
      title: "How Firm a Foundation",
    },
    openingPrayer: "Brother Harris",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 174,
      title: "While of These Emblems We Partake",
    },
    speakers: [
      {
        name: "President Carter",
        topic: "Hope through Jesus Christ",
        type: "speaker",
      },
      {
        name: "General Conference Choir",
        topic: "",
        type: "musical-number",
      },
      {
        name: "Sister Evans",
        topic: "Personal revelation",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 134,
      title: "I Believe in Christ",
    },
    closingPrayer: "Sister Moore",
  },
  {
    id: 6,
    date: "2026-11-01",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Davis",
    announcements: ["Ward activity: November 7"],
    openingHymn: {
      number: 136,
      title: "I Know That My Redeemer Lives",
    },
    openingPrayer: "Sister Anderson",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 172,
      title: "In Humility, Our Savior",
    },
    speakers: [
      {
        name: "Bishop Smith",
        topic: "Opening testimony",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 152,
      title: "God Be with You Till We Meet Again",
    },
    closingPrayer: "Brother Wilson",
  },
  {
    id: 7,
    date: "2026-11-08",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: [
      "Ward temple night: November 14",
      "Youth activity: November 18",
    ],
    openingHymn: {
      number: 2,
      title: "The Spirit of God",
    },
    openingPrayer: "Sister Johnson",
    wardBusiness: [
      {
        description: "Calling of new Primary teacher",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "As Now We Take the Sacrament",
    },
    speakers: [
      {
        name: "Brother Miller",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "",
        type: "musical-number",
      },
      {
        name: "Sister Anderson",
        topic: "Following the Savior",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 220,
      title: "Lord, I Would Follow Thee",
    },
    closingPrayer: "Sister Thompson",
  },
  {
    id: 8,
    date: "2026-11-15",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Davis",
    announcements: ["Ward service project: November 21"],
    openingHymn: {
      number: 6,
      title: "Redeemer of Israel",
    },
    openingPrayer: "Brother Garcia",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 170,
      title: "God, Our Father, Hear Us Pray",
    },
    speakers: [
      {
        name: "Sister Martinez",
        topic: "Serving with love",
        type: "speaker",
      },
      {
        name: "Brother Wilson",
        topic: "The power of prayer",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 301,
      title: "I Am a Child of God",
    },
    closingPrayer: "Sister Lopez",
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter(
      (meeting: SacramentMeeting) => meeting.date === date,
    );
  }

  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return (
    meetings.find((meeting: SacramentMeeting) => meeting.id === id) ?? null
  );
}
