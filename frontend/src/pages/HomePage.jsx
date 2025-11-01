import Header from '@/components/Header';
import Accessory from '@/components/Accessory';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Character from '@/components/Character';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useAsyncError, useLocation } from 'react-router';
import BackGHomePage from '../assets/Background/BG_Theme.png';
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
	<div className="min-h-screen w-full  relative bg-cover bg-center bg-no-repeat"
		style={{
			backgroundImage: `url(${BackGHomePage})`
		}}	
	>
  
  {/* Your Content/Components */}
  <div className='container mx-auto pt-8 relative z-10'>
		<div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
			{/* Đầu trang */}
			<Button
					onClick={() => {
						sendData();
						alert("Nhân Vật của Bạn đã ra lò!");
					}}

					className="absolute top-2 right-[10px] w-16 h-16 bg-transparent p-0 shadow-none hover:scale-105 transition-transform duration-200"
				>
					<img src={RightArrowBtn} alt="Send" className="w-full h-full object-contain"/>
				</Button>
				{/* <Header/> */}
			{/* Hiện thị nhân vật */}
				<Character 
					accessoryImage={selectedItem}
					outfitImage={selectedOutfit}
					faceImage={capturedImage}
					hatImage={selectedCap}
				/>
				
			<div className='flex flex-col items-center justify-between mt-9 mb-0 gap-6 sm:flex-row'>
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
			{/* Cuối trang */}
			
			
		</div>
	</div>
		
</div>
	
  )
}

export default HomePage