import Header from '@/components/Header';
import Accessory from '@/components/Accessory';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Character from '@/components/Character';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useAsyncError, useLocation } from 'react-router';
import BackGHomePage from '../assets/Background/BG_Theme.jpg';
import RightArrowBtn from '../assets/Background/RightArrow.png';


const HomePage = () => {
	// ⚡ Kết nối tới backend
	const socket = io("https://game2dart.onrender.com" ,{transports: ["websocket"]});

	const [items, setItems] = useState([]);
	const [selectedOutfitName, setSelectedOutfitName] = useState('');
	const [selectedAccessoryName, setSelectedAccessoryName] = useState('');
	const [selectedCapName, setSelectedCapName] = useState('');

	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedOutfit, setSelectedOutfit] = useState(null);
	const [selectedCap, setSelectedCap] = useState(null);

	const location = useLocation();
	const capturedImage = location.state?.capturedImage || null;

	useEffect(() => {
		
		// Nhận dữ liệu realtime
		socket.on('dataSaved', (data) => {
			setItems(data);
			console.log( data);
		});
		return () => socket.disconnect();
	}, []);

	const sendData = () => {
		console.log(selectedOutfitName, selectedAccessoryName, capturedImage);
		socket.emit('sendDataToServer', { 
			nameOutfit: selectedOutfitName, 
			nameAccessory: selectedAccessoryName, 
			UrlImageFace: capturedImage,
			nameHat: selectedCapName, 
		});
	};

  return (
	<div className="relative min-h-screen w-full bg-cover bg-center 
	bg-no-repeat overflow-hidden flex flex-col items-center justify-between px-4 sm:px-6"
		style={{
			backgroundImage: `url(${BackGHomePage})`
		}}	
	>
		{/* nút gửi */}
			<Button
					onClick={() => {
						sendData();
						alert("Chờ một chút nhé nhân vật của bạn sẽ xuất hiện ngay, Have a nice day!");
					}}

					className="absolute top-4 right-4 w-12 h-12 
					sm:w-16 sm:h-16 bg-transparent p-0 shadow-none 
					hover:scale-105 transition-transform duration-200 z-20"
				>
					<img src={RightArrowBtn} 
					alt="Send" 
					className="w-full h-full object-contain"/>
		</Button>
  
  {/* Your Content/Components */}
  <div className='flex flex-col items-center justify-center w-full max-w-[450px] mt-10 mb-6 space-y-4 text-center'>
		<div className='relative w-[80vw] max-w-[380px] aspect-[3/4] flex items-center justify-center mx-auto'>
			{/* Hiện thị nhân vật */}
				<Character 
					accessoryImage={selectedItem}
					outfitImage={selectedOutfit}
					faceImage={capturedImage}
					hatImage={selectedCap}
				/>
			</div>
			<div className='w-full flex justify-center mt-20'>
			{/* Phụ kiện */}
				<Accessory  
					setSelectedAccessory={setSelectedItem}
					setSelectedOutfit={setSelectedOutfit}	
					setSelectedHat={setSelectedCap}

					setSelectedOutfitName={setSelectedOutfitName}
					setSelectedAccessoryName={setSelectedAccessoryName}	
					setSelectedHatName={setSelectedCapName}
				/>
			</div>
			
	</div>
		
</div>
	
  )
}

export default HomePage