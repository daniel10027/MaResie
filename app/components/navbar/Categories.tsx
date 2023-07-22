'use client';

import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from  'react-icons/tb';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from  'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { MdOutlineVilla } from  'react-icons/md';
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";


export const categories = [
    {
        label : 'Plage', 
        icon: TbBeach,
        description : "Cette propriété est proche de la plage !"
    },
    {
        label : 'Moulins à vent',
        icon: GiWindmill,
        description : "Cette propriété est proche des moulins à vent !"
    },
    {
        label : 'Moderne',
        icon: MdOutlineVilla,
        description : "Cette propriété est Moderne !"
    },
    {
        label : 'Campagne',
        icon: TbMountain,
        description : "Cette propriété est à la campagne !"
    }
    ,
    {
        label : 'Piscines',
        icon: TbPool,
        description : "Cette propriété a une piscine !"
    },
    {
        label : 'îles',
        icon:  GiIsland,
        description : "Cette propriété est sur  une île !"
    },
    {
        label : 'Lac',
        icon:  GiBoatFishing,
        description : "Cette propriété est proche d'un lac !"
    },
    {
        label : 'Ski',
        icon:  FaSkiing,
        description : "Cette propriété a des activités de ski !"
    },
    {
        label : 'Châteaux',
        icon:  GiCastle,
        description : "Cette propriété est dans un château !"
    },
    {
        label : 'Camping',
        icon:  GiForestCamp,
        description : "Cette propriété a des activités de camping !"
    },
    {
        label : 'Arctique',
        icon:  BsSnow  ,
        description : "Cette propriété a des activités ARTIC !"
    },
    {
        label : 'Grotte',
        icon:  GiCaveEntrance  ,
        description : "Cette propriété a des activités de grotte !"
    },
    {
        label : 'Désert',
        icon:  GiCactus  ,
        description : "Cette propriété a des activités dans le désert !"
    },
    {
        label : 'Granges',
        icon:  GiBarn  ,
        description : "Cette propriété est dans une Grange !"
    },
    {
        label : 'Lux',
        icon:  IoDiamond  ,
        description : "Cette propriété est luxueuse!"
    }
]

const Categories = ()=>{
    const params = useSearchParams();
    const categoy = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname == '/';

    if(!isMainPage){
        return null;
    }


    return (
        <div>
            <Container>
                <div className="
                pt-4 
                flex 
                flex-row 
                items-center 
                justify-between 
                overflow-x-auto
                ">
                    {
                        categories.map((item) =>(
                             <CategoryBox 
                             key={item.label}
                             label={item.label}
                             selected={ categoy == item.label} 
                             icon={item.icon}
                             />
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default Categories;