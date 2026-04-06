export const config = {
  timeline: {
    opensDeadline:      import.meta.env.VITE_OPENS_APPLICATION_DEADLINE ?? "TBD",
    qualifiersDeadline: import.meta.env.VITE_QUALIFIERS_DEADLINE         ?? "TBD",
    finalistsAnnounced: import.meta.env.VITE_FINALISTS_ANNOUNCED          ?? "TBD",
    pitchDay:           import.meta.env.VITE_PITCH_DAY                    ?? "TBD",
  },
  prizes: {
    first:  import.meta.env.VITE_PRIZE_1ST ?? "TBD",
    second: import.meta.env.VITE_PRIZE_2ND ?? "TBD",
    third:  import.meta.env.VITE_PRIZE_3RD ?? "TBD",
  },
  finalistTeams: {
    team1: import.meta.env.VITE_FINALIST_TEAM_1 ?? "Team 1",
    team2: import.meta.env.VITE_FINALIST_TEAM_2 ?? "Team 2",
    team3: import.meta.env.VITE_FINALIST_TEAM_3 ?? "Team 3",
    team4: import.meta.env.VITE_FINALIST_TEAM_4 ?? "Team 4",
  },
  submissionUrls: {
    opens:      import.meta.env.VITE_OPENS_SUBMISSION_URL          ?? "",
    qualifiers: import.meta.env.VITE_QUALIFIERS_SUBMISSION_URL     ?? "",
    finalists:  import.meta.env.VITE_FINALIST_PRESENTATION_URL     ?? "",
    voting:     import.meta.env.VITE_VOTING_PROCEDURE_URL          ?? "",
  },
} as const;
