
import { fd } from "@/utils/fetch";
import { create } from "zustand";

// Define the types
export interface ScheduleType {
  id: string;
  training_program_id: string;
  batch_id: string;
  start: string;
  end: string;
  created_at: string;
  updated_at: string;
  training_program: TrainingProgram;
  learning_point: LearningPoint[];
  sobat_school: SobatSchool[];
}

export interface TrainingProgram {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface LearningPoint {
  id: string;
  name: string;
  location: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Pivot {
  reg_sched_id: string;
  learning_point_id: string;
}

export interface SobatSchool {
  id: string;
  name: string;
  location: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot2;
}

export interface Pivot2 {
  reg_sched_id: string;
  sobat_school_id: string;
}

// Define store type
export type useEnrollmentScheduleType = {
  schedule: ScheduleType[] | null;
  setSchedule: () => Promise<void>;
};

// Fetch function to get data from API
const handleGet = async () => {
  try {
    return await fd("registration/fields");
  } catch (error) {
    console.error("Error fetching registration fields:", error);
    return null;
  }
};

// Zustand store
export const useEnrollmentSchedule = create<useEnrollmentScheduleType>((set) => ({
  schedule: null,
  setSchedule: async () => {
    const data = await handleGet();
    if (data) {
      set({ schedule: data.data });
    } else {
      console.error("Failed to fetch schedule data.");
    }
  }
}));
