import Header from '@/components/Header';
import Accessory from '@/components/Accessory';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Character from '@/components/Character';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router';


const HomePage = () => {
	// ⚡ Kết nối tới backend
	const socket = io('http://localhost:5001');

	const [items, setItems] = useState([]);
	const [selectedOutfitName, setSelectedOutfitName] = useState('');
	const [selectedAccessoryName, setSelectedAccessoryName] = useState('');
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedOutfit, setSelectedOutfit] = useState(null);
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
		socket.emit('sendDataToServer', { nameOutfit: selectedOutfitName, nameAccessory: selectedAccessoryName, UrlImageFace: capturedImage });
	};

  return (
	<div className="min-h-screen w-full bg-[#f0fdfa] relative">
  {/* Mint Fresh Breeze Background */}
  
  {/* Your Content/Components */}
  <div className='container mx-auto pt-8 relative z-10'>
		<div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
			{/* Đầu trang */}
				<Header/>
			{/* Hiện thị nhân vật */}
				<Character 
					accessoryImage={selectedItem}
					outfitImage={selectedOutfit}
					faceImage={capturedImage}
				/>
				
			<div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
			{/* Phụ kiện */}
				<Accessory  
					setSelectedAccessory={setSelectedItem}
					setSelectedOutfit={setSelectedOutfit}
					setSelectedOutfitName={setSelectedOutfitName}
					setSelectedAccessoryName={setSelectedAccessoryName}
				/>
			</div>
			{/* Cuối trang */}
			<Button
					onClick={() => {
						sendData();
						alert("Bạn vừa click vào nút!");
					}}

					className="w-65 h-12 "
				>
					<ArrowRight className="h-5 w-5 text-white"/>
				</Button>
			
		</div>
	</div>
		<div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(45deg, 
          rgba(240,253,250,1) 0%, 
          rgba(204,251,241,0.7) 30%, 
          rgba(153,246,228,0.5) 60%, 
          rgba(94,234,212,0.4) 100%
        ),
        radial-gradient(circle at 40% 30%, rgba(255,255,255,0.8) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(167,243,208,0.5) 0%, transparent 50%),
        radial-gradient(circle at 20% 80%, rgba(209,250,229,0.6) 0%, transparent 45%)
      `,
    }}
  />
</div>
	
  )
}

export default HomePage