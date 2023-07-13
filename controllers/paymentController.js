import Razorpay from "razorpay";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

//checkout will create only order(create order)
export const checkout = async (req, res) => {
  console.log(instance);
  const options = {
    amount: 50000,
    currency: "INR",
  };

  try {
    const order = await instance.orders.create(options);
    console.log("Order created:", order);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(200).json({
      success: false,
    });
  }
};
