import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import getReservation from "../actions/getReservation";

import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";


const PropertiesPage =async () => {
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

    const listings = await getListings({
        userId : currentUser.id
    })

    if(listings.length == 0){
        return (
            <ClientOnly>
            <EmptyState 
            title="Aucune propriete !"
            subtitle="Il semble que vous n'avez aucune propriete enregistree."
            />
        </ClientOnly>
        )
    }

    return (
        <ClientOnly>

                <PropertiesClient 

                listings={listings}
                currentUser={currentUser}
                
                />
      
        </ClientOnly>
    )
}

export default PropertiesPage;