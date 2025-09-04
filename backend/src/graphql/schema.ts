export const typeDefs = `#graphql
	type Country {
		id: ID!
		name: String!
		code: String!
	}

	type User {
		id: ID!
		name: String!
		surname: String!
		birthdate: String!
		country: String!
	}

	input CreateUserInput {
		name: String!
		surname: String!
		birthdate: String!
		country: String!  
	}

	input CountryInput {
		name: String!
		code: String!
	}

	type Query {
		getUsers: [User]
		getUser(id: ID!): User
		getCountries: [Country]
		getCountry(id: ID!): Country
	}

	type Mutation {
		createUser(input: CreateUserInput!): User!
		createCountry(input: CountryInput!): Country!
		updateCountry(id: ID!, input: CountryInput!): Country
		deleteCountry(id: ID!): Country
	}
`;
