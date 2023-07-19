import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";

import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage =async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState 
                title="Vous n'etes pas autoris a acceder a ce espace"
                subtitle="Merci de vous connecter"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservation({
        userId : currentUser.id
    })

    if(reservations.length == 0){
        return (
            <ClientOnly>
            <EmptyState 
            title="Aucune commande !"
            subtitle="Il semble que vous n'avez aucune commade en attente."
            />
        </ClientOnly>
        )
    }

    return (
        <ClientOnly>

                <TripsClient 

                reservations={reservations}
                currentUser={currentUser}
                
                />
      
        </ClientOnly>
    )
}

export default TripsPage;