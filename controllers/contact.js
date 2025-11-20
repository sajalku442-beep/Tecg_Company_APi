import { Contact } from "../models/contact.js";

export const createContact = async (req, res) => {
  try {
    console.log(req.body);

    const { fullName, email, projectDetails } = req.body;

    if (!fullName || !email || !projectDetails) {
      return res.json({
        message: "Full name, email & project details are required.",
        success: false,
      });
    }

    const contact = await Contact.create({
      fullName,
      email,
      projectDetails,
    });

    return res.json({
      message: "Contact form submitted successfully.",
      contact,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Server error", success: false });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return res.json({
      message: "Contacts fetched successfully",
      contacts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.json({ message: "Contact not found", success: false });
    }

    return res.json({
      message: "Contact deleted successfully",
      contact,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
