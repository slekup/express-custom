type Themes =
  | 'default'
  | 'dark'
  | 'facebook'
  | 'slack'
  | 'stack-overflow'
  | 'raspberry'
  | 'brave'
  | 'terminal'
  | 'high-contrast-light'
  | 'high-contrast-dark';

interface Socials {
  discord: string;
  github: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  twitter: string;
  email: string;
}

export default interface Config {
  file: string;
  name: string;
  description: string;
  logo: string;
  output: string;
  customDir: string;
  theme: Themes;
  socials: Socials;
}
