import EmptyState from "../components/EmptyState";

import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState 
                    title="Non autorise"
                    subtitle="Merci de vous connecter"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservation({
            authorId: currentUser.id
    });

    if(reservations.length == 0){
        return (
            <ClientOnly>
                <EmptyState 
                title="Aucune reservation trouvee"
                subtitle="Il semblerait que vous n'avez aucune reservation sur votre propriete !"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationsClient 
            reservations={reservations}
            currentUser={currentUser}
            />
        </ClientOnly>
    )
};

export default ReservationsPage;