
interface EmptyStateProps {
    message: string;
  }
  
  const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
    return (
      <div className="flex flex-1 items-center justify-center border border-cyan-800 rounded-md border-dotted min-h-[200px]">
        {message}
      </div>
    );
  };


export default EmptyState;