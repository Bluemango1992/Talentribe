
import { Caption, P2 } from '../Typography';

type ListItemProps = {
    title: string;
    children: React.ReactNode;
}

const ListItem = ({ title, children }: ListItemProps) => {
    return (
        <div className="flex flex-col gap-1">
            <Caption>{title}</Caption>
            <P2>{children}</P2>
        </div>
    );
}

export default ListItem;

