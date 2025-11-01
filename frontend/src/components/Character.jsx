import React from 'react';

const Character = ({outfitImage, accessoryImage, faceImage, hatImage}) => {

  return (
	<div className=' relative flex flex-col justify-center items-center mb-0 mt-[-30px] h-[54vh] w-full overflow-hidden'>

		{/* Ảnh Mũ (nằm phía trên) */}
		{hatImage && (
		<div className="absolute flex justify-center  z-30 top-[-1%]">
			<img 
				src={hatImage} 
				alt="hat" 
				className=' w-48 h-auto  object-contain  select-none pointer-events-none'
			/>
		</div>
		)}

		{/* Ảnh Kính (nằm đè lên face) */} 
		{accessoryImage && ( 
			<div className=" absolute flex justify-center z-20 top-[12%]"> 
			<img 
				src={accessoryImage} 
				alt="accessory" 
				className='w-50 h-auto object-contain select-none pointer-events-none' 
				/> 
			</div> 
		)} 
		
		{/* Ảnh selfie (ở giữa, tròn) */} 
		{faceImage &&( 
			<div className='absolute top-[21%] z-10 flex justify-center'> 
			<img 
				src={faceImage} 
				alt="captured" 
				className='w-37 h-37 rounded-full object-cover shadow-lg select-none pointer-events-none [clip-path:ellipse(40%_49%_at_50%_50%)]' 
				/> 
			</div> 
		)}

		{/* Ảnh trang phục (nằm phía dưới) */}
		{outfitImage &&(
		<div className=" absolute z-0 bottom-[-0%] flex justify-center">
			<img 
				src={outfitImage} 
				alt="outfit" 
				className='w-65 h-auto object-contain drop-shadow-lg select-none pointer-events-none'
			/>
		</div>
		)}

	</div>
  );
}

export default Character