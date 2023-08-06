import { useState } from "react";

interface TabBarProps {
    tabs: string[];
    theme: "light" | "dark";
  }
  
  function TabBar({ tabs, theme }: TabBarProps) {
    const [selectedTab, setSelectedTab] = useState(tabs[0]); // Default to first tab
    const textColor = theme === "dark" ? 'text-white' : 'text-black';
    return (
      <div className={`flex gap-8 mx-8 ${textColor}`}>
        {tabs.map((tab, index) => (
          <TabItem 
            key={index} 
            title={tab} 
            isSelected={tab === selectedTab} 
            onSelect={() => setSelectedTab(tab)}
          />
        ))}
      </div>
    )
  }

  export default TabBar;
  
  interface TabItemProps {
    title: string;
    isSelected: boolean;
    onSelect: () => void;
  }
  
  function TabItem({ title, isSelected, onSelect }: TabItemProps) {
    return (
      <div 
        onClick={onSelect}
        className={`cursor-pointer p-1
         ${isSelected ? 'text-slate-400' : 'text-slate-200'}`}
      >
        {title}
      </div>
    )
  }
  