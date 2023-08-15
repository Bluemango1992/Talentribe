interface FABProps {
    icon: React.ReactElement<SVGElement>;
  } 
  
export const FAB = ({ icon }: FABProps) => {
    return (
      <div className="bg-slate-100 rounded-full h-10 w-10 flex items-center justify-center">
          {icon}
      </div>
    );
  };