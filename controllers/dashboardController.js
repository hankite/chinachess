//For Register Page
const dashboardView = (req, res) => {

  res.render("dashboard/dashboard", {
    user: req.user
  });
};

module.exports = {
  dashboardView,
};
