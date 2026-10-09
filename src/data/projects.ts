import { tdiProjects } from './tdi';
export { tdiProjects } from './tdi';
import { LaboralList } from './work.js';
export interface Project {
  id: string;
  name: string;
  image: string;
  skills: string;
  repository?: string;
  livedemo?: string;
  category: 'personal-projects' | 'projects-bbx' | 'projects-tdi';
  isDemo?: boolean;
  description?: Partial<Record<'es' | 'en' | 'pt', string>>;
}
export const personalProjects: Project[] = [
    {
    id: 'vici-studio',
    name: 'Landing Vici Studio',
    image: 'https://ik.imagekit.io/mmagnodev/vici-studio-landing-webapp.webp',
    skills: 'Astro, React Js,Tailwind, TypeScript, Vercel, Firebase',
    livedemo: 'https://vicistudio.com.mx',
    category: 'personal-projects',
  },
  {
    id: 'portfolio-marcosgzz',
    name: 'Portfolio Marcos GZZ',
    image: 'https://ik.imagekit.io/mmagnodev/portfolio%20marcos%20gzz.webp',
    skills: 'Astro, Tailwind, TypeScript, Vercel',
    livedemo: 'https://marcosgzz.tech',
    category: 'personal-projects',
  },
  {
    id: 'spotify-concept',
    name: 'Spotify Concept',
    image: 'https://ik.imagekit.io/mmagnodev/spotify-concept-desktop.webp',
    skills: 'HTML, CSS, JavaScript',
    livedemo: 'https://spotify-concept-2023.web.app/',
    category: 'personal-projects',
  },
  {
    id: 'magno-social',
    name: 'MagnoSocial',
    image: 'https://ik.imagekit.io/mmagnodev/magnosocial.webp',
    skills: 'Django, Python, Bootstrap',
    repository: 'https://github.com/mmagno99/SocialDjango',
    category: 'personal-projects',
  },
  
];
// IDs are explicit and stable: changing display order must never change URLs.
export const workProjects: Project[] = LaboralList.map((project) => ({
  ...project,
  category: 'projects-bbx',
}));
export const projects = [...personalProjects, ...workProjects, ...tdiProjects];
