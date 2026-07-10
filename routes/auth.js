const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/user");
const middleware = require("../middleware");

router.get("/auth/signup", middleware.ensureNotLoggedIn, (req, res) => {
  const error = req.query.error;
  res.render("auth/signup", {
    title: "User Signup",
    error,
  });
});

router.post("/auth/signup", middleware.ensureNotLoggedIn, async (req, res) => {
  const { firstName, lastName, email, password1, password2, role } = req.body;

  const errors = [];

  if (!firstName || !lastName || !email || !password1 || !password2) {
    errors.push({
      msg: "Please fill in all the fields",
    });
  }

  if (password1 !== password2) {
    errors.push({
      msg: "Passwords are not matching",
    });
  }

  if (password1.length < 6) {
    errors.push({
      msg: "Password should be at least 6 characters long",
    });
  }

  if (errors.length > 0) {
    return res.render("auth/signup", {
      title: "User Signup",
      errors,
      firstName,
      lastName,
      email,
      password1,
      password2,
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      errors.push({
        msg: "This email is already registered. Please try another email.",
      });

      return res.render("auth/signup", {
        title: "User Signup",
        errors,
        firstName,
        lastName,
        email,
        password1,
        password2,
      });
    }

    if (role === "admin") {
      return res.redirect("/auth/signup?error=admin_not_allowed");
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password1, 10),
      role: role || "donor",
    });

    await newUser.save();

    req.flash("success", "You are successfully registered and can log in.");

    res.redirect("/auth/login");
  } catch (err) {
    console.log(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
});
router.get("/auth/login", middleware.ensureNotLoggedIn, (req, res) => {
  res.render("auth/login", {
    title: "User login",
  });
});

router.post(
  "/auth/login",
  middleware.ensureNotLoggedIn,
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  (req, res) => {
    if (!req.user) {
      return res.redirect("/auth/login");
    }

    if (
      req.user.role === "admin" &&
      req.user.email === process.env.ADMIN_EMAIL
    ) {
      return res.redirect("/admin/dashboard");
    }

    if (
      req.user.role === "admin" &&
      req.user.email !== process.env.ADMIN_EMAIL
    ) {
      req.logout(function (err) {
        if (err) {
          return res.redirect("/auth/login");
        }

        req.flash("error", "You are not authorized to login as admin.");
        res.redirect("/auth/login");
      });

      return;
    }

    if (req.user.role === "donor") {
      return res.redirect("/donor/dashboard");
    }

    if (req.user.role === "agent") {
      return res.redirect("/agent/dashboard");
    }

    res.redirect("/");
  }
);

router.get("/auth/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged-out successfully");
  res.redirect("/");
});
router.get("/create-admin", async (req, res) => {
  try {
    const { secret } = req.query;

    if (secret !== process.env.ADMIN_SETUP_SECRET) {
      return res.status(403).send("Forbidden - You are not allowed here.");
    }

    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      return res.send("Admin already exists. Only one admin is allowed.");
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      firstName: "Admin",
      lastName: "User",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    res.send(
      `Admin created successfully! Login with ${process.env.ADMIN_EMAIL} and password: admin123`
    );
  } catch (err) {
    console.log(err);
    res.send("Error creating admin");
  }
});

router.get("/reset-admin", async (req, res) => {
  const { secret } = req.query;

  if (secret !== process.env.ADMIN_SETUP_SECRET) {
    return res.status(403).send("Forbidden.");
  }

  await User.deleteOne({ role: "admin" });

  res.send("Admin deleted. Now visit /create-admin?secret=... to recreate.");
});

router.get("/fix-admin", async (req, res) => {
  const { secret } = req.query;

  if (secret !== process.env.ADMIN_SETUP_SECRET) {
    return res.status(403).send("Forbidden.");
  }

  const hash = await bcrypt.hash("khushi1234", 10);

  const result = await User.findOneAndUpdate(
    { role: "admin" },
    {
      email: process.env.ADMIN_EMAIL,
      password: hash,
    }
  );

  console.log("Updated user:", result);

  res.send("Done! Hash: " + hash);
});

router.get("/check-admin", async (req, res) => {
  const { secret } = req.query;

  if (secret !== process.env.ADMIN_SETUP_SECRET) {
    return res.status(403).send("Forbidden.");
  }

  const admin = await User.findOne({ role: "admin" });

  if (!admin) {
    return res.send("Admin not found.");
  }

  res.send(`Email: ${admin.email} | Password hash: ${admin.password}`);
});

module.exports = router;