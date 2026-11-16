
import type { Discipline } from './assets';
import projectsData from '../content/projects.json';

export type RoleType =
  | 'Training project'
  | 'Academic project'
  | 'Freelance work'
  | 'Professional work';

export interface Project {
  id: string;
  no: string;
  title: string;
  type: string;
  discipline: Discipline;
  purpose: string;
  software: string[];
  scope: string[];
  deliverables: string[];
  roleType: RoleType;
  roleNote: string;
  heroId: string;
}

export const projects = projectsData as Project[];

export function getProject(id: string): Project {
  const project = projects.find((p) => p.id === id);

  if (!project) {
    throw new Error(`Unknown project id: ${id}`);
  }

  return project;
}
