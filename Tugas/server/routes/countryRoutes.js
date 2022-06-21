import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.countryCtrl.findAll)
router.get('/:id',indexCtrl.countryCtrl.findOne)
router.post('/',indexCtrl.countryCtrl.create)
router.post('/',indexCtrl.countryCtrl.createR)
router.put('/:id',indexCtrl.countryCtrl.update)
router.delete('/:id',indexCtrl.countryCtrl.deleted)
router.put('/sql/:id',indexCtrl.countryCtrl.querySQL)
export default router