'use client';

import axios from "axios";

import { useCallback , useState } from "react";

import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";

import { SafeUser , SafeReservations } from "../types";

import Heading from "../components/Heading";

import Container from "../components/Container";

import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {

    reservations: SafeReservations[];
    currentUser?: SafeUser | null;

}

const ReservationsClient:React.FC<ReservationsClientProps> = ({

    reservations,
    currentUser

}) => {

    const router = useRouter();

    const [ deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) =>{
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success("Reservation annulee !")
            router.refresh();
        })
        .catch(() => {
            toast.error("Une Erreur est survenue !")
        })
        .finally(() =>{
            setDeletingId('');
        })
    }, [router])

    return (
       <Container>
        <Heading 
        title="Reservations"
        subsitle="Reservations sur votre Propriete"
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
                {  reservations.map((reservation) => (
                    <ListingCard 
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId == reservation.id}
                    actionLabel="Annuler la reservation du Client "
                    currentUser={currentUser}

                    />
                )) }
        </div>

       </Container>
    )
}

export default ReservationsClient;