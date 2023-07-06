'use client';
interface HeadingProps{
    title: string;
    subsitle?: string;
    center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
    title,
    subsitle,
    center
})=>{
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="text-2xl font-bold">
                {title}
            </div>
            <div className="font-light text-neutral-500 mt-2">
                {subsitle}
            </div>
        </div>
    )
}

export default Heading;