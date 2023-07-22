'use client';

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";


enum STEPS {

    LOCATION = 0,
    DATE = 1,
    INFO = 2

}

const SearchModal = () =>{
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();


    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathRoomCount] = useState(1);
    const [dateRange, setdateRange] = useState<Range>({
        startDate: new Date,
        endDate: new Date,
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), []);

    const onBack = useCallback(() => {
        setStep((value) => value - 1)
    },[])

    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    },[])

    const onSubmit = useCallback(async () => {
        if(step != STEPS.INFO){
            return onNext();
        }

        let currentQUery =  {};
        if(params){
            currentQUery = qs.parse(params.toString());
        }
        const updatedQuery : any = {
            ...currentQUery,
            locationValue : location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if(dateRange.startDate){
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }

        if(dateRange.endDate){
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url : '/',
            query: updatedQuery,
        }, { skipNull : true })

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    },[
        step, 
        searchModal,
        location,
        router,
        bathroomCount, 
        roomCount,
        guestCount, 
        dateRange,
        onNext, 
        params
    ]);

    const actionLabel = useMemo(() => {
        if(step == STEPS.INFO){
            return 'Lancer la recherche';
        }
        return 'Suivant'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step == STEPS.LOCATION){
            return undefined;
        }
        return 'Precedent'
    }, [step]);


    let bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
          title="Ou souhaitez vous allez ?"
          subsitle="Trouver l'endroit parfait !"
          
          />
          <CountrySelect 
          value={location}
          onChange={(value) => setLocation(value as CountrySelectValue)}
          />
          <hr />
          <Map  center={location?.latlng} />
        </div>
    )

    if ( step == STEPS.DATE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title="Quand souhaitez vous partir ?"
                subsitle="Rassurer vous que tout le monde est libre !"
                />
                <Calendar 
                value={dateRange}
                onChange={(value) => setdateRange(value.selection)}
                />
            </div>
        )
    }

    if ( step == STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title="Plus d'informations"
                subsitle="Trouvez la place ideale !"
                />
                <Counter 
                title="Invites"
                subtitle="Combien de personne sont attendues ? "
                value={guestCount}
                onChange={(value) => setGuestCount(value)}
                />
                <Counter 
                title="Chambre(s)"
                subtitle="Combien de chambres voulez vous ? "
                value={roomCount}
                onChange={(value) => setRoomCount(value)}
                />
                <Counter 
                title="Salle(s) de bain "
                subtitle="Combien de Salle(s) de bain voulez vous  ? "
                value={bathroomCount}
                onChange={(value) => setBathRoomCount(value)}
                />
            </div>
        )
    }


    return (
        <Modal
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title="Filtrage de donnees"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step == STEPS.LOCATION ? undefined : onBack}
        body={bodyContent}
        />
    )
}

export default SearchModal;