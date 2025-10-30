import { Client, AccountId, PrivateKey } from "@hashgraph/sdk";

export function getHederaClient(): Client {
  const operatorId = process.env.HEDERA_OPERATOR_ID;
  const operatorKey = process.env.HEDERA_OPERATOR_KEY;

  if (!operatorId || !operatorKey) {
    throw new Error(
      "Missing Hedera credentials. Set HEDERA_OPERATOR_ID and HEDERA_OPERATOR_KEY in environment."
    );
  }

  const client = Client.forTestnet();
  client.setOperator(
    AccountId.fromString(operatorId),
    PrivateKey.fromString(operatorKey)
  );
  return client;
}
