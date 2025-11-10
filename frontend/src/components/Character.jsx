import React, {useEffect, useState} from 'react';

const Character = ({outfitImage, accessoryImage, faceImage, faceImage2, hatImage}) => {

	const [showFirst, setShowFirst] = useState(true);

	useEffect(() => {
  		const interval = setInterval(() => {
    	setShowFirst(prev => !prev);
  	}, 600); // đổi ảnh mỗi 2 giây
  return () => clearInterval(interval);
}, []);

  return (
	<div className=' relative flex flex-col justify-center items-center mb-0 h-auto w-full overflow-visible aspect-[3/4] max-h-[70vh]'>

		{/* Ảnh Mũ (nằm phía trên) */}
		{hatImage && (
		<div className="absolute flex justify-center  w-full top-[2%] sm:top-[0%] z-30">
			<img 
				src={hatImage} 
				alt="hat" 
				className='w-[50vw] sm:w-[180px] max-w-[200px] h-auto object-contain select-none pointer-events-none'
			/>
		</div>
		)}

		{/* Ảnh Kính (nằm đè lên face) */} 
		{accessoryImage && ( 
			<div className=" absolute flex justify-center w-full top-[22%] sm:top-[20%] z-20"> 
			<img 
				src={accessoryImage} 
				alt="accessory" 
				className='w-[45vw] sm:w-[160px] max-w-[180px] h-auto object-contain select-none pointer-events-none' 
				/> 
			</div> 
		)} 
		
		{/* Ảnh selfie (ở giữa, tròn) */} 
		<div className='absolute flex justify-center items-center w-full top-[28%] sm:top-[25%] z-10'>
		{faceImage &&( 
			// <div className='absolute flex justify-center w-full top-[28%] sm:top-[25%] z-10'> 
			<img 
				src={faceImage} 
				alt="captured" 
				className={`w-[38vw] sm:w-[180px] max-w-[200px] aspect-square rounded-full 
				object-cover shadow-lg select-none pointer-events-none [clip-path:ellipse(40%_49%_at_50%_50%)]
				${showFirst ? 'block' : 'hidden'}`} 
				/> 
			// </div> 
		)}
		{faceImage2 &&( 
			// <div className='absolute flex justify-center w-full top-[28%] sm:top-[25%] z-10'> 
			<img 
				src={faceImage2} 
				alt="captured2" 
				className={`w-[38vw] sm:w-[180px] max-w-[200px] aspect-square rounded-full 
				object-cover shadow-lg select-none pointer-events-none [clip-path:ellipse(40%_49%_at_50%_50%)]
				${showFirst ? 'hidden' : 'block'}`} 
				/> 
			// </div> 
		)}
			</div>
		{/* Ảnh trang phục (nằm phía dưới) */}
		{outfitImage &&(
		<div className=" absolute flex justify-center w-full bottom-[-10%] z-0">
			<img 
				src={outfitImage} 
				alt="outfit" 
				className='w-[55vw] sm:w-[240px] max-w-[260px] h-auto object-contain drop-shadow-lg select-none pointer-events-none'
			/>
		</div>
		)}

	</div>
  );
}

export default Character