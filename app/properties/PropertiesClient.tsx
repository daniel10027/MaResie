'use client';

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservations, SafeUser, safeListings } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps{
    listings: safeListings[];
    currentUser: SafeUser | null;
}

const PropertiesClient:React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success("Propriete Supprimee");
            router.refresh();
        })
       .catch((error) => {
        toast.error(error?.response?.data?.error);
       })

       .finally(() => {
        setDeletingId('');
       })

    }, [router]);
    
    return(

        <div>
            <Container>

                <Heading
                title="Proprietes"
                subsitle="Liste de vos Proprietes"
                />

                <div className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
                ">

                    { listings.map((listing) => (
                        <ListingCard 
                            key={listing.id}
                            data={listing}
                            actionId={listing.id}
                            onAction={onCancel}
                            disabled={ deletingId == listing.id }
                            actionLabel="Supprimer la Propriete"
                            currentUser={currentUser}
                        />
                    ))}

                </div>

            </Container>
        </div>
    )
}
export default PropertiesClient;