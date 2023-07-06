'use client';
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import userRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";

import dynamic from "next/dynamic";
import Input from "../inputs/input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {

    const router = useRouter();

    const rentModal = userRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);

    const [isLoading, setisLoading] = useState(false);


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {

        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        if(step != STEPS.PRICE){
            return onNext();
        }

        setisLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success("Element ajouté avec succès !")
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(() => {
            toast.error("Une erreur est survenue.");
        }).finally(() => {
            setisLoading(false);
        })
    }

    const actionLabel = useMemo(() => {
        if (step == STEPS.PRICE) {
            return 'Création'
        }
        return 'Suivant';

    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step == STEPS.CATEGORY) {
            return undefined;
        }
        return 'Précedent';
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Lequel de ces élément décris le mieux votre espace ?"
                subsitle="Selectionnez une catégorie"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => { setCustomValue('category', category) }}
                            selected={category == item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step == STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">

                <Heading
                    title="Ou se situe votre emplacement ? "
                    subsitle="Aidez les invités à vous trouver"
                />

                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />

                <Map center={location ?.latlng} />
            </div>

        )
    }

    if (step == STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Partagez quelques informations de base sur votre logement"
                    subsitle="Quelles commodités avez-vous ?"
                />
                <Counter
                    title="Invités"
                    subtitle="Combien d'invités autorisez vous ?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Chambres"
                    subtitle="Combien de chambre avez vous ?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Salles de bain"
                    subtitle="Combien de Salle de bain avez vous ?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />

            </div>
        )
    }


    if (step == STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Ajouter une Photo de votre espace"
                    subsitle="Montrez aux invités à quoi resemble votre espace !"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if (step == STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Comment décririez-vous votre espace ?"
                    subsitle="Mot court et doux meilleur !"
                />
                <Input
                    id="title"
                    label="Titre"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

            </div>
        )
    }

    if (step == STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                 
                    title="Maintenant, fixez votre prix"
                    subsitle="Combien facturez-vous la nuit ?"
                />
                <Input
                    id="price"
                    label="Le Prix"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

            </div>
        )
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
            onSubmit={handleSubmit(onSubmit)}
            title="MaResier votre Maison !"
            body={bodyContent}
        />
    )
}

export default RentModal;