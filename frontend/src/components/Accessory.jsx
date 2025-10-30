import React from 'react';
import { Carousel, CarouselNext, CarouselPrevious, CarouselContent, CarouselItem } from './ui/carousel';
import { AccessoryData, OutfitData,HatData } from '@/lib/data';

const Accessory = ({setSelectedAccessory, setSelectedOutfit, setSelectedHat , setSelectedOutfitName, setSelectedAccessoryName, setSelectedHatName}) => {
  return (
	<div >

{/* Thêm các mục Glasses vào đây */}
	<div className=' flex gap-4  '>
	  <Carousel
	  	opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
	  >
		<CarouselContent >
		  {AccessoryData.map((item) => (
				<CarouselItem 
					key={item.id} 
					onClick={() => [setSelectedAccessory(item.image), setSelectedAccessoryName(item.name)]}
					className="md:basis-1/3 basis-1/3"
				>
				  <img 
				  	src={item.image} 
				  	alt={item.name} 
					className=' w-full h-26 object-contain rounded-md select-none pointer-events-none'
					/>
				</CarouselItem>
		  ))}
		  </CarouselContent>
		<CarouselPrevious/>
		<CarouselNext/>
	  </Carousel>
	</div>

{/* Thêm các mục Hat vào đây */}
	<div className='flex gap-4  '>
	  <Carousel
	  	opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
	  >
		<CarouselContent>
		  {HatData.map((hat) => (
				<CarouselItem 
					key={hat.id} 
					onClick={() => [setSelectedHat(hat.image), setSelectedHatName(hat.name)]}
					className="md:basis-1/3 basis-1/3"
				>
				  <img 
				  	src={hat.image} 
				  	alt={hat.name} 
					className=' w-full h-25 object-contain rounded-md select-none pointer-events-none'
					/>
				</CarouselItem>
		  ))}
		  </CarouselContent>
		<CarouselPrevious/>
		<CarouselNext/>
	  </Carousel>
	</div>

{/* Thêm các mục Outfit vào đây */}
	<div className='flex gap-4 mt-6 '>
	  <Carousel
	  	opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
	  >
		<CarouselContent>
		  {/* Thêm các mục outfit vào đây */}
		  {OutfitData.map((outfit) => (
				<CarouselItem 
					key={outfit.id} 
					onClick={() => [setSelectedOutfit(outfit.image), setSelectedOutfitName(outfit.name)]}
					className="md:basis-1/3 basis-1/3"
				>
				  <img 
				  	src={outfit.image} 
					alt={outfit.name} 
					className= 'w-full h-25 object-contain rounded-md select-none pointer-events-none'
					/>
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