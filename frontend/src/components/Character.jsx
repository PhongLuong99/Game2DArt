import React from 'react';

const Character = ({outfitImage, accessoryImage, faceImage}) => {

  return (
	<div className='flex flex-col justify-center items-center h-[80vh] relative'>

		{/* Ảnh trang sức (nằm phía trên) */}
		{accessoryImage && (
		<div className="flex justify-center mb-[-50px] z-10">
			<img 
				src={accessoryImage} 
				alt="accessory" 
				className='w-40 h-auto object-contain select-none pointer-events-none'
			/>
		</div>
		)}
		{/* Ảnh selfie (ở giữa, tròn) */}
		{faceImage &&(
			<div className='flex justify-center'>
				<img 
					src={faceImage} 
					alt="captured"
					className='w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg select-none pointer-events-none [clip-path:ellipse(40%_49%_at_50%_50%)]'
				/>
			</div>
		)}
		{/* Ảnh trang phục (nằm phía dưới) */}
		{outfitImage &&(
		<div className="flex justify-center">
			<img 
				src={outfitImage} 
				alt="outfit" 
				className='w-64 h-auto object-contain drop-shadow-lg select-none pointer-events-none'
			/>
		</div>
		)}
	</div>
  );
}

export default Character