export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  features: string[];
  link?: string;
  github?: string;
  npm?: string;
  status: "production" | "development" | "published";
  type: "web" | "mobile" | "cli" | "library";
  teamProject?: boolean;
}
