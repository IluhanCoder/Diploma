const inviteService = require("../service/invite-service");

class InviteController {
  async eventInvite(req, res, next) {
    const { proposerId, receiverId, eventId, role, comment } = req.body;
    const currentDate = new Date();
    await inviteService.newInvite(
      proposerId,
      receiverId,
      eventId,
      role,
      currentDate,
      comment
    );
  }
  catch(error) {
    next(error);
  }

  async getUserInvites(req, res, next) {
    try {
      const { userId } = req.params;
      await inviteService.getUserInvites(userId);
    } catch (error) {
      next(error);
    }
  }

  async removeInvite(req, res, next) {
    try {
      const { userId } = req.params;
      const { event } = req.body;
      await inviteService.removeInvite(event, userId);
    } catch (error) {
      next(error);
    }
  }

  async seeInvite(req, res, next) {
    try {
      const { inviteId, accept } = req.params;
      const convertedAccept = accept === "true" ? true : false;
      await inviteService.seeInvite(inviteId, convertedAccept);
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new InviteController();
