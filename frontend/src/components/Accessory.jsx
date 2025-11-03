import React from 'react';
import { Carousel, CarouselNext, CarouselPrevious, CarouselContent, CarouselItem } from './ui/carousel';
import { AccessoryData, OutfitData,HatData } from '@/lib/data';

const Accessory = ({setSelectedAccessory, setSelectedOutfit, setSelectedHat , setSelectedOutfitName, setSelectedAccessoryName, setSelectedHatName}) => {
  return (
	<div className="flex flex-col items-center justify-center w-full space-y-6 px-3 sm:px-4 md:px-6">

{/* Thêm các mục Glasses vào đây */}
	<div className='w-full flex flex-col items-center mb-0 '>
	  <Carousel
	  	opts={{
        align: "start",
      }}
      className="w-full max-w-[95vw] sm:max-w-sm"
	  >
		<CarouselContent className="flex -ml-2">
		  {AccessoryData.map((item) => (
				<CarouselItem 
					key={item.id} 
					onClick={() => [setSelectedAccessory(item.image), setSelectedAccessoryName(item.name)]}
					className="pl-3 basis-1/3 sm:basis-1/4"
				>
				  <img 
				  	src={item.image} 
				  	alt={item.name} 
					className=' w-full h-20 sm:h-28 object-contain rounded-md select-none pointer-events-none'
					/>
				</CarouselItem>
		  ))}
		  </CarouselContent>
		<CarouselPrevious className="left-0 -translate-x-4 sm:-translate-x-6 bg-transparent border-none" />
		<CarouselNext className="right-0 translate-x-4 sm:translate-x-6 bg-transparent border-none"/>
	  </Carousel>
	</div>

{/* Thêm các mục Hat vào đây */}
	<div className='w-full flex flex-col items-center mb-5'>
	  <Carousel
	  	opts={{
        align: "start",
      }}
      className="w-full max-w-[95vw] sm:max-w-sm"
	  >
		<CarouselContent className="flex -ml-2">
		  {HatData.map((hat) => (
				<CarouselItem 
					key={hat.id} 
					onClick={() => [setSelectedHat(hat.image), setSelectedHatName(hat.name)]}
					className="pl-2 basis-1/3 sm:basis-1/4"
				>
				  <img 
				  	src={hat.image} 
				  	alt={hat.name} 
					className=' w-full h-24 sm:h-28 object-contain rounded-md select-none pointer-events-none'
					/>
				</CarouselItem>
		  ))}
		  </CarouselContent>
		<CarouselPrevious className="left-0 -translate-x-4 sm:-translate-x-6 bg-transparent border-none"/>
		<CarouselNext  className="right-0 translate-x-4 sm:translate-x-6 bg-transparent border-none"/>
	  </Carousel>
	</div>

{/* Thêm các mục Outfit vào đây */}
	<div className='w-full flex flex-col items-center'>
	  <Carousel
	  	opts={{
        align: "start",
      }}
      className="w-full max-w-[95vw] sm:max-w-sm"
	  >
		<CarouselContent className="flex -ml-2">
		  {/* Thêm các mục outfit vào đây */}
		  {OutfitData.map((outfit) => (
				<CarouselItem 
					key={outfit.id} 
					onClick={() => [setSelectedOutfit(outfit.image), setSelectedOutfitName(outfit.name)]}
					className="pl-2 basis-1/2 sm:basis-1/3"
				>
				  <img 
				  	src={outfit.image} 
					alt={outfit.name} 
					className= 'w-full h-24 sm:h-28 object-contain rounded-md select-none pointer-events-none'
					/>
				</CarouselItem>
		  ))}
		  </CarouselContent>
		<CarouselPrevious className="left-0 -translate-x-4 sm:-translate-x-6 bg-transparent border-none"/>
		<CarouselNext className="right-0 translate-x-4 sm:translate-x-6 bg-transparent border-none"/>
	  </Carousel>
	  
		</div>
	</div>
  )
}

export default Accessory