import { Caption, H2, H4 } from '../Typography';
import { FaPlus } from 'react-icons/fa';

type HeaderCardProps = {
    heading: string;
    subHeading?: string | number;
    onClick?: () => void;
    icon?: React.ReactNode;
    showIcon?: boolean;
    headingSize?: boolean;
}

const HeaderCard = ({ heading='Title', subHeading='', icon=<FaPlus />, onClick=(() => {}), showIcon=true, headingSize=true }: HeaderCardProps) => {

    return (
        <div className="flex p-4 bg-slate-100">
            <div className="flex flex-col flex-1 gap-1">
            {headingSize ? <H4>{heading}</H4> : <H2>{heading}</H2>}
            {subHeading && <Caption>{subHeading}</Caption>} 
            </div>
                {showIcon && (
                    <button className="flex justify-center items-center bg-slate-200 rounded-full w-8 h-8" onClick={() => {}}>
                        <div className="w-4 h-4 text-slate-600">
                            {icon}
                        </div>
                    </button>
                )}
            </div>
    );
}

export default HeaderCard;