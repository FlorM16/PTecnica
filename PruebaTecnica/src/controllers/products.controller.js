import { product } from '../models/product.models.js'
import {user} from '../models/user.models.js'


export const createProduct = async (req, res) => {
    try {
        const { title, description, price} = req.body;
        console.log(req.user._id)
        const newProduct = await product.create({
          title,
          description,
          price,
          userId: req.user._id
          
        });
        res.json(newProduct);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};

export const getProducts = async (req, res) => {
    try {
        const products = await product.findAll({
          attributes: ["_id", "title", "description", "price", "userId"],
          order: [["_id", "DESC"]],
          where: {userId: req.user._id}
        })
        res.json(products);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};

export const getProduct = async (req, res) => {
    const { _id } = req.params;
    // console.log(_id)
  try {
    const product_ = await product.findOne({
      where: { _id },
      attributes: ["_id", "title", "description", "price", "userId"],
    });
    res.json(product_);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const deleteProduct = async (req, res) => {
    const { _id } = req.params;
  try {
    await product.destroy({
      where: { _id },
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
    const { _id } = req.params;
  try {
    
    const _product = await product.findOne({
      attributes: ["_id", "title", "description", "price"],
      where: { _id },
    });

    _product.set(req.body);

    await _product.save();

    res.json(_product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}




