import {
	kinhxanh, 
	kinhdo, 
	kinhden, 
	kinhtym, 
	kinhtim, 
	kinhtimxanh, 
	kinhxanhdo, 
	kinhxanhla, 
	kinhdotrang, 
	kinhtronvang, 
	khanbao, 
	khanxam, 
	khanxanh, 
	khanvang, 
	khando, 
	mulinhcam, 
	mulinhdo,
	ArtboardBlue,	 
	ArtboardPink 
} from "@/assets/DataCloth";

const AccessoryData = [
  {
	id: 1,
	name: 'G1',
	image: kinhxanh
  },
  {
	id: 2,
	name: 'G2',
	image: kinhdo
  },
  {
	id: 3,
	name: 'G3',
	image: kinhden
  },
  {
	id: 4,
	name: 'G4',
	image: kinhtym
  },
  {
	id: 5,	
	name: 'G5',
	image: kinhtim
  },
  {
	id: 6,		
	name: 'G6',
	image: kinhtimxanh
  },
  {
	id: 7,
	name: 'G7',
	image: kinhxanhdo
  },
  {
	id: 8,
	name: 'G8',
	image: kinhxanhla
  },
  {
	id: 9,
	name: 'G9',
	image: kinhdotrang	
  },
  {
	id: 10,
	name: 'G10',
	image: kinhtronvang
  },
  {
	id: 11,
	name: 'K1',
	image: khanxanh
  },
  {
	id: 12,
	name: 'K2',
	image: khanvang
  },
  
];

const HatData = [
	{
	id: 1,
	name: 'S1',
	image: khanbao
  },
  {
	id: 2,
	name: 'S2',
	image: khanxam
  },
//   {
// 	id: 3,
// 	name: 'S3',
// 	image: khanxanh
//   },
//   {
// 	id: 4,
// 	name: 'S3',
// 	image: khanvang
//   },
  {
	id: 3,
	name: 'S3',
	image: khando
  },
  {
	id: 4,
	name: 'H1',
	image: mulinhcam
  },
  {
	id: 5,
	name: 'H2',
	image: mulinhdo
  }
];

const OutfitData = [
	{
		id: 1,
		name: 'OB',
		image: ArtboardBlue
	},
	{
		id: 2,
		name: 'OP',
		image: ArtboardPink
	}
];

export { AccessoryData, OutfitData, HatData };
