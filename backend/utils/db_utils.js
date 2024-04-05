const findUserByEmail = async (email, userModel, res) => {
  try {
    // Finding the user in the database using the selected userModel
    const user = await userModel.findOne({ email: email });

    if (!user) {
      // If user is not found, return a 400 (Bad Request) response
      return res.status(400).json({ message: 'User not found' });
    }

    // Return the found user if it exists
    return user;
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error('Error finding user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  findUserByEmail
}
