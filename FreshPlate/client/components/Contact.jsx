import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
} from "@mui/material";

const ContactUsPage = () => {
  return (
    <Box sx={{ backgroundColor: "#FFF5EB", minHeight: "100vh", padding: 4 }}> 
      {/* Page Container */}
      <Container component="main" maxWidth="sm" sx={{ paddingTop: 4, paddingBottom: 4 }}>
        {/* Page Title */}
        <Typography
          variant="h3"
          align="center"
          color="primary"
          sx={{ fontWeight: "bold", color: "#FF7043", marginBottom: 2 }}
        >
          Contact Us
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          align="center"
          sx={{ color: "#555", marginBottom: 4 }}
        >
          We'd love to hear from you! Whether you have a question, feedback, or just want to share your latest culinary creation, we're here to help. Reach out to us using any of the methods below, and we'll get back to you as soon as possible.
        </Typography>

        {/* Card for Form */}
        <Card sx={{ padding: 4, backgroundColor: "#fff" }}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: "bold", marginBottom: 3 }}
            >
              Get in Touch
            </Typography>

            {/* Name Field */}
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />

            {/* Email Field */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />

            {/* Message Field */}
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{ marginBottom: 3 }}
            />

            {/* Send Message Button */}
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#333",
                  padding: "10px 24px",
                }}
              >
                Send Message
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ContactUsPage;
