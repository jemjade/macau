export type ActivityLevel = "active" | "moderate" | "light" | "recovery";
export type MobilityPreference = "walking" | "public_transport" | "taxi_ok" | "nearby_only";
export type BudgetPreference = "budget" | "moderate" | "flexible";

export interface FreeTimeSlot {
  id: string;
  label: string;
  title: string;
  date: string;
  description: string;
}

export interface Participant {
  id: string;
  name: string;
  availableSlots: string[];
  interests: string[];
  activityLevel: ActivityLevel;
  mobilityPreference: MobilityPreference;
  contentGoal: string[];
  groupMood: string;
  budget: BudgetPreference;
  avoid: string[];
  note?: string;
}

export interface Route {
  id: string;
  title: string;
  area: string;
  duration: string;
  description: string;
  bestFor: string[];
  spots: string[];
  imageUrl?: string;
  mapPoint?: {
    x: number;
    y: number;
    label: string;
  };
  transitHint?: string;
  bestTime?: string;
}

export interface MatchedGroup {
  id: string;
  slotId: string;
  name: string;
  concept: string;
  members: Participant[];
  matchScore: number;
  matchReasons: string[];
  tags: string[];
  recommendedRoutes: Route[];
  meetingSuggestion: string;
  cautions: string[];
  kakaoMessage: string;
}
