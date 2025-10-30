import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Control = () => {

	const videoRef = useRef(null);
	const canvasRef = useRef(null);

	const [capturedImage, setCapturedImage] = useState(null);
	const [isReady, setIsReady] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const StartCamera = () => {
		navigator.mediaDevices.getUserMedia({
			video: { facingMode: "user" }
		}).then(stream => {
			const video = videoRef.current;
			video.srcObject = stream;
			video.play();
	}).catch(err => {
		console.error("Error accessing camera: ", err);
	});
	}

	useEffect(() => {
		StartCamera();
	}, [videoRef]);

	const  handleVideoReady = () => {
		setIsReady(true);
	};

	// Chụp ảnh từ video
	const handleCapture = () => {
		if (loading) return;

    	setLoading(true);

		
		const video = videoRef.current;
		const canvas = canvasRef.current;

		if (!video || !canvas) return;

		if(!isReady || video.videoWidth === 0 || video.videoHeight === 0) {
			console.warn("Camera chưa sẵn sàng hoặc không có dữ liệu video.");
			return;
		}

		const size = 400; // kích thước khung tròn (px)
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext('2d');

		// Tạo vùng tròn
		ctx.beginPath();
		const radiusX = size / 2.5;
		const radiusY = size / 2;
		ctx.ellipse(size / 2, size / 2, radiusX, radiusY, 0, 0, Math.PI * 2);
		ctx.closePath();
		ctx.clip();

		// Vẽ frame video vào canvas (crop)
		const vw = video.videoWidth;
		const vh = video.videoHeight;
		
		const minSide = Math.min(vw, vh);
   	 	const sx = (vw - minSide) / 2;
    	const sy = (vh - minSide) / 2;

		// Vẽ video vào canvas
		ctx.drawImage(video, sx, sy, minSide, minSide, 0, 0, size, size);

		const dataURL = canvas.toDataURL('image/png');

		 // Simulate a slight delay for processing
		setTimeout(() => {
			setCapturedImage(dataURL);
			setLoading(false);
		},500);
		

	};

	const handleReset = () => {
		setCapturedImage(null);
	}

	const goToHomePage = () => {
		navigate('/', { state: { capturedImage }});
		console.log("hello")
	};

	const CaptureButton = ({imageI, isLoading, onCapture, onReset }) =>{
		// If an image exists, show the preview and make it clickable to reset
		if(imageI) {
			return (
				<div
					onClick={onReset}
					className='w-35 h-35 rounded-xl border-4
					 border-white shadow-xl overflow-hidden 
					 cursor-pointer ring-4 ring-cyan-500 
					 transition duration-300 hover:ring-8 active:scale-95'
					 aria-label="Ảnh đã chụp, nhấn để xóa"
				>
					<img 
						src={imageI}
						alt="Captured Preview" 
						className="w-full h-full object-cover transition duration-300 transform hover:scale-105"
					/>
				</div>
			)
		}

		// If no image, show the TAKE button

		return(
			<button
				onClick={onCapture}
				disabled={isLoading}
				className={`w-35 h-35 rounded-xl shadow-xl border-4 border-white transition-all duration-300 
          		flex flex-col items-center justify-center 
          		${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-600 active:scale-95'}`}
			>
				<div className="text-white text-4xl leading-none">
					{isLoading ? (
						<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  			<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  			<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                		</svg>
					): '📸'}
				</div>
					<span className="text-white text-sm font-bold mt-1 tracking-widest">
            			{isLoading ? 'CHỤP...' : 'TAKE'}
        			</span>
			</button>
		)
	};

	// --- MAIN RENDER ---
  return (
	
	<div className="relative bg-green-200 flex flex-col items-center justify-center h-screen  font-sans p-4">
		<Button
					onClick={goToHomePage}
					className=" absolute top-1 z-10 w-65 h-12 p-6"
				>
						<ArrowRight className="h-5 w-5 text-white"/>
				</Button>
		
		<div className=" w-full h-105 max-w-lg mt-[-250px] bg-black shadow-2xl rounded-full overflow-hidden flex items-center justify-center">
			<video ref={videoRef} className="absolute w-full h-full object-cover -scale-x-100"></video>
			
			 {/* Khung tròn crop */}
      <div className="relative w-[400px] h-[400px]  
	  overflow-hidden [clip-path:ellipse(40%_49%_at_50%_50%)] 
	  shadow-[0_0_20px_rgba(0,0,0,0.6)] border-4 border-white bg-black">
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          onLoadedMetadata={handleVideoReady}
          className="absolute top-0 left-0 w-full h-full object-cover -scale-x-100"
        />
      </div>
		</div>
		
	   {/* Nút chụp */}
      {/* <button
        onClick={handleCapture}
        className="absolute bottom-10 bg-cyan-500 text-white text-xl font-semibold rounded-full w-20 h-20 shadow-lg active:scale-95 transition-transform"
      >
        📷
      </button> */}
	  <div className='absolute bottom-45 left-1/2 transform -translate-x-1/2 z-30'>
			<CaptureButton
				imageI={capturedImage}
				onCapture={handleCapture}
				onReset={handleReset}
				isLoading={loading}
			>
			</CaptureButton>
	  </div>
	  {/* Canvas ẩn */}
	  
 			<canvas ref={canvasRef} className="hidden" />
		{/* Instructions */}
      <p className=" p-5 absolute bottom-20 text-gray-600 text-center max-w-lg z-20">
        <span className="font-semibold text-cyan-600">Trạng thái:</span>{" "}
        {capturedImage ? 'Ảnh đã chụp và đang hiển thị trên nút. Nhấn vào ảnh để chụp lại.' : 'Sẵn sàng chụp. Nhấn "TAKE".'}
      </p>
</div>
  )
}

export default Control





{/* Preview ảnh
      		{capturedImage && (
        		<div className="absolute top-5 right-5 text-center text-white">
          		<p className="mb-1 text-sm">Ảnh đã chụp:</p>
          		<img
            		src={capturedImage}
            		alt="captured"
            		className="w-28 h-28 rounded-full  object-cover"
          		/>
        </div>
      )}		 */}