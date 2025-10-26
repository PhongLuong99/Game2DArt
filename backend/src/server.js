import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import {initializeApp, cert} from 'firebase-admin/app';
import {getFirestore, Timestamp, FieldValue} from 'firebase-admin/firestore';
import {getStorage, getDownloadURL} from 'firebase-admin/storage';
import serviceAccount from '../vinhbidien-a7303-firebase-adminsdk-1bi56-01a2eaaa4b.json' with { type: 'json' } ;
import path from 'path';

const app = express();
const server = http.createServer(app);
const __dirname = path.resolve();

app.use(express.json());

app.use(cors());
const io = new Server(server, {
  cors: {
	origin: 'http://localhost:5173'
  }
});

app.use(express.static(path.join(__dirname, "../frontend/dist")))
app.get(["/","/control" ], (req, res ) => {
	res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
})


// 🔥 Firebase Admin init
initializeApp({
	credential: cert(serviceAccount),
	storageBucket: 'vinhbidien-a7303.appspot.com'
});
const db = getFirestore();
const bucket = getStorage().bucket();

// ⚡ Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('sendDataToServer', async (data) => {
	console.log('Data received from client:');
	// Xử lý dữ liệu nhận được từ client tại đây
	try {
		// Đẩy dữ liệu lên Storage
		const imageBase64 = data.UrlImageFace;

		const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
		const buffer = Buffer.from(base64Data, "base64")

		const fileName = `upload/${Date.now()}.png`
		const blob = bucket.file(fileName)

		await blob.save( buffer, {
			metadata: { contentType: "image/png" },
		});

		const [url] = await blob.getSignedUrl({
			action: "read",
			expires: "03-09-2491",
		});
		
		// Đẩy dữ liệu lên Firestore
		const Aitems = await db.collection('CharacterPixel').add({
			nameOutfit: data.nameOutfit,
			nameAccessory: data.nameAccessory,
			URLImageFace: url,
			timestamp: FieldValue.serverTimestamp(),
		});
		 
		console.log("✅ Data saved to Firestore");

		io.emit("dataSaved", data);
	}catch (error) {
		console.error('Error processing data from client:', error);
	}
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});