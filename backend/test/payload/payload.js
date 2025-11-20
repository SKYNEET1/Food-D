// test/payload.js

module.exports = {
    validUser: {
        userName: "Swagat",
        phoneNo: "9876543210",
        email: "test@example.com",
        password: "123456",
        confirmPassword: "123456",
        category: "consumer"
    },



    invalidUser: {
        usernameMissing: {
            userName: "",
            phoneNo: "123",
            email: "notanemail",
            password: "1",
            confirmPassword: "2",
            category: "unknown"
        },
        existingUser: {
            userName: "Existing",
            phoneNo: "1234567890",
            email: "existing@example.com",
            password: "123456",
            confirmPassword: "123456",
            category: "consumer"
        },
        invalidCategory: {
            userName: "sonu",
            phoneNo: "1234567896",
            email: "existing@example.com",
            password: "123456",
            confirmPassword: "123456",
            category: "pop"
        }
    }
};
