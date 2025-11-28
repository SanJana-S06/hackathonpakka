import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProjectSwitcherProps {
  projects: { id: string; name: string; description: string; projectAdmin?: any; Role?: string }[];
  onSelectProject: (project: { id: string; name: string }) => void;
}

export default function ProjectSwitcher({
  projects,
  onSelectProject,
}: ProjectSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  console.log("Projects in ProjectSwitcher:", projects);
 return (
  <div className="flex overflow-x-hidden flex-wrap gap-4 mt-2">
    {projects.length > 0 &&
      projects.map((project) => (
        <div
            key={project.id}
            onClick={() => {
              onSelectProject(project);
              setIsOpen(false);
              navigate(`/project/${project.id}/${project.name}/dashboard`);
            }}
            className="border rounded-lg  bg-white shadow-sm hover:shadow-md cursor-pointer w-60 h-56 flex flex-col"
          >
            <div className='text-lg p-3 text-center font-medium border-b border-gray-200 bg-gray-200'>
                <span className="text-gray-900 truncate">{project.name}</span>
            </div>     
            <div className="p-5 h-24 text-base font-medium text-gray-600">
                <span>Description:</span>
                  <br/>
                    <p
                      className="
                        pl-3 text-sm font-normal text-gray-500 mt-2
                        break-words overflow-hidden text-ellipsis line-clamp-2
                      "
                    >
                      {project.description}
                   </p>
            </div>
            <div className="mt-3 p-3 text-gray-500">
                <span>Role: </span>
                <span className="font-medium">
                  {project.Role}
                </span>
            </div>
         </div>
      ))}
  </div>
);


}
