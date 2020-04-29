const express = require('express');
const router = express.Router();
const getUser = require('../middlewares/user').getUser;
const isUserMasterAdmin = require('../middlewares/user').isUserMasterAdmin;
const sendListResponse = require('../middlewares/response').sendListResponse;
const sendItemResponse = require('../middlewares/response').sendItemResponse;
const sendErrorResponse = require('../middlewares/response').sendErrorResponse;
const SsoService = require('../services/ssoService')

router.get('/', getUser, isUserMasterAdmin, async function (req, res) {
  const skip = req.query.skip || 0;
  const limit = req.query.limit || 10;
  try {
    const ssos = await SsoService.findBy({}, limit, skip)
    const count = await SsoService.countBy()

    return sendListResponse(req, res, ssos, count)
  } catch (error) {
    return sendErrorResponse(req, res, error)
  }
})

router.delete('/:id', getUser, isUserMasterAdmin, async function (req, res) {
  try {
    const sso = await SsoService.deleteBy({ _id: req.params.id });
    return sendItemResponse(req, res, sso);
  } catch (error) {
    return sendErrorResponse(req, res, error)
  }
})

router.post('/', getUser, isUserMasterAdmin, async function (req, res) {
  const data = req.body
  try {
    const sso = await SsoService.create(data)
    return sendItemResponse(req, res, sso);
  } catch (error) {
    return sendErrorResponse(req, res, error)
  }
})

router.get('/:id', getUser, isUserMasterAdmin, async function (req, res) {
  try {
    const sso = await SsoService.findOneBy({ _id: req.params.id });
    return sendItemResponse(req, res, sso);
  } catch (error) {
    return sendErrorResponse(req, res, error)
  }
})

router.put('/:id', getUser, isUserMasterAdmin, async function (req, res) {
  try {
    const data = req.body;
    const sso = await SsoService.updateBy(
      { _id: req.params.id },
      data
    );
    return sendItemResponse(req, res, sso);
  } catch (error) {
    return sendErrorResponse(req, res, error)
  }

})

module.exports = router;
