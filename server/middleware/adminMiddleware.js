import {User} from "../models/userModel.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied (Admin only)" });
    }

    next();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default adminMiddleware;