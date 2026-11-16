
import skillsData from '../content/skills.json';

export interface SkillTool {
  name: string;
  shownOn?: {
    label: string;
    id: string;
  };
}

export interface SkillGroup {
  name: string;
  tools: SkillTool[];
}

export const skillGroups = skillsData as SkillGroup[];
