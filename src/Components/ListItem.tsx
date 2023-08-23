
import { Caption, P2 } from '../Typography';

type ListItemProps = {
    title: string;
    children: React.ReactNode;
}

const ListItem = ({ title, children }: ListItemProps) => {
    return (
        <div className="flex flex-col gap-1 py-2 px-3 min-w-[200px]">
            <Caption>{title}</Caption>
            <P2>{children}</P2>
        </div>
    );
}

export default ListItem;

