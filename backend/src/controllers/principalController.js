import * as principalService from '../services/principalService.js';

export const getHods = async (req, res) => {
  try {
    const hods = await principalService.listAllHods();
    res.status(200).json(hods);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const updateHodStatus = async (req, res) => {
  try {
    const updated = await principalService.setHodStatus(req.params.id, req.body.status);
    res.status(200).json(updated);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const createHod = async (req, res) => {
  try {
    const hod = await principalService.addHodDirectly(req.body);
    res.status(201).json(hod);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const deleteHod = async (req, res) => {
  try {
    const result = await principalService.removeHod(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};