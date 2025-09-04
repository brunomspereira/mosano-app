// Unit tests for requireAuth():
// - Should throw GraphQLError when token is undefined
// - Should throw GraphQLError when token doesn't match ENV.AUTH_TOKEN
// - Should pass silently when token matches ENV.AUTH_TOKEN
// - Should handle empty string tokens
