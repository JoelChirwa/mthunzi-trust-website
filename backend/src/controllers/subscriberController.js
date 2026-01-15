import Subscriber from "../models/subscriberModel.js";

// @desc    Subscribe to newsletter
// @route   POST /api/subscribers
// @access  Public
export const subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    const subscriberExists = await Subscriber.findOne({ email });

    if (subscriberExists) {
      if (subscriberExists.status === "unsubscribed") {
        subscriberExists.status = "active";
        await subscriberExists.save();
        return res.status(200).json({ message: "Successfully re-subscribed!" });
      }
      return res.status(400).json({ message: "Email already subscribed" });
    }

    await Subscriber.create({ email });

    res.status(201).json({ message: "Successfully subscribed to newsletter!" });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// @desc    Get all subscribers
// @route   GET /api/subscribers
// @access  Private/Admin
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({}).sort("-createdAt");
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/subscribers/unsubscribe
// @access  Public
export const unsubscribe = async (req, res) => {
  const { email } = req.body;

  try {
    const subscriber = await Subscriber.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({ message: "Email not found" });
    }

    subscriber.status = "unsubscribed";
    await subscriber.save();

    res.status(200).json({ message: "Successfully unsubscribed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
