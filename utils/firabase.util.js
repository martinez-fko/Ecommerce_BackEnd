const { initializeApp } = require('firebase/app');
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require('firebase/storage');

//Model
const { ProductImg } = require('../models/productImg.model');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

// Storage service
const storage = getStorage(firebaseApp);

const uploadProductsImgs = async (imgs, productId) => {
  // Map async -> Async operations with arrays
  await Promise.all(
    imgs.map(async (img) => {
      // Create firebase reference
      const [originalName, ext] = img.originalname.split('.'); // -> [pug, jpg]

      const filename = `${
        process.env.NODE_ENV
      }/products/${productId}/${originalName}-${Date.now()}.${ext}`;
      const imgRef = ref(storage, filename);

      // Upload image to Firebase
      const result = await uploadBytes(imgRef, img.buffer);

      await ProductImg.create({
        productId,
        imgUrl: result.metadata.fullPath,
      });
    })
  );
};

const getProductsImgsUrls = async (product) => {
  const productsWithImgsPromises = product.map(async (product) => {
    // Get imgs URLs
    const productImgsPromises = product.productImgs.map(async (productImg) => {
      const imgRef = ref(storage, productImg.imgUrl);
      const imgUrl = await getDownloadURL(imgRef);

      productImg.imgUrl = imgUrl;
      return productImg;
    });

    // Resolve imgs urls
    const productImgs = await Promise.all(productImgsPromises);

    product.productImgs = productImgs;
    return product;
  });

  return await Promise.all(productsWithImgsPromises);
};

module.exports = { uploadProductsImgs, getProductsImgsUrls };
