exports.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
  
    try {
      const user = await User.create({
        name,
        email,
        password,
        profilePicture: {
          public_id: "myCloud.public_id",
          url: "myCloud.secure_url",
        },
      });
  
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error("Error during user creation:", error);
      res.status(500).json({
        success: false,
        error: "User creation failed.",
      });
    }
  };
  