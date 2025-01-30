import {fetchPlaces, placeDeatils, autoComplete} from '../controllers/externalApi.controller.js';

import { Router } from "express";

const router = Router();

router.route("/nearby-places")
    .get(fetchPlaces);

router.route("/place-details")
    .get(placeDeatils);

router.route("/autocomplete")
    .get(autoComplete);

export default router;