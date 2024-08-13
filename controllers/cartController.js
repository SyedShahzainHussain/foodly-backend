const Cart = require("../models/cart");

module.exports = {
    addProductToCart: async (req, res) => {
        const userId = req.user.id;
        const { productId, totalPrice, quantity, additives, } = req.body;
        let count;

        try {
            const existingProduct = await Cart.findOne({ userId: userId, productId: productId });
            count = await Cart.countDocuments({ userId: userId });
            if (existingProduct) {
                existingProduct.totalPrice += totalPrice;
                existingProduct.quantity += quantity;
                await existingProduct.save();
                return res.status(200).json({ status: true, count: count });
            } else {
                const newCart = Cart({
                    userId: userId,
                    productId: productId,
                    additives: additives,
                    quantity: quantity,
                    totalPrice: totalPrice,
                });
                await newCart.save();
                count = await Cart.countDocuments({ userId: userId });
                return res.status(201).json({ status: true, count: count });
            }
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    removeCartItem: async (req, res) => {
        const cartItemId = req.params.id;
        const userId = req.user.id;
        try {
            await Cart.findByIdAndDelete({ _id: cartItemId });
            const count = await Cart.countDocuments({ userId: userId });
            res.status(200).json({ status: true, count: count });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    getCart: async(req, res)=> {
        const userId = req.user.id;
        try {
          const cart = await Cart.find({userId: userId})
          .populate({
            path: 'productId',
            select: 'imageUrl title restaurant rating ratingCount',
            populate: {
                path: 'restaurant',
                select: 'time coords'
            }
          })  

          res.status(200).json(cart)
        } catch (error) {
           res.status(500).json({status: false, message: error.message}) 
        }
    },
    getCartCount: async (req, res) => {
        const userId = req.user.id;
        try {
            const count = await Cart.countDocuments({ userId: userId });
            res.status(200).json({ status: true, count: count });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    decrementProductQty: async (req, res) => {
        const userId = req.user.id;
        const id = req.params.id;
        try {
            const cartItem = await Cart.findById(id);
            if (cartItem) {
                const productPrice = cartItem.totalPrice / cartItem.quantity;
                if (cartItem.quantity > 1) {
                    cartItem.quantity -= 1;
                    cartItem.totalPrice -= productPrice;
                    await cartItem.save();
                    res.status(200).json({ status: true, message: "Product quantity successfully decrement" });
                } else {
                    await Cart.findOneAndDelete({ _id: id });
                    res.status(200).json({ status: true, message: "Product successfully remove from cart" });
                }
            } else {
                res.status(400).json({ status: false, message: "Cart item not found" });
            }
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }
};
