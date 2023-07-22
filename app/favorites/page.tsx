import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";

import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {

    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if(listings.len == 0){
        return (
            <ClientOnly>
                <EmptyState 
                title="Aucun Favoris trouve"
                subtitle="Il semble qu'aucun ele;emt n'ait ete ajoute a votre liste de favoris"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly >

                <FavoritesClient 
                    listings={listings}
                    currentUser={currentUser}
                />

        </ClientOnly>
    )
    
}

export default ListingPage;