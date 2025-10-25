// import express from 'express';
// import {initializeApp, cert} from 'firebase-admin/app';
// import {getFirestore} from 'firebase-admin/firestore';
// import {getStorage} from 'firebase-admin/storage';
// import serviceAccount from '../vinhbidien-a7303-firebase-adminsdk-1bi56-a31877d92b.json' with { type: 'json' } ;


// initializeApp({
// 	credential: cert(serviceAccount)
// });
// const db = getFirestore();

// const router = express.Router();

// // --- API Route for Reading (GET) ---
// router.get('/', async (req, res) => {
//   try {	
// 		const Aitems = await db.collection('ImageData').orderBy('timestamp', 'desc');
// 		Aitems.onSnapshot((snapshot) => {
// 			const Resitems = [];
// 			snapshot.forEach((doc) => {
// 				const face_img = doc.data().URLImage;
				
// 				console.log('Fetched image URL:', face_img);
// 				Resitems.push(face_img);
// 			});
// 		});	
		
// 		console.log('Connected to Firestore database');
// 	} catch (error) {
// 		console.error('Error connecting to Firestore database:', error);
// 		process.exit(1);
// 	}
// });

// // --- API Route for Adding (POST) ---
// router.post('/', async (req, res) => {
//   res.status(201).json({ message: 'Data received successfully' });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
// });



// export default router;