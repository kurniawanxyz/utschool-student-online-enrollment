
import { fd } from "@/utils/fetch";
import { create } from "zustand";

// Define the types

export interface ScheduleType {
  training_programs: TrainingProgram[]
  schedules: Schedule[]
}

export interface TrainingProgram {
  id: string
  name: string
}

export interface Schedule {
  id: string
  learning_point_id: string
  batch_id: string
  training_program_id: string
  start: string
  end: string
  created_at: string
  updated_at: string
  training_program: TrainingProgram2
  sobat_school: SobatSchool[],
  learning_point: LearningPoint
}

export interface LearningPoint {
  id: string;
  name: string;
  location: string;
}

export interface TrainingProgram2 {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface SobatSchool {
  id: string
  name: string
  location: string
  created_at: string
  updated_at: string
  pivot: Pivot
}

export interface Pivot {
  reg_schedule_id: string
  sobat_school_id: string
}
// Define store type
export type useEnrollmentScheduleType = {
  schedule: Schedule[] | null;
  training_program: TrainingProgram[] | null;
  learning_point: LearningPoint[]
  sobat: SobatSchool[]
  setSchedule: () => Promise<void>;
  setLearningPoint: (id: string) => void;
  setSobat: (scheduleId: string) => void;
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
export const useEnrollmentSchedule = create<useEnrollmentScheduleType>((set, get) => ({
  schedule: null,
  training_program: null,
  learning_point: [],
  sobat: [],
  setSchedule: async () => {
    const res = await handleGet();
    const data: ScheduleType = await res.data
    if (data) {
      const idTracker = new Set()
      const learning_point = data.schedules?.reduce((acc, item: Schedule) => {
        if (!idTracker.has(item.id)) {
          idTracker.add(item.id);
          acc.push(item.learning_point as never);
        }
        return acc;
      }, []) || [];
      set({ schedule: data.schedules, training_program: data.training_programs, learning_point: learning_point });
    } else {
      console.error("Failed to fetch schedule data.");
    }
  },
  setLearningPoint: (training_program_id) => {
    const { schedule } = get()
    if (schedule) {
      const learning_point = schedule?.filter((item) => item.training_program_id === training_program_id).map(item => {
        return item.learning_point
      })
      set({
        learning_point
      })
    }
  },
  setSobat: (id) => {
    const { schedule } = get()
    if (schedule) {
      const sobat = schedule.find(item => item.learning_point_id === id)?.sobat_school
      set({
        sobat: sobat
      })
    } else {
      set({
        sobat: []
      })
    }

  }
}));
