interface FABProps {
    icon: React.ReactElement<SVGElement>;
  } 
  
export const FAB = ({ icon }: FABProps) => {
    return (
      <div className="bg-white flex items-center justify-center p-4 text-slate-600 rounded-full shadow-lg shadow-slate-600 border border-slate-200">
          {icon} 
      </div>
    );
  };