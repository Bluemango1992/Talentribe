import { H1, P2 } from '../Typography';

type TemplateProps = {
    top?: React.ReactNode;   
    left?: React.ReactNode;
    middle?: React.ReactNode;
    right?: React.ReactNode;
}

const Template = ({ top = <Top />, left = <Left />, middle = <Middle />, right = <Right /> }: TemplateProps) => {
    return (
        <div className='flex h-full flex-col gap-3'>
            <div className='flex w-full'>
                {top}
            </div>
            <div className='flex h-full gap-4'>
                <div className='flex flex-col gap-3'>
                    {left}
                </div>
                <div className='flex flex-col flex-1 gap-3'>
                    {middle}
                </div>
                <div className='flex flex-col flex-1 gap-3'>
                    {right}
                </div>
            </div>
        </div>
    );
}

export default Template

const Top = () => {
    return (
        <div className='flex flex-1 flex-col bg-white p-4 h-full'>
            <H1>Top</H1>
            <P2>Top</P2>
        </div>
    );
}

const Left = () => {
    return (
        <div className='flex flex-1 flex-col bg-white p-4 h-full'>
            <H1>Left</H1>
            <P2>Left</P2>
        </div>
    );
}

const Middle = () => {
    return (
        <div className='flex flex-1 flex-col bg-white p-4 h-full'>   
            <H1>Middle</H1>
            <P2>Middle</P2>
        </div>
    );
}

const Right = () => {
    return (
        <div className='flex flex-1 flex-col bg-white p-4 h-full'>
            <H1>Right</H1>
            <P2>Right</P2>
        </div>
    );
}

