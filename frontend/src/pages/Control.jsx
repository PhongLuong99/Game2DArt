import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Control = () => {
	const videoRef = useRef(null);
	const canvasRef = useRef(null);

	const [capturedImage, setCapturedImage] = useState(null);
	const [isReady, setIsReady] = useState(false);
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
		setCapturedImage(dataURL);

	};

	const goToHomePage = () => {
		navigate('/', { state: { capturedImage }});
	};

  return (
	<div className="relative w-screen h-screen overflow-hidden bg-green-200 flex flex-col items-center justify-center">
	
			<video ref={videoRef} className="absolute w-full h-full object-cover -scale-x-100"></video>
			<div className="absolute top-5 text-white text-lg font-semibold drop-shadow-lg">
				<Button
					onClick={goToHomePage}
					className="w-65 h-12 p-6"
				>
						<ArrowRight className="h-5 w-5 text-white"/>
				</Button>
        		📸 Giữ khuôn mặt bạn trong vòng tròn
      		</div>
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
	   {/* Nút chụp */}
      <button
        onClick={handleCapture}
        className="absolute bottom-10 bg-cyan-500 text-white text-xl font-semibold rounded-full w-20 h-20 shadow-lg active:scale-95 transition-transform"
      >
        📷
      </button>
	  {/* Canvas ẩn */}
	  <div>
 			<canvas ref={canvasRef} className="" />

      		{/* Preview ảnh */}
      		{capturedImage && (
        		<div className="absolute top-5 right-5 text-center text-white">
          		<p className="mb-1 text-sm">Ảnh đã chụp:</p>
          		<img
            		src={capturedImage}
            		alt="captured"
            		className="w-28 h-28 rounded-full  object-cover"
          		/>
        </div>
      )}		
	  </div>  			
</div>
  )
}

export default Control