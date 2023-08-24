import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { TabBar } from '.';

const SearchBar = () => {
  return (
    <div className="relative">
      <SearchDropdown />
    </div>
  );
}

const SearchDropdown = () => {
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedTab, setSelectedTab] = useState('All');

    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const fetchSuggestions = debounce(async (inputValue) => {
        try {
            const response = await fetch(`/search?q=${inputValue}`);
            if (response.ok) {
                const data = await response.json();
                setSuggestions(data);
                setShowDropdown(true);
            } else {
                console.error("Error fetching suggestions:", await response.text());
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    }, 300); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);
        if (inputValue) {
            fetchSuggestions(inputValue);
        } else {
            setShowDropdown(false);
        }
    }

    const handleSuggestionClick = (suggestion) => {
        setSearchInput(suggestion.name);
        setShowDropdown(false);
    
        let routePath = '';
        switch (suggestion.type) {
            case 'candidate':
                routePath = `/candidates/${suggestion.id}`;
                break;
            case 'client':
                routePath = `/clients/${suggestion.id}`;
                break;
            case 'job':
                routePath = `/jobs/${suggestion.id}`;
                break;
            case 'organisation':
                routePath = `/organisations/${suggestion.id}`;
                break;
            default:
                console.error("Unknown suggestion type:", suggestion.type);
                return;
        }
    
        navigate(routePath);
    }

    const filteredSuggestions = selectedTab === 'All'
    ? suggestions
    : suggestions.filter(suggestion => suggestion.type.toLowerCase() === selectedTab.slice(0, -1).toLowerCase());

    return (
        <div ref={dropdownRef}>
            <input
                type="text"
                placeholder="Search"
                className="bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-md px-3 py-1 min-w-[500px]"
                value={searchInput}
                onChange={handleChange}
            />
            {showDropdown && (
                <div className="absolute top-full left-0 mt-2 w-full border border-gray-300 bg-white z-10 rounded-md">
                    {/* Use onSelectTab instead of onTabChange */}
                    <TabBar tabs={['All', 'Candidates', 'Clients', 'Jobs', 'Organisations']} onSelectTab={handleTabChange} />
                    {filteredSuggestions.map(suggestion => (
                        <div 
                            key={suggestion.id} 
                            className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
