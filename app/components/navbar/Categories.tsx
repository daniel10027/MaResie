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
        label : 'Beach', 
        icon: TbBeach,
        description : "This property is close to the beach !"
    },
    {
        label : 'Windmills',
        icon: GiWindmill,
        description : "This property is close to the Windmills !"
    },
    {
        label : 'Modern',
        icon: MdOutlineVilla,
        description : "This property is Modern !"
    },
    {
        label : 'Countryside',
        icon: TbMountain,
        description : "This property is in the countrySide !"
    }
    ,
    {
        label : 'Pools',
        icon: TbPool,
        description : "This property has a pool !"
    },
    {
        label : 'Islands',
        icon:  GiIsland,
        description : "This property is on Island !"
    },
    {
        label : 'Lake',
        icon:  GiBoatFishing,
        description : "This property is close to a Lake !"
    },
    {
        label : 'Skiing',
        icon:  FaSkiing,
        description : "This property has Skiing activities !"
    },
    {
        label : 'Castles',
        icon:  GiCastle,
        description : "This property is in a castle !"
    },
    {
        label : 'Camping',
        icon:  GiForestCamp,
        description : "This property has camping activities !"
    },
    {
        label : 'Artic',
        icon:  BsSnow  ,
        description : "This property has ARTIC activities !"
    },
    {
        label : 'Cave',
        icon:  GiCaveEntrance  ,
        description : "This property has cave activities !"
    },
    {
        label : 'Desert',
        icon:  GiCactus  ,
        description : "This property has desert activities !"
    },
    {
        label : 'Barns',
        icon:  GiBarn  ,
        description : "This property is in the Barn  !"
    },
    {
        label : 'Lux',
        icon:  IoDiamond  ,
        description : "This property is Luxurious !"
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