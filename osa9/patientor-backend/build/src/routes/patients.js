"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientorService_1 = __importDefault(require("../services/patientorService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientorService_1.default.getNonSensitiveEntries());
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.default)(req.body);
        const addedEntry = patientorService_1.default.addPatient(newPatientEntry);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = '';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send({ error: errorMessage });
    }
});
exports.default = router;
