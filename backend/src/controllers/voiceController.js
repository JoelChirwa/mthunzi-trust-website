import Voice from "../models/voiceModel.js";

// @desc    Get all voices
// @route   GET /api/voices
// @access  Public
export const getVoices = async (req, res) => {
  try {
    const { featured, active } = req.query;
    let query = {};
    if (featured === "true") query.featured = true;
    if (active === "false") query.active = false;
    else query.active = true;

    const voices = await Voice.find(query).sort({ createdAt: -1 });
    res.json(voices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single voice
// @route   GET /api/voices/:id
// @access  Public
export const getVoiceById = async (req, res) => {
  try {
    const voice = await Voice.findById(req.params.id);
    if (voice) {
      res.json(voice);
    } else {
      res.status(404).json({ message: "Voice not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a voice
// @route   POST /api/voices
// @access  Private/Admin
export const createVoice = async (req, res) => {
  try {
    const voice = new Voice(req.body);
    const createdVoice = await voice.save();
    res.status(201).json(createdVoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a voice
// @route   PUT /api/voices/:id
// @access  Private/Admin
export const updateVoice = async (req, res) => {
  try {
    const voice = await Voice.findById(req.params.id);
    if (voice) {
      Object.assign(voice, req.body);
      const updatedVoice = await voice.save();
      res.json(updatedVoice);
    } else {
      res.status(404).json({ message: "Voice not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a voice
// @route   DELETE /api/voices/:id
// @access  Private/Admin
export const deleteVoice = async (req, res) => {
  try {
    const voice = await Voice.findById(req.params.id);
    if (voice) {
      await voice.deleteOne();
      res.json({ message: "Voice removed" });
    } else {
      res.status(404).json({ message: "Voice not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
