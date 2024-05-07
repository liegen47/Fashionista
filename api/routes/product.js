const router = require("express").Router();
const { celebrate } = require("celebrate");
const multer = require("multer");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/Product.model");
const { product: productSchema } = require("../models/schema");
const {
  verifyToken,
  verifyAuthorization,
  verifyAdminAccess,
} = require("../middlewares/verifyAuth");
const fs = require("fs");
const axios = require("axios");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/images`);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

// Get all products - any user
router.get("/", celebrate({ query: productSchema.query }), async (req, res) => {
  const query = req.query;
  try {
    let products;
    if (query.new) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (query.category) {
      products = await Product.find({
        categories: { $in: [query.category] },
      });
    } else {
      products = await Product.find();
    }
    return res.json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json(productResponse.unexpectedError);
  }
});

// Add a new product - admin only
router.post(
  "/",
  verifyAdminAccess,
  celebrate({ body: productSchema.new }),
  async (req, res) => {
    try {
      const product_image = req.body.image;
      await Product.create(req.body);

      // Extracting image filename from URL
      const filename = product_image.split("/").pop();
      // Constructing the correct path to the image
      const new_product_image = `D:\\workspace\\DESIGN PROJECT\\Major project\\Fashion-Store\\public\\images\\${filename}`;

      console.log(new_product_image);

      var bitmap = fs.readFileSync(new_product_image);
      var base_64_img = bitmap.toString("base64");
      var config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      const flask_response = await axios
        .post(
          "http://0.0.0.0:5001/save_img/",
          { name: filename, image: base_64_img },
          config
        )
        .then(function (response) {})
        .catch(function (error) {});
      console.log("Response from Flask server:", flask_response);
      return res.json(productResponse.productAdded);
    } catch (err) {
      console.log(err);
      return res.status(500).json(productResponse.unexpectedErrorS);
    }
  }
);

// Update a product - admin only
router.put(
  "/:id",
  verifyAdminAccess,
  celebrate({ body: productSchema.update }),
  async (req, res) => {
    try {
      await Product.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.json(productResponse.productUpdated);
    } catch (err) {
      console.error(err);
      return res.status(500).json(productResponse.unexpectedError);
    }
  }
);

// Delete a product - admin only
router.delete("/:id", verifyAdminAccess, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json(productResponse.productDeleted);
  } catch (err) {
    console.log(err);
    return res.status(500).json(productResponse.unexpectedError);
  }
});

// Get any product - any user
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json(productResponse.unexpectedError);
  }
});

router.post("/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});

const productResponse = {
  productAdded: {
    status: "ok",
    message: "product has been added",
  },
  productUpdated: {
    status: "ok",
    message: "product has been updated",
  },
  productDeleted: {
    status: "ok",
    message: "product has been deleted",
  },
  unexpectedError: {
    status: "error",
    message: "an unexpected error occurred",
  },
};
router.post(
  "/search_image",
  expressAsyncHandler(async (req, res) => {
    const image = req.body.searchImagePath;
    console.log(image);
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    var new_product_image = image.replace("q", "/161");
    new_product_image = new_product_image.slice(1, -1) + "g";
    var bitmap = fs.readFileSync(new_product_image);
    var base_64_img = bitmap.toString("base64");
    console.log("Sending request to Flask server...");
    const flask_response = await axios.post(
      "http://127.0.0.1:5001/search_img/",
      { image: base_64_img },
      config
    );
    // console.log("Response from Flask server:", flask_response.data);
    // const image_ids = flask_response.data.similar_images;
    // const products = await Product.find().where("image").in(image_ids);
    // console.log({ products });
    // res.send({ products });
    console.log("Response from Flask server:", flask_response.data);
    const image_ids = flask_response.data.similar_images.map(
      (image) => image.image_id
    );
    console.log("Image IDs:", image_ids);

    const products = await Product.find({
      image: {
        $in: image_ids.map((id) => `http://localhost:4000/public/images/${id}`),
      },
    });
    const sortedProducts = image_ids.map((id) => {
      const product = products.find((prod) => prod.image.endsWith(id));
      return product;
    });

    console.log({ products: sortedProducts });
    res.send({ products: sortedProducts });
  })
);

module.exports = router;
