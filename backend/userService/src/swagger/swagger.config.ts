import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "VidMod User Service API",
      version: "1.0.0",
      description:
        "Authentication and Account Management APIs for VidMod.",
    },

    servers: [
      {
        url: "http://localhost:4001",
        description: "Development Server",
      },
    ],

    tags: [
      {
        name: "Authentication",
        description: "User Authentication APIs",
      },

      {
        name: "Account",
        description: "User Account APIs",
      },

      {
        name: "Health",
        description: "Health Check APIs",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        RegisterUser: {
          type: "object",

          required: [
            "name",
            "email",
            "password",
            "gender",
          ],

          properties: {
            name: {
              type: "string",
              example: "Ayush Sharma",
            },

            email: {
              type: "string",
              example: "ayush@gmail.com",
            },

            password: {
              type: "string",
              example: "Password@123",
            },

            gender: {
              type: "string",
              example: "male",
            },
          },
        },

        LoginUser: {
          type: "object",

          required: ["email", "password"],

          properties: {
            email: {
              type: "string",
            },

            password: {
              type: "string",
            },
          },
        },

        RefreshToken: {
          type: "object",

          properties: {
            refreshToken: {
              type: "string",
            },
          },
        },

        SendOTP: {
          type: "object",

          properties: {
            name: {
              type: "string",
            },

            email: {
              type: "string",
            },
          },
        },

        VerifyOTP: {
          type: "object",

          properties: {
            publicId: {
              type: "string",
            },

            email: {
              type: "string",
            },

            otp: {
              type: "string",
            },
          },
        },
      },
    },
  },

  apis: ["./src/routes/**/*.ts"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export default swaggerSpec;