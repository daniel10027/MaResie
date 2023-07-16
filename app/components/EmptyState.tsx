'use client';

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?: boolean;

}


const EmptyState: React.FC<EmptyState> = (
    {
        title = "Aucune correspondance",
        subtitle = "Essayez de retirer ou supprimer certains des elemets de recherche",
        showReset
    }

) =>{
    const router = useRouter();
    return (
        
        <div 
        className="
        h-[60vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
        "
        >
        <Heading
        center
        title={title}
        subsitle ={subtitle}
        />

<div className="w-48 mt-4">
            {
                showReset && (
                    <Button 
                    outline
                    label="Supprimer les filtres"
                    onClick={
                        () => router.push('/')
                    }
                    
                    />
                )
            }
        </div>

        </div>
       
    )
    }

export default EmptyState;