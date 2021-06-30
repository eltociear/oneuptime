module.exports = {
    create: async function(
        projectId,
        chargeAmount,
        balanceAfterAlertSent,
        alertId,
        monitorId,
        incidentId,
        sentTo,
        subscriberId
    ) {
        try {
            const alertCharge = new AlertChargeModel();
            alertCharge.projectId = projectId;
            alertCharge.chargeAmount = chargeAmount;
            alertCharge.closingAccountBalance = balanceAfterAlertSent;
            alertCharge.alertId = alertId || null;
            alertCharge.monitorId = monitorId;
            alertCharge.incidentId = incidentId;
            alertCharge.sentTo = sentTo;
            alertCharge.subscriberAlertId = subscriberId || null;
            alertCharge.save();
            return alertCharge;
        } catch (error) {
            ErrorService.log('alertChargeService.create', error);
            throw error;
        }
    },
    findBy: async function(query, skip, limit, sort, populate) {
        try {
            if (!sort) sort = -1;

            if (typeof skip === 'string') {
                skip = parseInt(skip);
            }

            if (typeof limit === 'string') {
                limit = parseInt(limit);
            }

            if (typeof sort === 'string') {
                sort = parseInt(sort);
            }

            if (!query) {
                query = {};
            }
            let alertQuery;
            let alertCharges;
            if (skip >= 0 && limit > 0) {
                alertQuery = AlertChargeModel.find(query)
                    .lean()
                    .sort([['createdAt', sort]])
                    .limit(limit)
                    .skip(skip);
            } else {
                alertQuery = AlertChargeModel.find(query)
                    .lean()
                    .sort([['createdAt', sort]]);
            }

            for (let populateItem of populate) {
                alertCharges = await alertQuery.populate(
                    populateItem.table,
                    populateItem.field
                );
            }

            return alertCharges;
        } catch (error) {
            ErrorService.log('alertChargeService.findBy', error);
            throw error;
        }
    },
    countBy: async query => {
        try {
            if (!query) {
                query = {};
            }
            const count = await AlertChargeModel.countDocuments(query);
            return count;
        } catch (error) {
            ErrorService.log('alertChargeService.countBy', error);
            throw error;
        }
    },
    /**
     * deletes documents in alert charges based on the query condition
     * @param {Object} query
     */
    hardDeleteBy: async query => {
        try {
            await AlertChargeModel.deleteMany(query);
        } catch (error) {
            ErrorService.log('alertChargeService.delete', error);
            throw error;
        }
    },
};

const AlertChargeModel = require('../models/alertCharge');
const ErrorService = require('./errorService');
