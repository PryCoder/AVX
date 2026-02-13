import { Figma, Globe, Code } from 'lucide-react';

export const getProjectIcon = (iconName) => {
  const icons = {
    Figma: <Figma className="w-4 h-4" />,
    Globe: <Globe className="w-4 h-4" />,
    Code: <Code className="w-4 h-4" />
  };
  return icons[iconName] || <Globe className="w-4 h-4" />;
};