import axios from "axios";

export const getContactNumberFeild = async (req, res) => {
  try {
    const response = await axios.get("https://ipwho.is/");

    res.json({
      country: response.data.country_code
    });

  } catch (error) {
    console.error("IP lookup error:", error.message);
    res.json({ country: "us" });
  }
};
