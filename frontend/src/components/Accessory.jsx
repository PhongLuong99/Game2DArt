import React from 'react';
import { Carousel, CarouselNext, CarouselPrevious, CarouselContent, CarouselItem } from './ui/carousel';
import { AccessoryData, OutfitData } from '@/lib/data';

const Accessory = ({setSelectedAccessory, setSelectedOutfit, setSelectedOutfitName, setSelectedAccessoryName}) => {
  return (
	<div>

	
	<div className='flex gap-4 mt-6 '>
	  <Carousel
	  	opts={{
        align: "start",
      }}
      className=""
	  >
		<CarouselContent>
		  {/* Thêm các mục phụ kiện vào đây */}
		  {AccessoryData.map((item) => (
				<CarouselItem 
					key={item.id} 
					onClick={() => [setSelectedAccessory(item.image), setSelectedAccessoryName(item.name)]}
					className="md:basis-1/2 lg:basis-1/3"
				>
				  <img src={item.image} alt={item.name} />
				</CarouselItem>
		  ))}
		  </CarouselContent>
		<CarouselPrevious/>
		<CarouselNext/>
	  </Carousel>
	  
	</div>
	<div className='flex gap-4 mt-6 '>
	  <Carousel
	  	opts={{
        align: "start",
      }}
      className=""
	  >
		<CarouselContent>
		  {/* Thêm các mục phụ kiện vào đây */}
		  {OutfitData.map((outfit) => (
				<CarouselItem 
					key={outfit.id} 
					onClick={() => [setSelectedOutfit(outfit.image), setSelectedOutfitName(outfit.name)]}
					className="md:basis-1/2 lg:basis-1/3"
				>
				  <img src={outfit.image} alt={outfit.name} />
				</CarouselItem>
		  ))}
		  </CarouselContent>
		<CarouselPrevious/>
		<CarouselNext/>
	  </Carousel>
	  
		</div>
	</div>
  )
}

export default Accessory