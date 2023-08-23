import { Caption, H1 } from '../Typography';

const KPI = ({ title, children }: any) => {
    return (
        <div className="flex flex-col gap-1 py-2 px-4">
            <Caption>{title}</Caption>
            <H1>{children}</H1>
        </div>
    );
}

export default KPI;